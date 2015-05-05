/**
 * Created by eanjorin on 5/1/15.
 */
define(['hashids'], function (Hashids) {

    var Util = function (ngToast, $sce) {
        this.ngToast = ngToast;
        this.hasher = new Hashids('#a$her-th@n-th0u', 12);
        this.$sce = $sce;
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

    Util.prototype.encodeId = function (id) {
        return this.hasher.encode(id);
    };
    Util.prototype.decodeId = function (id) {
        if (_.isString(id) && id.length === 12) {
            return this.hasher.decode(id)[0];
        }
    };

    Util.prototype.trustAsHtml = function (string) {
        return this.$sce.trustAsHtml(string);
    };
    Util.$inject = ['ngToast', '$sce'];
    return Util;

});