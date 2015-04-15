define(['angular',
        './state-config',
        'main/main-ctrl',
        'login/login-ctrl',
        'components/auth/auth-service',
        //'angularMaterial',
        'uiRouter', 'angularResource'],
    function (angular,
              StateConfig,
              MainCtrl,
              LoginCtrl,
              AuthService) {

        var app = angular.module(
            'buildnigeria.web',
            [
                //  'ngMaterial',
                'ui.router',
                'ngResource'
            ]);
        app.config(StateConfig)
            .controller('MainCtrl', MainCtrl)
            .controller('LoginCtrl', LoginCtrl)
            .service('authService', AuthService)


        app.run(['$state', '$stateParams', '$location', '$rootScope', function () {

        }]);

        if (window.location.hostname.indexOf('buildnigeria.com.ng') >= 0) {
            app.constant('API_PATH', 'http://api.buildnigeria.com.ng/');
        } else {
            app.constant('API_PATH', 'http://buildnigeria-service.local/');
        }
        return app;
    });