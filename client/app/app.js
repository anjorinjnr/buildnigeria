define(['angular', './state-config', 'main/main-ctrl', 'login/login-ctrl', 'uiRouter', 'angularResource'],
    function (angular, StateConfig, MainCtrl, LoginCtrl) {

        var app = angular.module(
            'buildnigeria.web',
            [
                'ui.router',
                'ngResource'
            ]);
        app.config(StateConfig)
            .controller('MainCtrl', MainCtrl)
            .controller('LoginCtrl', LoginCtrl);
        return app;
    });