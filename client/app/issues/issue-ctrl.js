/**
 * Created by davidadamojr on 4/30/15.
 */
define(function () {

    var IssueCtrl = function (issue, user, ideaService) {
        this.issue = issue;
        this.user = user;
        this.ideaService = ideaService;
        this.votes = {
            up: {},
            down: {}
        };
        
        var self = this;
        
        // only do this if there are solutions to preprocess
        if (this.issue.solutions.length > 0) {
            var solutions = this.issue.solutions;
            solutions.forEach(function (solution) {
                solution.showMore = (solution.detail.length > 350) ? true : false;
                solution.votes.forEach(function (vote) {
                    if (vote.vote_type == 'up_vote') {
                        solution.upvote++;
                        if (vote.user_id === self.user.id) {
                            self.votes.up[solution.id] = true;
                        }
                    } else if (vote.user_id == self.user.id) {
                        self.votes.down[solution.id] = true;
                    }
                });
            });
        }
        console.log(issue);
    };
    
    IssueCtrl.prototype.upVoteSolution = function (solution) {
        solution.voteLoading = true;
        var self = this;
        this.ideaService.upVoteSolution({'user_id': this.user.id, 'item_id': solution.id}, function (resp) {
            solution.voteLoading = false;
            if (resp.status === 'success') {
                // if wasn't upvoted before, increase vote
                // remove downvote if available and mark as upvoted
                if (!(solution.id in self.votes.up)) {
                    self.votes.up[solution.id] = true;
                    delete self.votes.down[solution.id];
                    solution.up_vote++;
                } else {
                    // was upvoted before, undo upvote
                    delete self.votes.up[solution.id];
                    solution.up_vote--;
                }
            }
        });
    };
    
    IssueCtrl.prototype.downVoteSolution = function (solution) {
        solution.voteLoading = true;
        var self = this;
        this.ideaService.downVoteSolution({'user_id': this.user.id, 'item_id': solution.id}, function (resp) {
            solution.voteLoading = false;
            if (resp.status === 'success') {
                // if wasn't downvoted before,
                // if user already upvoted, remove upvote
                // mark as downvoted
                if (!(solution.id in self.votes.down)) {
                    if (solution.id in self.votes.up) {
                        delete self.votes.up[solution.id];
                        solution.up_vote--;
                    }
                    self.votes.down[solution.id] = true;
                } else {
                    // was downvoted before, undo downvote
                    delete self.votes.down[solution.id];
                }
            }
        });
    };

    IssueCtrl.$inject = ['issue', 'user', 'ideaService'];
    return IssueCtrl;
});