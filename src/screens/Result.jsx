import * as ilju from "../data/ilju-data.js";

const sectionLabel = {
  font: "500 9.5px/1 'Noto Sans KR',sans-serif",
  letterSpacing: ".26em",
  color: "#a09889",
};

function pad(n) {
  return String(n).padStart(2, "0");
}

function formatBirth(snapshot) {
  if (!snapshot) return "";
  const { calendarType, y, m, d, isLeapMonth, solar } = snapshot;
  const entered = y + "." + pad(m) + "." + pad(d);
  if (calendarType === "lunar") {
    const leapTag = isLeapMonth ? "(윤월)" : "";
    const solarStr = solar.y + "." + pad(solar.m) + "." + pad(solar.d);
    return "음력 " + entered + leapTag + " · 양력 " + solarStr;
  }
  return "양력 " + entered;
}

export default function Result({ frame }) {
  const { res, accent, soft, pyramidStyle, goLanding, goShare, goForm, birthSnapshot } = frame;
  if (!res) return null;
  const p = res.profile;
  const meta = ilju.ELEMENT_META[res.element];
  const hanjaVertical = res.hanja.split("").join("\n");
  const dateLabel = formatBirth(birthSnapshot);

  return (
    <div style={{ padding: "52px 28px 44px", animation: "sj-up .5s ease both" }}>
      <button
        type="button"
        onClick={goLanding}
        style={{
          border: "none",
          background: "none",
          padding: 0,
          font: "400 11px/1 'Noto Sans KR',sans-serif",
          letterSpacing: ".2em",
          color: "#a09889",
          cursor: "pointer",
        }}
      >
        ← 처음으로
      </button>

      <div style={{ display: "flex", alignItems: "flex-start", gap: 18, marginTop: 34 }}>
        <div
          style={{
            flex: "none",
            width: 56,
            padding: "12px 0",
            border: `1px solid ${accent}`,
            color: accent,
            textAlign: "center",
            whiteSpace: "pre-line",
            font: "400 22px/1.3 'Noto Serif KR',serif",
          }}
        >
          {hanjaVertical}
        </div>
        <div style={{ paddingTop: 2 }}>
          <div style={{ font: "300 12px/1.7 'Noto Sans KR',sans-serif", color: "#6b6459" }}>
            당신의 일주는 <span style={{ color: "#191713" }}>{res.kr}({res.hanja})</span>,
            <br />
            당신의 향은…
          </div>
          <div style={{ marginTop: 10, font: "500 9.5px/1 'Noto Sans KR',sans-serif", letterSpacing: ".2em", color: accent }}>
            {meta.label} · {meta.name}
          </div>
        </div>
      </div>

      <h2
        style={{
          margin: "26px 0 0",
          font: "300 30px/1.48 'Noto Serif KR',serif",
          letterSpacing: "-.01em",
          textWrap: "pretty",
        }}
      >
        {p.p}
      </h2>
      <div
        style={{
          display: "inline-block",
          marginTop: 18,
          padding: "8px 14px",
          border: `1px solid ${accent}`,
          color: accent,
          font: "400 11.5px/1 'Noto Sans KR',sans-serif",
          letterSpacing: ".06em",
        }}
      >
        {p.f}
      </div>

      <div style={{ marginTop: 38, display: "flex", flexDirection: "column", gap: 26 }}>
        <div>
          <div style={sectionLabel}>VISUAL METAPHOR</div>
          <p style={{ margin: "10px 0 0", font: "300 14px/1.9 'Noto Serif KR',serif", textWrap: "pretty" }}>
            {p.vm}
          </p>
        </div>
        <div>
          <div style={sectionLabel}>PERSONALITY</div>
          <p
            style={{
              margin: "10px 0 0",
              font: "300 13.5px/1.9 'Noto Sans KR',sans-serif",
              color: "#3d3831",
              textWrap: "pretty",
            }}
          >
            {p.pv}
          </p>
        </div>
        <div>
          <div style={sectionLabel}>SCENT NARRATIVE</div>
          <p
            style={{
              margin: "10px 0 0",
              font: "300 13.5px/1.9 'Noto Sans KR',sans-serif",
              color: "#3d3831",
              textWrap: "pretty",
            }}
          >
            {p.sn}
          </p>
        </div>
      </div>

      <div style={{ marginTop: 44, paddingTop: 32, borderTop: "1px solid #e0dad0" }}>
        <div style={sectionLabel}>FRAGRANCE PYRAMID</div>

        {pyramidStyle === "층층" ? (
          <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              { label: "TOP", line: p.t.join(" · "), opacity: 1 },
              { label: "MIDDLE", line: p.m.join(" · "), opacity: 0.9 },
              { label: "BASE", line: p.b.join(" · "), opacity: 0.8 },
            ].map((row) => (
              <div
                key={row.label}
                style={{
                  padding: "18px 20px",
                  background: soft,
                  borderLeft: `2px solid ${accent}`,
                  opacity: row.opacity,
                }}
              >
                <div style={{ font: "400 10px/1 'Noto Sans KR',sans-serif", letterSpacing: ".24em", color: accent }}>
                  {row.label}
                </div>
                <div style={{ marginTop: 8, font: "400 14.5px/1.6 'Noto Serif KR',serif" }}>{row.line}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ marginTop: 22, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: "54%",
                padding: "14px 12px",
                background: soft,
                borderTop: `2px solid ${accent}`,
                textAlign: "center",
              }}
            >
              <div style={{ font: "400 9.5px/1 'Noto Sans KR',sans-serif", letterSpacing: ".24em", color: accent }}>
                TOP
              </div>
              <div style={{ marginTop: 6, font: "400 12.5px/1.6 'Noto Serif KR',serif" }}>{p.t.join(" · ")}</div>
            </div>
            <div style={{ width: "77%", padding: "14px 12px", background: soft, textAlign: "center" }}>
              <div style={{ font: "400 9.5px/1 'Noto Sans KR',sans-serif", letterSpacing: ".24em", color: accent }}>
                MIDDLE
              </div>
              <div style={{ marginTop: 6, font: "400 12.5px/1.6 'Noto Serif KR',serif" }}>{p.m.join(" · ")}</div>
            </div>
            <div
              style={{
                width: "100%",
                padding: "14px 12px",
                background: soft,
                borderBottom: `2px solid ${accent}`,
                textAlign: "center",
              }}
            >
              <div style={{ font: "400 9.5px/1 'Noto Sans KR',sans-serif", letterSpacing: ".24em", color: accent }}>
                BASE
              </div>
              <div style={{ marginTop: 6, font: "400 12.5px/1.6 'Noto Serif KR',serif" }}>{p.b.join(" · ")}</div>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: 44, paddingTop: 32, borderTop: "1px solid #e0dad0" }}>
        <div style={sectionLabel}>MATCHED NICHE PERFUMES</div>
        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 14 }}>
          {p.pf.map((pf, i) => (
            <div key={pf.nk} style={{ border: "1px solid #e0dad0", background: "#fbf9f6", padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                <div style={{ font: "400 10px/1 'Noto Sans KR',sans-serif", letterSpacing: ".2em", color: "#a09889" }}>
                  {pf.ne}
                </div>
                <div style={{ font: "400 10px/1 'Noto Sans KR',sans-serif", color: "#c9c2b5" }}>
                  {"0" + (i + 1)}
                </div>
              </div>
              <div style={{ marginTop: 10, font: "400 12px/1 'Noto Sans KR',sans-serif", color: "#6b6459" }}>
                {pf.br}
              </div>
              <div style={{ marginTop: 6, font: "400 18px/1.4 'Noto Serif KR',serif" }}>{pf.nk}</div>
              <div
                style={{
                  marginTop: 12,
                  paddingTop: 12,
                  borderTop: "1px solid #ece7de",
                  font: "300 12.5px/1.8 'Noto Sans KR',sans-serif",
                  color: "#3d3831",
                  textWrap: "pretty",
                }}
              >
                {pf.r}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 10 }}>
        <button
          type="button"
          onClick={goShare}
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
          내 시그니처 향 공유하기
        </button>
        <button
          type="button"
          onClick={goForm}
          style={{
            width: "100%",
            height: 52,
            border: "1px solid #d6cfc3",
            background: "none",
            color: "#6b6459",
            font: "400 12.5px/1 'Noto Sans KR',sans-serif",
            letterSpacing: ".08em",
            cursor: "pointer",
          }}
        >
          다시 계산하기
        </button>
      </div>
      <div
        style={{
          marginTop: 20,
          font: "300 10.5px/1.7 'Noto Sans KR',sans-serif",
          color: "#a09889",
          textAlign: "center",
        }}
      >
        {dateLabel} · 일주 {res.hanja} 기준 큐레이션
      </div>
    </div>
  );
}
