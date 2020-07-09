const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
module.exports = {
  monthNames: monthNames,
  getMonthNumber(month) {
    try {
      if (monthNames.indexOf(month) + 1 < 10) return `0${monthNames.indexOf(month) + 1}`;
      else return monthNames.indexOf(month) + 1;
    } catch (err) {
      throw new Error(err);
    }
  },
  formatDay(day) {
    if (day.split('').count == 2) return day;
    else return `0${day}`;
  },
  formatHour(hour, period) {
    if (period === 'AM') return hour;
    else if (parseInt(hour) <= 12) return parseInt(hour) + 12;
  },
};
