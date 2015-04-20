/**
 * Created by davidadamojr on 4/15/15.
 */
define(function () {

    var HomeCtrl = function (user) {
       this.user = user;
    };

    HomeCtrl.$inject = ['user'];
    return HomeCtrl;
});