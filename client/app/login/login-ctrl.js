/**
 * Created by eanjorin on 4/12/15.
 */
define(function () {

    var LoginCtrl = function (authService) {
        this.authService = authService;
    };
	LoginCtrl.prototype.signUpWithFacebook = function() {
		this.authService.loginWithFacebook();
	};
	
	LoginCtrl.inject = ['authService'];
    return LoginCtrl;
});