/**
 * Created by eanjorin on 4/12/15.
 */
define(function () {

    var LoginCtrl = function (authService, userService, tipService, $state) {
        this.authService = authService;
        this.userService = userService;
        this.tipService = tipService;
        this.$state = $state;
        this.user = {};
        this.errors = [];
    };
    LoginCtrl.prototype.signUpWithFacebook = function () {
        this.authService.loginWithFacebook();
    };

    LoginCtrl.prototype.loginWithEmail = function (form) {
        var self = this;
        form.submitted = true;
        if (form.$valid) {
            self.userService.login(self.user, function (resp) {
                if (resp.status === 'error') {
                    self.errors = resp.errors;
                } else {
                    self.authService.createSession(resp.user_token);
                    self.$state.go('home');
                }
            });
        }
    };


    LoginCtrl.inject = ['authService', 'userService', 'tipService', '$state'];
    return LoginCtrl;
});