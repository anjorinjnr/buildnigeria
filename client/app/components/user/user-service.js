/**
 * Created by eanjorin on 4/19/15.
 */
define(function () {

    var UserService = function ($resource, API_PATH) {
        var User = $resource(API_PATH + 'user/:user_id',
            {user_id: '@user_id'},
            {
                save: {
                    method: 'POST',
                    url: API_PATH + 'user/:user_id',
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
                    url: API_PATH + 'user/:user_id/drafts/:type',
                    isArray: false

                },
                deleteDrafts: {
                    method: 'POST',
                    url: API_PATH + 'user/:user_id/drafts/:type/delete',
                    isArray: false
                }
            }
        );
        return User;

    };
    UserService.$inject = ['$resource', 'API_PATH'];
    return UserService;

});