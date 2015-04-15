/**
 * Created by eanjorin on 4/7/15.
 */
define(['components/auth/auth-service'], function (authService) {
    console.log(authService);
    var StateConfig = function ($stateProvider, $urlRouterProvider) {

        $stateProvider
		
			.state ('home', {
			
			})
			
            .state('facebookcallback', {
                url: '/oauth/callback/fb',
                controller: authService.facebookCallback
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