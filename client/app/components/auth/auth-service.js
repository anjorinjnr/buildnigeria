define(function () {

    var currentUser = null;
    var AuthService = function (API_PATH, $cookieStore, $rootScope) {
        this.API_PATH = API_PATH;
        this.cookieStore = $cookieStore;
        this.rootScope = $rootScope;

    };

    AuthService.prototype.login = function () {

    };

    AuthService.prototype.createSession = function (userToken) {
        var session = {
            user_token: userToken
        };
        this.cookieStore.put('user', session);
    };

    AuthService.prototype.hasSession = function () {
        return !_.isUndefined(this.getSession());
    };

    AuthService.prototype.getSession = function () {
        return this.cookieStore.get('user');
    };

    AuthService.prototype.setCurrentUser = function (user) {
        currentUser = user;
    };

    AuthService.prototype.currentUser = function () {
        return currentUser;
    };
    AuthService.prototype.isLoggedIn = function () {
        if (this.hasSession() && !_.isNull(currentUser)) {
            return true;
        }
        this.rootScope.$broadcast('nt.isNotLoggedIn');
        return false;

    };

    AuthService.prototype.logout = function () {
        this.cookieStore.remove('user');
        currentUser = null;
        window.location = '#/';
    };


    AuthService.prototype.loginWithFacebook = function () {
        var self = this;
        var url = this.API_PATH + 'auth/login-with-facebook';
        window.authCallback = function (token) {
            self.createSession(token);
            window.location.href = 'http://buildnigeria.com.ng/#/home';
        };
        window.open(url, '', 'width=400, height=300');
    };

    AuthService.$inject = ['API_PATH', '$cookieStore', '$rootScope'];

    return AuthService;
});