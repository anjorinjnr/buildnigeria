/**
 * Created by eanjorin on 10/6/14.
 */
define(function () {

    var sentenceCaseFilter = function () {
        return function (input) {
            if (angular.isString(input)) {
                return input.charAt(0).toUpperCase() +
                    input.substring(1, input.length).toLowerCase();
            }
            return input;
        }
    };
    return sentenceCaseFilter;
});
