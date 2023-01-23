import dayjs from "dayjs";

export function generateDatesFromYearBeginning() {
  const firstDayOfTheYear = dayjs().startOf("year");

  const dates = [];
  let compareDate = firstDayOfTheYear;
  let limitDays = 120;

  while (dates.length < limitDays) {
    dates.push(compareDate.toDate());
    compareDate = compareDate.add(1, "day");
  }

  return dates;
}
