/**
 * Created by eanjorin on 4/26/15.
 */
define(function () {


    var IdeaService = function ($resource, API_PATH) {
        var Idea = $resource(API_PATH,
            {id: '@id'},
            {
               saveIssue: {
                    method: 'POST',
                    url: API_PATH + 'issue',
                    isArray: false
                },
                saveSolution: {
                    method: 'POST',
                    url: API_PATH + 'solution',
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
                },
                issue: {
                    method: 'GET',
                    url: API_PATH + 'issue/:issue_id',
                    isArray: false
                },
                solution: {
                    method: 'GET',
                    url: API_PATH + 'solution/:solution_id',
                    isArray: false
                },
                upVoteIssue: {
                    method: 'POST',
                    url: API_PATH + 'vote/issue/up',
                    isArray: false
                },
                downVoteIssue: {
                    method: 'POST',
                    url: API_PATH + 'vote/issue/down',
                    isArray: false
                },
                upVoteSolution: {
                    method: 'POST',
                    url: API_PATH + 'vote/solution/up',
                    isArray: false
                },
                downVoteSolution: {
                    method: 'POST',
                    url: API_PATH + 'vote/solution/down',
                    isArray: false
                }
            }
        );
        return Idea;

    };
    IdeaService.$inject = ['$resource', 'API_PATH'];
    return IdeaService;

});