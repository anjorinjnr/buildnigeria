/**
 * Created by eanjorin on 5/6/15.
 */
define(function () {

    var IssueCardDirective = function (ideaService, util) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                issue: '=',
                user: '='
            },
            templateUrl: 'components/issue-card/issue-card.html',
            link: function (scope) {

                scope.util = util;
                scope.votes = {
                    up: {},
                    down: {}
                };

                //count votes for the first solution
                //and update state if the user already upvoted or downvoted the solution
                if (scope.issue.solutions.length > 0) {
                    var solution = scope.issue.solutions[0];
                    try {
                        //console.log($(solution.detail).text().length);
                        solution.showMore = ($(solution.detail).text().length > 350) ? true : false;
                    } catch (e) {
                        solution.showMore = solution.detail.length > 350 ? true : false;

                    }

                    solution.votes.forEach(function (vote) {
                        if (vote.vote_type == 'up_vote') {
                            solution.up_vote++;
                            if (vote.user_id === scope.user.id) {
                                scope.votes.up[solution.id] = true;
                            }
                        } else if (vote.user_id === scope.user.id) {
                            scope.votes.down[solution.id] = true;
                        }
                    });
                }

                scope.downVoteSolution = function (solution) {
                    solution.voteLoading = true;
                    ideaService.downVoteSolution({'user_id': scope.user.id, 'item_id': solution.id}, function (resp) {
                        solution.voteLoading = false;
                        if (resp.status === 'success') {
                            //if wasn't downvoted before,
                            //if user already upvoted, negate that
                            //mark as down voted
                            if (!(solution.id in scope.votes.down)) {
                                if (solution.id in scope.votes.up) {
                                    delete scope.votes.up[solution.id];
                                    solution.up_vote--;
                                }
                                scope.votes.down[solution.id] = true;
                            } else {
                                //was downvoted before, undo downvote
                                delete scope.votes.down[solution.id];
                            }
                        }
                    });
                };

                scope.upVoteSolution = function (solution) {
                    solution.voteLoading = true;
                    ideaService.upVoteSolution({'user_id': scope.user.id, 'item_id': solution.id}, function (resp) {
                        solution.voteLoading = false;
                        if (resp.status === 'success') {
                            //if wasn't upvoted before, increase vote
                            //remove downvote if available and mark as upvoted
                            if (!(solution.id in scope.votes.up)) {
                                scope.votes.up[solution.id] = true;
                                delete scope.votes.down[solution.id];
                                solution.up_vote++;
                            } else {
                                //was upvoted before, undo upvote
                                delete scope.votes.up[solution.id];
                                solution.up_vote--;
                            }

                        }
                    });

                };

            }
        }

    };
    IssueCardDirective.$inject = ['ideaService', 'util'];
    return IssueCardDirective;

});