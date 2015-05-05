/**
 * Created by eanjorin on 4/7/15.
 */
define(function () {

    var MainCtrl = function (authService, $state) {
        this.authService = authService;
        this.$state = $state;
    };
    MainCtrl.prototype.signUpWithFacebook = function () {
        this.authService.loginWithFacebook();

    };
    MainCtrl.prototype.onSearchSubmit = function (keyEvent) {
        if (keyEvent.keyCode == 13 && this.searchTerm) {
            this.$state.go('search', {term: this.searchTerm});

        }


    };

    MainCtrl.inject = ['authService', '$state'];
    return MainCtrl;
});