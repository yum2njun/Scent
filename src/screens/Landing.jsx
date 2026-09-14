export default function Landing({ frame }) {
  const { goForm } = frame;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: "64px 28px 36px",
        boxSizing: "border-box",
        animation: "sj-up .5s ease both",
      }}
    >
      <div
        style={{
          font: "500 10px/1 'Noto Sans KR',sans-serif",
          letterSpacing: ".12em",
          color: "#6b6459",
        }}
      >
        여운 (餘運)
      </div>

      <div style={{ marginTop: "auto", paddingTop: 72 }}>
        <div style={{ width: 1, height: 56, background: "#c9c2b5", marginBottom: 28 }} />
        <h1
          style={{
            margin: 0,
            font: "300 40px/1.34 'Noto Serif KR',serif",
            letterSpacing: "-.01em",
            textWrap: "pretty",
          }}
        >
          여운 (餘運)
        </h1>
        <p
          style={{
            margin: "22px 0 0",
            font: "300 14px/1.85 'Noto Sans KR',sans-serif",
            color: "#6b6459",
            maxWidth: 300,
            textWrap: "pretty",
          }}
        >
          당신에게 남게 될 단 하나의 운명, 여운
        </p>
      </div>

      <button
        type="button"
        onClick={goForm}
        style={{
          marginTop: 32,
          width: "100%",
          height: 58,
          border: "none",
          background: "#191713",
          color: "#f6f3ee",
          font: "500 13.5px/1 'Noto Sans KR',sans-serif",
          letterSpacing: ".12em",
          cursor: "pointer",
        }}
      >
        내 시그니처 향 찾기
      </button>
      <div
        style={{
          marginTop: 14,
          font: "300 10.5px/1.6 'Noto Sans KR',sans-serif",
          color: "#a09889",
          textAlign: "center",
        }}
      >
        양력·음력 모두 지원 · 한국시(KST) 기준
      </div>
    </div>
  );
}
