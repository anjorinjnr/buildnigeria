/**
 * Created by eanjorin on 4/7/15.
 */
define(function () {

    var MainCtrl = function (authService) {
        this.authService = authService;
    };
    MainCtrl.prototype.signUpWithFacebook = function(){
        this.authService.loginWithFacebook();

    };

    MainCtrl.inject = ['authService'];
    return MainCtrl;
});