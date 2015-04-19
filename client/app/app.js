var APP_VER =  0.5;
define(['angular',
        './state-config',
        'main/main-ctrl',
        'login/login-ctrl',
        'home/home-ctrl',
        'ideas/idea-ctrl',
        'components/auth/auth-service',
        //'angularMaterial',
        'uiRouter', 'angularResource', 'angularCookies'],
    function (angular,
              StateConfig,
              MainCtrl,
              LoginCtrl,
              HomeCtrl,
              IdeaCtrl,
              AuthService) {

        var app = angular.module(
            'buildnigeria.web',
            [
                //  'ngMaterial',
                'ngCookies',
                'ui.router',
                'ngResource'
            ]);
        app.config(StateConfig)
            .controller('MainCtrl', MainCtrl)
            .controller('LoginCtrl', LoginCtrl)
            .controller('HomeCtrl', HomeCtrl)
            .controller('IdeaCtrl', IdeaCtrl)
            .service('authService', AuthService);


        app.run(['$state', '$stateParams', '$location', '$rootScope', function () {

        }]);

        if (window.location.hostname.indexOf('buildnigeria.com.ng') >= 0) {
            app.constant('API_PATH', 'http://api.buildnigeria.com.ng/');
        } else {
            app.constant('API_PATH', 'http://buildnigeria-service.local/');
        }
        return app;
    });