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
  /**
   *
   * @param {string} month - full month name: January
   *
   * @returns {number} - month number
   * for January, returns 1 and so on
   */
  getMonthNumber(month) {
    try {
      if (monthNames.indexOf(month) + 1 < 10) return `0${monthNames.indexOf(month) + 1}`;
      else return monthNames.indexOf(month) + 1;
    } catch (err) {
      throw new Error(err);
    }
  },

  /**
   * converts signle digit day into two digit: 1 to 01
   *
   * @param {string} day
   *
   * @returns {string}
   */
  formatDayNumber(day) {
    if (day.split('').count == 2) return day;
    else return `0${day}`;
  },

  /**
   * converts 12 hour format into 24 hour format
   *
   * @param {string} hour - in 12 hour format
   * @param {string} period - AM or  PM
   *
   * @returns {number} - in 24 hour format
   */
  formatHour24(hour, period) {
    if (period === 'AM') return parseInt(hour);
    else if (parseInt(hour) <= 12) return parseInt(hour) + 12;
  },
};
