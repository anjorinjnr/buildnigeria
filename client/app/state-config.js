/**
 * Created by eanjorin on 4/7/15.
 */
define(function () {
    var StateConfig = function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            // setup an abstract state for the tabs directive
            .state('index', {
                url: '/',
                templateUrl: 'main/main.html',
                controller: 'MainCtrl as mainCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'login/login.html'
               // controller: 'LoginCtrl as loginCtrl'
            });

        $urlRouterProvider.otherwise('/');

    };
    StateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    return StateConfig;
});