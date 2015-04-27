var APP_VER = 0.6;
define(['angular',
        './state-config',
        'main/main-ctrl',
        'login/login-ctrl',
        'home/home-ctrl',
        'ideas/idea-ctrl',
        'register/register-ctrl',
        'share/share-ctrl',
        'search/search-ctrl',
        'components/auth/auth-service',
        'components/user/user-service',
        'components/tip/tip-module',
        //'angularMaterial',
        'lodash', 'uiRouter', 'angularResource', 'angularCookies', 'ngTags', 'ngSummernote'],
    function (angular,
              StateConfig,
              MainCtrl,
              LoginCtrl,
              HomeCtrl,
              IdeaCtrl,
              RegisterCtrl,
              ShareCtrl,
              SearchCtrl,
              AuthService, UserService) {

        var app = angular.module(
            'buildnigeria.web',
            [
                //  'ngMaterial',
                'ngCookies',
                'ui.router',
                'ngResource',
                'ngTip',
                'ngTagsInput',
                'summernote'
            ]);
        app.config(StateConfig)
            .controller('MainCtrl', MainCtrl)
            .controller('LoginCtrl', LoginCtrl)
            .controller('HomeCtrl', HomeCtrl)
            .controller('IdeaCtrl', IdeaCtrl)
            .controller('RegisterCtrl', RegisterCtrl)
            .controller('ShareCtrl', ShareCtrl)
            .controller('SearchCtrl', SearchCtrl)
            .service('authService', AuthService)
            .service('userService', UserService);


        app.run(['$state', '$stateParams', '$location', '$rootScope', 'authService', 'tipService',
            function ($state, $stateParams, $location, $rootScope, authService, tipService) {

                $rootScope.authService = authService;
                //authService.createSession('261b350e166beed992af9fa0c2f58296');

                $rootScope.$on('$stateChangeSuccess', function () {
                    tipService.hide();
                 });

                $rootScope.$on('$stateChangeStart', function (event, toState) {
                    tipService.info('Loading...').show();

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