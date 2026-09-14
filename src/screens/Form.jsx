const selectStyle = {
  appearance: "none",
  WebkitAppearance: "none",
  width: "100%",
  height: 54,
  padding: "0 14px",
  border: "1px solid #d6cfc3",
  borderRadius: 0,
  background: "#fbf9f6",
  color: "#191713",
  font: "400 15px/1 'Noto Sans KR',sans-serif",
  cursor: "pointer",
};

const sectionLabelStyle = {
  font: "500 9.5px/1 'Noto Sans KR',sans-serif",
  letterSpacing: ".26em",
  color: "#a09889",
};

const years = [];
for (let year = 2026; year >= 1930; year--) years.push(year);
const months = Array.from({ length: 12 }, (_, i) => i + 1);

function calendarBtnStyle(active) {
  return {
    height: 44,
    border: "1px solid " + (active ? "#191713" : "#d6cfc3"),
    background: active ? "#191713" : "#fbf9f6",
    color: active ? "#f6f3ee" : "#191713",
    font: "400 13px/1 'Noto Sans KR',sans-serif",
    letterSpacing: ".04em",
    cursor: "pointer",
  };
}

export default function Form({ frame }) {
  const {
    calendarType,
    y,
    m,
    d,
    isLeapMonth,
    leapAvailable,
    goLanding,
    submit,
    setCalendar,
    setY,
    setM,
    setD,
    toggleLeapMonth,
    daysInMonth,
  } = frame;

  const days = Array.from({ length: daysInMonth(y, m, isLeapMonth) }, (_, i) => i + 1);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: "56px 28px 36px",
        boxSizing: "border-box",
        animation: "sj-up .45s ease both",
      }}
    >
      <button
        type="button"
        onClick={goLanding}
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
        ← BACK
      </button>

      <h2 style={{ margin: "40px 0 0", font: "300 27px/1.5 'Noto Serif KR',serif" }}>
        태어난 날을
        <br />
        알려주세요
      </h2>
      <p style={{ margin: "14px 0 0", font: "300 12.5px/1.8 'Noto Sans KR',sans-serif", color: "#6b6459" }}>
        일주는 태어난 날로 결정됩니다.
      </p>

      <div style={{ marginTop: 38 }}>
        <div style={sectionLabelStyle}>CALENDAR</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
          <button type="button" onClick={() => setCalendar("solar")} style={calendarBtnStyle(calendarType === "solar")}>
            양력
          </button>
          <button type="button" onClick={() => setCalendar("lunar")} style={calendarBtnStyle(calendarType === "lunar")}>
            음력
          </button>
        </div>
      </div>

      <div style={{ marginTop: 30 }}>
        <div style={sectionLabelStyle}>BIRTH DATE</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.25fr 1fr 1fr",
            gap: 10,
            marginTop: 12,
          }}
        >
          <label style={{ display: "block", position: "relative" }}>
            <select value={y} onChange={(e) => setY(+e.target.value)} style={selectStyle}>
              {years.map((it) => (
                <option key={it} value={it}>
                  {it}년
                </option>
              ))}
            </select>
          </label>
          <label style={{ display: "block", position: "relative" }}>
            <select value={m} onChange={(e) => setM(+e.target.value)} style={selectStyle}>
              {months.map((it) => (
                <option key={it} value={it}>
                  {it}월
                </option>
              ))}
            </select>
          </label>
          <label style={{ display: "block", position: "relative" }}>
            <select value={d} onChange={(e) => setD(+e.target.value)} style={selectStyle}>
              {days.map((it) => (
                <option key={it} value={it}>
                  {it}일
                </option>
              ))}
            </select>
          </label>
        </div>

        {calendarType === "lunar" && (
          <button
            type="button"
            onClick={toggleLeapMonth}
            disabled={!leapAvailable}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 14,
              border: "none",
              background: "none",
              padding: 0,
              cursor: leapAvailable ? "pointer" : "default",
              opacity: leapAvailable ? 1 : 0.4,
            }}
          >
            <span
              style={{
                width: 16,
                height: 16,
                border: "1px solid #a09889",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: isLeapMonth ? "#191713" : "transparent",
              }}
            >
              <span style={{ width: 8, height: 8, background: isLeapMonth ? "#f6f3ee" : "transparent" }} />
            </span>
            <span style={{ font: "300 12.5px/1 'Noto Sans KR',sans-serif", color: "#6b6459" }}>
              윤달(윤달생인 경우 선택)
            </span>
          </button>
        )}
      </div>

      <div style={{ marginTop: "auto", paddingTop: 40 }}>
        <button
          type="button"
          onClick={submit}
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
          조향 시작하기
        </button>
      </div>
    </div>
  );
}
