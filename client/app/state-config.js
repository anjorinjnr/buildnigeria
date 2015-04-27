/**
 * Created by eanjorin on 4/7/15.
 */
define(function () {
    var StateConfig = function ($stateProvider, $urlRouterProvider) {

        var resolves = {
            //return user data, if user is logged in
            loggedInUser: ['userService', '$cookieStore', 'authService', '$q', '$state',
                function (userService, $cookieStore, authService, $q, $state) {
                    var userPromise = $q.defer();
                    //check if session information exist, and query user information
                    var session = authService.getSession();
                    if (session) {
                        userService.get({'user_token': session.user_token}, function (user) {
                            if (user) {
                                userPromise.resolve(user);
                                authService.setCurrentUser(user);
                            } else {
                                userPromise.resolve(null);
                            }
                        });
                    } else {
                        userPromise.resolve(null);
                    }
                    return userPromise.promise;
                }],
            ideas: function () {
                //@todo

            },
            categories: function () {
                //@todo

            }

        };


        $stateProvider
            .state('main', {
                abstract: true,
                templateUrl: 'main/main.html'
            })

            .state('logout', {
                url: '/logout'
            })

            .state('home', {
                url: '/home',
                controller: 'HomeCtrl as homeCtrl',
                parent: 'main',
                templateUrl: 'home/home.html',
                resolve: {
                    user: resolves.loggedInUser
                },
                data: {
                    public: false
                }

            })

            .state('idea-detail', {
                url: '/ideas/:ideaId',
                templateUrl: 'ideas/idea.html',
                parent: 'main',
                controller: 'IdeaCtrl as ideaCtrl'
            })

            .state('oauth-callback', {
                url: '/oauth',
                controller: ['$location', 'authService', '$rootScope', function ($location, authService, $rootScope) {
                    var token = $location.search().ut;
                    if (token) {
                        if (window.opener != null) {
                            window.opener.authCallback(token.trim());
                            window.close();
                        } else {
                            window.location = window.location.origin + '/#/home';
                        }
                    } else {
                        if (window.opener != null) {
                            //@todo append param for login error
                            window.opener.location = window.location.origin + '/#/login';
                            window.close();
                        } else {
                            window.location = window.location.origin + '/#/login';
                        }
                    }

                }]
            })

            
            .state('share', {
                url: '/share',
                controller: 'ShareCtrl as shareCtrl',
                templateUrl: 'share/share.html',
                parent: 'main',
                resolve: {
                    user: resolves.loggedInUser
                },
                data: {
                    public: false
                }
            })
            
            .state('search', {
                url: '/search',
                controller: 'SearchCtrl as searchCtrl',
                templateUrl: 'search/search.html',
                parent: 'main',
                data: {
                    public: true
                }
            })

            .state('login', {
                url: '/',
                templateUrl: 'login/login_two_col.html',
                controller: 'LoginCtrl as loginCtrl',
                data: {
                    public: true
                }
            })
            
            .state('register', {
                url: '/register',
                templateUrl: 'register/register.html',
                controller: 'RegisterCtrl as registerCtrl',
                data: {
                    public: true
                }
            });

        $urlRouterProvider.otherwise('/');


    };
    StateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    return StateConfig;
});