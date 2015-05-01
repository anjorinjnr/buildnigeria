/**
 * Created by eanjorin on 4/19/15.
 */
define(function () {

    var UserService = function ($resource, API_PATH) {
        var User = $resource(API_PATH + 'user/:id',
            {id: '@id'},
            {
                save: {
                    method: 'POST',
                    url: API_PATH + 'user/:id',
                    isArray: false,
                    cache: true
                },
                login: {
                    method: 'POST',
                    url: API_PATH + 'user/login',
                    isArray: false
                },
                drafts: {
                    method: 'GET',
                    url: API_PATH + 'user/:id/drafts',
                    isArray: true

                }
            }
        );
        return User;

    };
    UserService.$inject = ['$resource', 'API_PATH'];
    return UserService;

});