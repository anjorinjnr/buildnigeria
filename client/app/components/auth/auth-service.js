define(function () {

    var AuthService = function (API_PATH, $cookieStore, $rootScope) {
        this.API_PATH = API_PATH;
        this.cookieStore = $cookieStore;
        this.rootScope = $rootScope;
        this.currentUser = null;
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

    AuthService.prototype.currentUser = function () {
        return this.currentUser;
    };
    AuthService.prototype.isLoggedIn = function () {
        if (this.hasSession() && !_.isNull(this.currentUser())) {
            return true;
        }
        this.rootScope.$broadcast('nt.isNotLoggedIn');
        return false;

    };


    AuthService.prototype.loginWithFacebook = function () {
        var url = this.API_PATH + 'auth/login-with-facebook';
        window.open(url, '', 'width=400, height=300');
    };

    AuthService.$inject = ['API_PATH', '$cookieStore', '$rootScope'];
    
    return AuthService;
});