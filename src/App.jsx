import { useEffect, useRef, useState } from "react";
import * as ilju from "./data/ilju-data.js";
import { lunarDaysInMonth, lunarMonthHasLeap, lunarToSolar } from "./lib/lunar.js";
import Landing from "./screens/Landing.jsx";
import Form from "./screens/Form.jsx";
import Brewing from "./screens/Brewing.jsx";
import Result from "./screens/Result.jsx";
import Share from "./screens/Share.jsx";

// Design-tool tweak defaults, fixed for the shipped app.
const PYRAMID_STYLE = "층층"; // "층층" | "삼각형"
const ELEMENT_ACCENT = true;
const BREW_MS = 2600;
const STORAGE_KEY = "yeoun:lastEntry";
const SITE_URL = "https://yeounsj.vercel.app/";
const SHARE_TEXT = `당신에게 남게 될 단 하나의 운명, 여운(餘運)\n${SITE_URL}`;

function solarDaysInMonth(y, m) {
  return new Date(y, m, 0).getDate();
}

function loadSavedEntry() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveEntry(entry) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
  } catch {
    // best-effort persistence; ignore storage failures (e.g. private mode)
  }
}

export default function App() {
  const initialEntry = useRef(loadSavedEntry()).current;

  const [screen, setScreen] = useState("landing");
  const [calendarType, setCalendarType] = useState(initialEntry?.calendarType ?? "solar"); // "solar" | "lunar"
  const [y, setYRaw] = useState(initialEntry?.y ?? 1995);
  const [m, setMRaw] = useState(initialEntry?.m ?? 6);
  const [d, setD] = useState(initialEntry?.d ?? 15);
  const [isLeapMonth, setIsLeapMonth] = useState(initialEntry?.isLeapMonth ?? false);
  const [res, setRes] = useState(null);
  const [birthSnapshot, setBirthSnapshot] = useState(null);
  const [savedEntry, setSavedEntry] = useState(initialEntry);
  const [saving, setSaving] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const shareRef = useRef(null);
  const brewTimer = useRef(null);

  useEffect(() => () => clearTimeout(brewTimer.current), []);

  const daysInCurrentMonth = (year, month, leap) =>
    calendarType === "lunar" ? lunarDaysInMonth(year, month, leap) : solarDaysInMonth(year, month);

  const setCalendar = (type) => {
    setCalendarType(type);
    setIsLeapMonth(false);
    setD((prevD) => {
      const max = type === "lunar" ? lunarDaysInMonth(y, m, false) : solarDaysInMonth(y, m);
      return Math.min(prevD, max);
    });
  };
  const setY = (nextY) => {
    setYRaw(nextY);
    setD((prevD) => Math.min(prevD, daysInCurrentMonth(nextY, m, isLeapMonth)));
  };
  const setM = (nextM) => {
    setMRaw(nextM);
    const nextLeap = calendarType === "lunar" && lunarMonthHasLeap(y, nextM) ? isLeapMonth : false;
    setIsLeapMonth(nextLeap);
    setD((prevD) => Math.min(prevD, daysInCurrentMonth(y, nextM, nextLeap)));
  };
  const toggleLeapMonth = () => {
    if (calendarType !== "lunar" || !lunarMonthHasLeap(y, m)) return;
    const next = !isLeapMonth;
    setIsLeapMonth(next);
    setD((prevD) => Math.min(prevD, lunarDaysInMonth(y, m, next)));
  };

  const submit = () => {
    let solar;
    if (calendarType === "lunar") {
      const converted = lunarToSolar(y, m, d, isLeapMonth);
      if (!converted) return;
      solar = converted;
    } else {
      solar = { y, m, d };
    }
    const computed = ilju.getIlju(solar.y, solar.m, solar.d, null);
    if (!computed) return;
    const snapshot = { calendarType, y, m, d, isLeapMonth, solar };
    setRes(computed);
    setBirthSnapshot(snapshot);
    setScreen("brewing");
    clearTimeout(brewTimer.current);
    brewTimer.current = setTimeout(() => setScreen("result"), BREW_MS);

    const entry = { ...snapshot, res: computed };
    saveEntry(entry);
    setSavedEntry(entry);
  };

  const viewSaved = () => {
    if (!savedEntry) return;
    setCalendarType(savedEntry.calendarType);
    setYRaw(savedEntry.y);
    setMRaw(savedEntry.m);
    setD(savedEntry.d);
    setIsLeapMonth(savedEntry.isLeapMonth);
    setRes(savedEntry.res);
    setBirthSnapshot(savedEntry);
    setScreen("result");
  };

  const saveImage = async () => {
    const node = shareRef.current;
    if (!node) return;
    setSaving(true);
    try {
      const { toBlob } = await import("html-to-image");
      const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 12000));
      const blob = await Promise.race([toBlob(node, { pixelRatio: 3, backgroundColor: "#f6f3ee" }), timeout]);
      if (!blob) return;

      const file = new File([blob], "yeoun-scent-card.png", { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "여운 (餘運)",
          text: SHARE_TEXT,
        });
        return;
      }

      setPreviewUrl(URL.createObjectURL(blob));
    } catch (err) {
      if (err?.name !== "AbortError") {
        // best-effort share/export; ignore failures other than a user-cancelled share
      }
    } finally {
      setSaving(false);
    }
  };
  const closePreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  const meta = res ? ilju.ELEMENT_META[res.element] : null;
  const accent = ELEMENT_ACCENT && meta ? meta.accent : "#191713";
  const soft = ELEMENT_ACCENT && meta ? meta.soft : "#efece5";

  const frame = {
    calendarType,
    y,
    m,
    d,
    isLeapMonth,
    leapAvailable: calendarType === "lunar" && lunarMonthHasLeap(y, m),
    res,
    birthSnapshot,
    savedEntry,
    saving,
    previewUrl,
    closePreview,
    accent,
    soft,
    pyramidStyle: PYRAMID_STYLE,
    daysInMonth: daysInCurrentMonth,
    goLanding: () => setScreen("landing"),
    goForm: () => setScreen("form"),
    goResult: () => setScreen("result"),
    goShare: () => setScreen("share"),
    submit,
    saveImage,
    viewSaved,
    setCalendar,
    setY,
    setM,
    setD,
    toggleLeapMonth,
    shareRef,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background: "#e6e2da",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          minHeight: "100vh",
          background: "#f6f3ee",
          color: "#191713",
          boxShadow: "0 0 80px rgba(25,23,19,.1)",
          overflow: "hidden",
        }}
      >
        {screen === "landing" && <Landing frame={frame} />}
        {screen === "form" && <Form frame={frame} />}
        {screen === "brewing" && <Brewing />}
        {screen === "result" && <Result frame={frame} />}
        {screen === "share" && <Share frame={frame} />}
      </div>
    </div>
  );
}
