/**
 * Created by davidadamojr on 4/21/15
 */
define(function () {

    var RegisterCtrl = function (userService, authService, $state) {
        this.userService = userService;
        this.authService = authService;
        this.$state = $state;
        this.user = {};
    };

    RegisterCtrl.prototype.register = function (form) {
        var self = this;
        if (form.$valid) {
            this.userService.save(this.user, function (resp) {
                if (resp.status === 'error') {
                    self.errors = resp.errors;
                } else {
                    self.authService.createSession(resp.user_token);
                    self.$state.go('home');
                }
            });

        }
    };

    RegisterCtrl.$inject = ['userService', 'authService', '$state'];

    return RegisterCtrl;
});