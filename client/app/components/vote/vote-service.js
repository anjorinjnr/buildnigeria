/**
 * Created by eanjorin on 5/8/15.
 */
define(function () {

    var VoteService = function (ideaService, user) {
        this.ideaService = ideaService;
        this.user = user;
        this.votes = {
            up: {},
            down: {}
        };

    };

    VoteService.prototype.upVoteSolution = function (solution) {
        var self = this;
        solution.voteLoading = true;
        self.ideaService.upVoteSolution({'user_id': self.user.id, 'item_id': solution.id}, function (resp) {
            solution.voteLoading = false;
            if (resp.status === 'success') {
                //if wasn't upvoted before, increase vote
                //remove downvote if available and mark as upvoted
                if (!(solution.id in self.votes.up)) {
                    self.votes.up[solution.id] = true;
                    delete self.votes.down[solution.id];
                    solution.up_vote++;
                } else {
                    //was upvoted before, undo upvote
                    delete self.votes.up[solution.id];
                    solution.up_vote--;
                }

            }
        });

    };
    VoteService.prototype.downVoteSolution = function (solution) {
        var self = this;
        solution.voteLoading = true;
        self.ideaService.downVoteSolution({'user_id': self.user.id, 'item_id': solution.id}, function (resp) {
            solution.voteLoading = false;
            if (resp.status === 'success') {
                //if wasn't downvoted before,
                //if user already upvoted, negate that
                //mark as down voted
                if (!(solution.id in self.votes.down)) {
                    if (solution.id in self.votes.up) {
                        delete self.votes.up[solution.id];
                        solution.up_vote--;
                    }
                    self.votes.down[solution.id] = true;
                } else {
                    //was downvoted before, undo downvote
                    delete self.votes.down[solution.id];
                }
            }
        });
    };
    VoteService.$inject = ['ideaService', 'authService'];
    return VoteService;
});