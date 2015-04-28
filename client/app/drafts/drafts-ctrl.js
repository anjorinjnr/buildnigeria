/**
 * Created by davidadamojr on 4/15/15.
 */
define(function () {

    var DraftsCtrl = function (user) {
       this.user = user;
    };

    DraftsCtrl.$inject = ['user'];
    return DraftsCtrl;
});