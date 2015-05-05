/**
 * Created by eanjorin on 4/7/15.
 */
define(function () {

    var MainCtrl = function (authService) {
        this.authService = authService;
    };
    MainCtrl.prototype.signUpWithFacebook = function () {
        this.authService.loginWithFacebook();

    };
    MainCtrl.prototype.onSearchSubmit = function (keyEvent) {
        if (keyEvent.keyCode == 13 && this.searchTerm) {
            $state.go('search', {term: this.searchTerm});

        }


    };

    MainCtrl.inject = ['authService', '$state'];
    return MainCtrl;
});