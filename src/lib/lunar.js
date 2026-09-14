import KoreanLunarCalendar from "korean-lunar-calendar";

export function lunarToSolar(year, month, day, isLeapMonth) {
  const cal = new KoreanLunarCalendar();
  const ok = cal.setLunarDate(year, month, day, !!isLeapMonth);
  if (!ok) return null;
  const solar = cal.getSolarCalendar();
  return { y: solar.year, m: solar.month, d: solar.day };
}

export function lunarMonthHasLeap(year, month) {
  const cal = new KoreanLunarCalendar();
  return cal.setLunarDate(year, month, 1, true);
}

export function lunarDaysInMonth(year, month, isLeapMonth) {
  const cal = new KoreanLunarCalendar();
  if (cal.setLunarDate(year, month, 30, !!isLeapMonth)) return 30;
  if (cal.setLunarDate(year, month, 29, !!isLeapMonth)) return 29;
  return 29;
}
