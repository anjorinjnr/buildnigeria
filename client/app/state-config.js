/**
 * Created by eanjorin on 4/7/15.
 */
define(function () {
    var StateConfig = function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('main', {
                abstract: true,
                templateUrl: 'main/main.html'
            })

            .state('home', {
                url: '/home',
                controller: 'HomeCtrl as homeCtrl',
                parent: 'main',
                templateUrl: 'home/home.html'
            })

            .state('idea-detail', {
                url: "/ideas/:ideaId",
                templateUrl: 'ideas/idea.html',
                parent: 'main',
                controller: 'IdeaCtrl as ideaCtrl'
            })

            .state('oauth-callback', {
                url: '/oauth',
                controller: ['$location', 'authService', function ($location, authService) {
                    var token = $location.search().ut;
                    if (token) {
                        if (window.opener != null) {
                            authService.createSession(token.trim());
                            window.opener.location = window.location.origin + '#/home';
                            window.close();
                        } else {
                            window.location = window.location.origin + '#/home';
                        }
                    } else {
                        if (window.opener != null) {
                            //@todo append param for login error
                            window.opener.location = window.location.origin + '#/login';
                            window.close();
                        } else {
                            window.location = window.location.origin + '#/login';
                        }
                    }

                }]
            })

            .state('login', {
                url: '/login',
                templateUrl: 'login/login.html',
                controller: 'LoginCtrl as loginCtrl'
            });

        // redirect from base route to login
        $urlRouterProvider.when('', '/login');

        $urlRouterProvider.otherwise('/');

    };
    StateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    return StateConfig;
});