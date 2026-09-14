import * as ilju from "../data/ilju-data.js";

export default function Share({ frame }) {
  const { res, accent, saving, previewUrl, closePreview, goResult, saveImage, shareRef } = frame;
  if (!res) return null;
  const p = res.profile;
  const meta = ilju.ELEMENT_META[res.element];
  const hanjaVertical = res.hanja.split("").join("\n");
  const shareNotes = [
    { k: "TOP", v: p.t.slice(0, 2).join(", ") },
    { k: "MIDDLE", v: p.m.slice(0, 2).join(", ") },
    { k: "BASE", v: p.b.slice(0, 2).join(", ") },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: "52px 24px 36px",
        boxSizing: "border-box",
        animation: "sj-up .45s ease both",
      }}
    >
      <button
        type="button"
        onClick={goResult}
        style={{
          alignSelf: "flex-start",
          border: "none",
          background: "none",
          padding: 0,
          font: "400 11px/1 'Noto Sans KR',sans-serif",
          letterSpacing: ".2em",
          color: "#a09889",
          cursor: "pointer",
        }}
      >
        ← 결과로
      </button>

      <div style={{ marginTop: 26, display: "flex", justifyContent: "center" }}>
        <div
          ref={shareRef}
          style={{
            width: 326,
            height: 580,
            background: "#f6f3ee",
            border: "1px solid #e0dad0",
            padding: "38px 30px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ font: "500 9px/1 'Noto Sans KR',sans-serif", letterSpacing: ".3em", color: "#a09889" }}>
              여운
            </div>
            <div style={{ font: "400 9.5px/1 'Noto Sans KR',sans-serif", letterSpacing: ".18em", color: accent }}>
              {meta.label}
            </div>
          </div>
          <div
            style={{
              marginTop: 40,
              whiteSpace: "pre-line",
              font: "400 30px/1.24 'Noto Serif KR',serif",
              color: accent,
            }}
          >
            {hanjaVertical}
          </div>
          <div
            style={{
              marginTop: 12,
              font: "300 10.5px/1 'Noto Sans KR',sans-serif",
              letterSpacing: ".2em",
              color: "#a09889",
            }}
          >
            {res.kr}일주
          </div>
          <div
            style={{
              marginTop: 26,
              font: "300 23px/1.5 'Noto Serif KR',serif",
              textWrap: "pretty",
              wordBreak: "keep-all",
            }}
          >
            {p.p}
          </div>
          <div style={{ marginTop: 16, font: "400 11px/1.5 'Noto Sans KR',sans-serif", color: "#6b6459" }}>
            {p.f}
          </div>
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 8, paddingTop: 28 }}>
            {shareNotes.map((nt) => (
              <div
                key={nt.k}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 12,
                  paddingBottom: 8,
                  borderBottom: "1px solid #e8e3da",
                }}
              >
                <div
                  style={{
                    flex: "none",
                    width: 48,
                    font: "400 8.5px/1.4 'Noto Sans KR',sans-serif",
                    letterSpacing: ".16em",
                    color: "#a09889",
                  }}
                >
                  {nt.k}
                </div>
                <div style={{ font: "400 12.5px/1.5 'Noto Serif KR',serif" }}>{nt.v}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ font: "300 8.5px/1 'Noto Sans KR',sans-serif", letterSpacing: ".14em", color: "#c9c2b5" }}>
              여운 · 餘運
            </div>
            <div style={{ width: 16, height: 16, border: `1px solid ${accent}` }} />
          </div>
        </div>
      </div>

      <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 10 }}>
        <button
          type="button"
          onClick={saveImage}
          style={{
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
          {saving ? "이미지 만드는 중…" : "카드 이미지 저장"}
        </button>
        <div
          style={{
            font: "300 10.5px/1.7 'Noto Sans KR',sans-serif",
            color: "#a09889",
            textAlign: "center",
          }}
        >
          9:16 스토리 규격 · 이미지를 길게 눌러 저장 후 인스타그램에 공유하세요
        </div>
      </div>

      {previewUrl && (
        <div
          onClick={closePreview}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(25,23,19,.88)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
            padding: 24,
            boxSizing: "border-box",
            zIndex: 10,
          }}
        >
          <img
            src={previewUrl}
            alt="여운 시그니처 향 공유 카드"
            style={{
              maxWidth: "100%",
              maxHeight: "72vh",
              border: "1px solid rgba(246,243,238,.25)",
            }}
          />
          <div
            style={{
              font: "300 12.5px/1.6 'Noto Sans KR',sans-serif",
              color: "#f6f3ee",
              textAlign: "center",
            }}
          >
            이미지를 길게 눌러 '사진에 저장'하세요
          </div>
          <button
            type="button"
            onClick={closePreview}
            style={{
              border: "1px solid rgba(246,243,238,.4)",
              background: "none",
              color: "#f6f3ee",
              padding: "10px 22px",
              font: "400 12px/1 'Noto Sans KR',sans-serif",
              letterSpacing: ".08em",
              cursor: "pointer",
            }}
          >
            닫기
          </button>
        </div>
      )}
    </div>
  );
}
