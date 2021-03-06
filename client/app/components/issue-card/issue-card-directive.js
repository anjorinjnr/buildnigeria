/**
 * Created by eanjorin on 5/6/15.
 */
define(['components/vote/vote-service'], function (VoteService) {

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
                scope.voteService = new VoteService(ideaService, scope.user);

                //count votes for the first solution
                //and update state if the user already upvoted or downvoted the solution
                if (scope.issue.solutions.length > 0) {
                    var solution = scope.issue.solutions[0];
                    //we can't use a directive in html injected with in the page
                    //so we assign a class and use jquery to handle the click event on the more button
                    //when the more button is clicked, we set the solution to display the full view
                    //and run a digest so angular is aware of all the changes.
                    var id = util.encodeId(solution.id);
                    $('body').one('click', '.' + id, function () {
                        solution.fullView = true;
                        scope.$digest();
                    });

                    //wrap solution in a div to make it an htmlelement
                    var htmlContent = $('<div>' + solution.detail + '</div>');

                    try {
                        //find any image included in the solution
                        //if there is at least one image,
                        //extract and compose a truncated version of the solution
                        //where the image is shown first, with the truncated text,
                        var images = htmlContent.find('img');
                        if (images.length > 0) {
                            //remove all images from the  detail
                            htmlContent.find('img').remove();
                            //build truncated content with image pushed to the top
                            solution.miniContent = ['<div>',
                                '<div class="thumbnail-img">',
                                images[0].outerHTML,
                                '</div>',
                                htmlContent.html().substring(0, 350),
                                '...<a class="',
                                id,
                                '">(More)</a>',
                                '</div>'
                                ].join('');
                            //console.log(solution.miniContent);
                        } else if (htmlContent.text().length > 350) {
                            //no image, just show the truncated text
                            //console.log(htmlContent.html()); 
                            solution.miniContent = ['<div>',
                                htmlContent.text().substring(0, 350),
                                '...<a class="', id,
                                '">(More)</a></div>'].join('');
                        } else {
                            solution.miniContent = htmlContent.html();
                        }

                    } catch (e) {
                        console.log(e);
                    }
                    //sum the up_votes for this solution
                    //update state if user upvoted or downvoted the solution
                    solution.votes.forEach(function (vote) {
                        if (vote.vote_type == 'up_vote') {
                            solution.up_vote++;
                            if (vote.user_id === scope.user.id) {
                                scope.voteService.votes.up[solution.id] = true;
                            }
                        } else if (vote.user_id === scope.user.id) {
                            scope.voteService.votes.down[solution.id] = true;
                        }
                    });
                }

            }
        }

    };
    IssueCardDirective.$inject = ['ideaService', 'util'];
    return IssueCardDirective;

});