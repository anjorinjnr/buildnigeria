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
                issues: {
                    method: 'GET',
                    url: API_PATH + 'user/:user_id/issues',
                    isArray: false
                },
                solutions: {
                    method: 'GET',
                    url: API_PATH + 'user/:user_id/solutions',
                    isArray: false
                },
                deleteDrafts: {
                    method: 'POST',
                    url: API_PATH + 'user/:user_id/drafts/:type/delete',
                    isArray: false
                },
                deleteIssue: {
                    method: 'DELETE',
                    url: API_PATH + 'user/:user_id/issue/:issue_id',
                    isArray: false
                },
                deleteSolution: {
                    method: 'DELETE',
                    url: API_PATH + 'user/:user_id/solution/:solution_id',
                    isArray: false

                }
            }
        );
        return User;

    };
    UserService.$inject = ['$resource', 'API_PATH'];
    return UserService;

});