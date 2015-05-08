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
                        //wrap solution in a div to make it an htmlelement
                        var htmlContent = $('<div>' + solution.detail + '</div>');
                        //find any image included in the solution
                        //if there is at least one image,
                        //extract and compose a truncated version of the solution
                        //where the image is shown first, with the truncated text,
                        var images = htmlContent.find('img');
                        if (images.length > 0) {
                            //we can't use a directive in html injected with in the page
                            //so we assign a class and use jquery to handle the click event on the more button
                            //when the more button is clicked, we set the solution to display the full view
                            //and run a digest so angular is aware of all the changes.
                            var id = util.encodeId(solution.id);
                            $('body').one('click', '.' + id, function () {
                                solution.fullView = true;
                                scope.$digest();
                            });
                            //remove all images from the  subject detail
                            htmlContent.find('img').remove();
                            //build truncated content with image pushed to the top
                            solution.miniContent = ['<div>',
                                '<div class="thumbnail-img">',
                                images[0].outerHTML,
                                '</div>',
                                htmlContent.html().substring(0, 350),
                                '...<a class="', id, '">(More)</a>',
                                '</div>'].join('');
                            //console.log(solution.miniContent);
                        } else {
                            //no image, just show the truncated text
                            solution.miniContent = '<div>' + htmlContent.html().substring(0, 350) + '</div>';
                        }
                        //display showMore button if text is more than 350 characters
                        solution.showMore = htmlContent.text().length > 350 ? true : false;
                    } catch (e) {
                        console.log(e);
                    }
                    //sum the up_votes for this solution
                    //update state if user upvoted or downvoted the solution
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