var APP_VER = 0.5;
define(['angular',
        './state-config',
        'main/main-ctrl',
        'login/login-ctrl',
        'home/home-ctrl',
        'ideas/idea-ctrl',
        'components/auth/auth-service',
        'components/user/user-service',
        //'angularMaterial',
        'lodash', 'uiRouter', 'angularResource', 'angularCookies', 'angularNotify'],
    function (angular,
              StateConfig,
              MainCtrl,
              LoginCtrl,
              HomeCtrl,
              IdeaCtrl,
              AuthService, UserService) {

        var app = angular.module(
            'buildnigeria.web',
            [
                //  'ngMaterial',
                'ngCookies',
                'ui.router',
                'ngResource',
                'cgNotify'
            ]);
        app.config(StateConfig)
            .controller('MainCtrl', MainCtrl)
            .controller('LoginCtrl', LoginCtrl)
            .controller('HomeCtrl', HomeCtrl)
            .controller('IdeaCtrl', IdeaCtrl)
            .service('authService', AuthService)
            .service('userService', UserService);


        app.run(['$state', '$stateParams', '$location', '$rootScope', 'authService',
            function ($state, $stateParams, $location, $rootScope, authService) {
                $rootScope.authService = authService;
                //authService.createSession('261b350e166beed992af9fa0c2f58296');

                $rootScope.$on('$stateChangeStart', function (event, toState) {

                    if (toState.url === '/logout') {
                        event.preventDefault();
                        authService.logout();
                        return;
                    }
                    if (authService.hasSession()) {
                        if ((toState.url === '/' || toState.url === 'login')) {
                            event.preventDefault();
                            $state.go('home');
                        }
                    } else if (toState.data && !toState.data.public) {
                        event.preventDefault();
                        $state.go('login');

                    }


                });
            }]);

        if (window.location.hostname.indexOf('buildnigeria.com.ng') >= 0) {
            app.constant('API_PATH', 'http://api.buildnigeria.com.ng/');
        } else {
            app.constant('API_PATH', 'http://buildnigeria-service.local/');
        }
        return app;
    });