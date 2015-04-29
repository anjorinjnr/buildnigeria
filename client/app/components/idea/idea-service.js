/**
 * Created by eanjorin on 4/26/15.
 */
define(function () {


    var IdeaService = function ($resource, API_PATH) {
        var Idea = $resource(API_PATH,
            {id: '@id'},
            {
                createIssue: {
                    method: 'POST',
                    url: API_PATH + 'issue',
                    isArray: false
                },
                categories: {
                    method: 'GET',
                    url: API_PATH + 'categories',
                    isArray: true
                },
                issues: {
                    method: 'GET',
                    url: API_PATH + 'issues',
                    isArray: true
                }
            }
        );
        return Idea;

    };
    IdeaService.$inject = ['$resource', 'API_PATH'];
    return IdeaService;

});