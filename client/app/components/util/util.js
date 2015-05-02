/**
 * Created by eanjorin on 5/1/15.
 */
define(function () {

    var Util = function (ngToast) {
        this.ngToast = ngToast;
    };

    Util.prototype.toast = function (message) {
        this.ngToast.create(message)
    };
    Util.prototype.loading = function () {
        this.ngToast.create('loading..');
    };

    Util.prototype.dismissToast = function () {
        this.ngToast.dismiss();
    };

    Util.$inject = ['ngToast'];
    return Util;

});