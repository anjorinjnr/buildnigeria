/**
 * Created by eanjorin on 12/30/14.
 */
define(function () {


    var hashIdFilter = function (util) {
        return function (input) {
            return util.encodeId(input);
        };
    };
    hashIdFilter.$inject = ['util'];
    return hashIdFilter;
});
