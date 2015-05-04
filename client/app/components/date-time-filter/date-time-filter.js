/**
 * Created by eanjorin on 11/1/14.
 */
define(['moment'], function (moment) {

    var formatDateFilter = function () {
        /**

         YYYY    2014    4 digit year
         YY    14    2 digit year
         Q    1..4    Quarter of year. Sets month to first month in quarter.
         M MM    1..12    Month number
         MMM MMMM    January..Dec    Month name in locale set by moment.locale()
         D DD    1..31    Day of month
         Do    1st..31st    Day of month with ordinal
         DDD DDDD    1..365    Day of year
         X    1410715640.579    Unix timestamp
         x    1410715640579    Unix ms timestamp
         */
        /**
         *
         * @param {string} input
         * @param {string} srcFormat
         * @param {string} dstFormat
         * @returns {string}
         */
        return function (input, srcFormat, dstFormat) {
            if (angular.isString(srcFormat) && srcFormat.trim().length > 0) {
                return moment(input, srcFormat).format(dstFormat);
            } else {
                return moment(input).format(dstFormat);
            }

        };
    };
    return formatDateFilter;
});
