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
            .constant('API_PATH', 'http://buildnigeria-service.local/');

        app.run(['$state', '$stateParams', '$location', '$rootScope', function () {

        }]);
        return app;
    });