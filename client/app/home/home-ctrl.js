/**
 * Created by davidadamojr on 4/15/15.
 */
define(function () {

    var HomeCtrl = function (user, issues, categories, ideaService) {
        this.user = user;
        this.issues = issues;
        this.categories = categories;
        this.votes = {
            solutions: {
                up: {},
                down: {}
            }
        };
        var self = this;
        //perform preprocessing on issues
        //sum votes for all solutions
        //populate upvote/downvote information for the first solution
        //so user action can be handled correctly
        this.issues.forEach(function (issue) {
            if (issue.solutions.length > 0) {
                var i = 0;
                issue.solutions.forEach(function (sol) {
                    var upvote = 0;
                    sol.votes.forEach(function (vote) {
                        if (vote.vote_type == 'up_vote') upvote++;
                        if (i == 0 && vote.vote_type == 'up_vote') {
                            self.votes.solutions.up[vote.item_id] = true;
                        } else {
                            self.votes.solutions.down[vote.item_id] = true;
                        }
                    });
                    i++;
                    sol.up_vote = upvote;
                });
            }
        });
        this.ideaService = ideaService;

    };

    /**
     * Upvote a solution
     * @param solution
     */
    HomeCtrl.prototype.upVoteSolution = function (solution) {
        var self = this;
        this.voteLoading = true;
        this.ideaService.upVoteSolution({'user_id': this.user.id, 'item_id': solution.id}, function (resp) {
            self.voteLoading = false;
            if (resp.status === 'success') {
                //if wasn't upvoted before, increase vote
                //remove downvote if available and mark as upvoted
                if (!(solution.id in self.votes.solutions.up)) {
                    self.votes.solutions.up[solution.id] = true;
                    delete self.votes.solutions.down[solution.id];
                    solution.up_vote++;
                } else {
                    //was upvoted before, undo upvote
                    delete self.votes.solutions.up[solution.id];
                    solution.up_vote--;
                }

            }
        });

    };

    /**
     * Downvote a solution
     * @param solution
     */
    HomeCtrl.prototype.downVoteSolution = function (solution) {
        var self = this;
        this.voteLoading = true;
        this.ideaService.downVoteSolution({'user_id': this.user.id, 'item_id': solution.id}, function (resp) {
            self.voteLoading = false;
            if (resp.status === 'success') {
                //if wasn't downvoted before,
                //if user already upvoted, negate that
                //mark as down voted
                if (!(solution.id in self.votes.solutions.down)) {
                    if (solution.id in self.votes.solutions.up) {
                        delete self.votes.solutions.up[solution.id];
                        solution.up_vote--;
                    }
                    self.votes.solutions.down[solution.id] = true;
                } else {
                    //was downvoted before, undo downvote
                    delete self.votes.solutions.down[solution.id];
                }

            }
        });


    };

    HomeCtrl.$inject = ['user', 'issues', 'categories', 'ideaService'];
    return HomeCtrl;
});