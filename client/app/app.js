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
        'drafts/drafts-ctrl',
        'issues/issue-ctrl',
        'components/auth/auth-service',
        'components/user/user-service',
        'components/idea/idea-service',
        'components/date-time-filter/date-time-filter',
        'components/sentence-case-filter/sentence-case-filter',
        'components/hashid-filter/hashid-filter',
        'components/util/util',
        'components/tip/tip-module',
        //'angularMaterial',
        'lodash', 'uiRouter', 'angularResource', 'angularCookies', 'ngToast', 'ngTags', 'ngSummernote', 'moment', 'angularSanitize'],
    function (angular,
              StateConfig,
              MainCtrl,
              LoginCtrl,
              HomeCtrl,
              IdeaCtrl,
              RegisterCtrl,
              ShareCtrl,
              SearchCtrl,
              DraftsCtrl,
              IssueCtrl,
              AuthService,
              UserService,
              IdeaService,
              dateTimeFilter,
              sentenceCaseFilter,
              hashIdFilter,
              Util) {

        var app = angular.module(
            'buildnigeria.web',
            [
                //  'ngMaterial',
                'ngCookies',
                'ngToast',
                'ui.router',
                'ngResource',
                'tip.bar',
                'ngTagsInput',
                'summernote',
                'ngSanitize'
            ]);
        app.config(StateConfig)
            .config(['ngToastProvider', function (ngToast) {
                ngToast.configure({
                    verticalPosition: 'top',
                    horizontalPosition: 'center',
                    dismissButton: true,
                    maxNumber: 1
                });
            }])
            .filter('formatDate', dateTimeFilter)
            .filter('sentencecase', sentenceCaseFilter)
            .filter('hashId', hashIdFilter)
            .controller('MainCtrl', MainCtrl)
            .controller('LoginCtrl', LoginCtrl)
            .controller('HomeCtrl', HomeCtrl)
            .controller('IdeaCtrl', IdeaCtrl)
            .controller('RegisterCtrl', RegisterCtrl)
            .controller('ShareCtrl', ShareCtrl)
            .controller('SearchCtrl', SearchCtrl)
            .controller('DraftsCtrl', DraftsCtrl)
            .controller('IssueCtrl', IssueCtrl)
            .service('authService', AuthService)
            .service('userService', UserService)
            .service('ideaService', IdeaService)
            .service('util', Util);


        app.run(['$state', '$stateParams', '$location', '$rootScope', 'authService', 'util',
            function ($state, $stateParams, $location, $rootScope, authService, util) {

                $rootScope.authService = authService;
                $rootScope.util = util;
                //authService.createSession('261b350e166beed992af9fa0c2f58296');

                $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                    $rootScope.stateData = toState.data;
                    //tipService.hide();
                });

                $rootScope.$on('$stateChangeStart', function (event, toState) {

                    //tipService.info('Loading...').show();
                    authService.isPublic = (toState.data && toState.data.public) ? true : false;
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
            // app.constant('API_PATH', 'http://localhost:8000/');
        }
        return app;
    });