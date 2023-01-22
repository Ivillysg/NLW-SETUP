import dayjs from "dayjs";

export function generateDatesFromYearBeginning() {
  const firstDayOfTheYear = dayjs().startOf("year");
  console.log(firstDayOfTheYear.toDate());
  const today = new Date();

  const dates = [];
  let compareDate = firstDayOfTheYear;
  let limitDays = dayjs(firstDayOfTheYear).daysInMonth();

  console.log(compareDate.isBefore(today));

  while (dates.length < limitDays) {
    dates.push(compareDate.toDate());
    compareDate = compareDate.add(1, "day");
  }
  console.log(dates);

  return dates;
}
