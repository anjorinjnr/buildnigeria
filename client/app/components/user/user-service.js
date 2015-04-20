/**
 * Created by eanjorin on 4/19/15.
 */
define(function () {

    var UserService = function ($resource, API_PATH) {
        var User = $resource(API_PATH + 'user/:id',
            {id: '@id'},
            {}
        );
        return User;

    };
    UserService.$inject = ['$resource', 'API_PATH'];
    return UserService;

});