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
    MainCtrl.prototype.onSearchSubmit = function() {
        alert("Hello world!");
        $state.go('search');
    };

    MainCtrl.inject = ['authService', '$state'];
    return MainCtrl;
});