/**
 * Created by davidadamojr on 4/28/15.
 */
define(function () {

    var IssueDraftCtrl = function (user) {
       this.user = user;
    };

    IssueDraftCtrl.$inject = ['user'];
    return IssueDraftCtrl;
});