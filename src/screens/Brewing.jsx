import { useEffect, useState } from "react";

const NOTES = ["탑 노트를 고르는 중", "미들 노트를 얹는 중", "베이스를 가라앉히는 중"];
const STEP_MS = 900;

export default function Brewing() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setI((n) => (n + 1) % NOTES.length), STEP_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "40px 28px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: "50%",
          border: "1px solid #c9c2b5",
          animation: "sj-breathe 2.4s ease-in-out infinite",
        }}
      />
      <div
        style={{
          width: 1,
          height: 64,
          background: "#c9c2b5",
          marginTop: 24,
          transformOrigin: "top",
          animation: "sj-line 2.2s ease both",
        }}
      />
      <div style={{ position: "relative", height: 26, marginTop: 26, width: "100%", textAlign: "center" }}>
        <div
          key={i}
          style={{
            font: "300 14px/26px 'Noto Serif KR',serif",
            color: "#6b6459",
            animation: "sj-note-solo " + STEP_MS + "ms ease both",
          }}
        >
          {NOTES[i]}
        </div>
      </div>
      <div
        style={{
          marginTop: 44,
          font: "500 9.5px/1 'Noto Sans KR',sans-serif",
          letterSpacing: ".3em",
          color: "#a09889",
        }}
      >
        COMPOSING
      </div>
    </div>
  );
}
