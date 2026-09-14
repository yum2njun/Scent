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

function solarDaysInMonth(y, m) {
  return new Date(y, m, 0).getDate();
}

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [calendarType, setCalendarType] = useState("solar"); // "solar" | "lunar"
  const [y, setYRaw] = useState(1995);
  const [m, setMRaw] = useState(6);
  const [d, setD] = useState(15);
  const [isLeapMonth, setIsLeapMonth] = useState(false);
  const [res, setRes] = useState(null);
  const [birthSnapshot, setBirthSnapshot] = useState(null);
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
    setRes(computed);
    setBirthSnapshot({ calendarType, y, m, d, isLeapMonth, solar });
    setScreen("brewing");
    clearTimeout(brewTimer.current);
    brewTimer.current = setTimeout(() => setScreen("result"), BREW_MS);
  };

  const saveImage = async () => {
    const node = shareRef.current;
    if (!node) return;
    setSaving(true);
    try {
      const { toPng } = await import("html-to-image");
      const url = await toPng(node, { pixelRatio: 3, backgroundColor: "#f6f3ee" });
      setPreviewUrl(url);
    } catch {
      // best-effort image export; ignore failures
    } finally {
      setSaving(false);
    }
  };
  const closePreview = () => setPreviewUrl(null);

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
