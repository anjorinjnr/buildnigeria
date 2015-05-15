/**
 * Created by davidadamojr on 4/15/15.
 */
define(['components/vote/vote-service'], function (VoteService) {

    var SolutionCtrl = function (solution, user, ideaService, userService, util, $state) {
       this.solution = solution;
       this.user = user;
       this.userService = userService;
       this.util = util;
       this.state = $state;
       this.voteService = new VoteService(ideaService, user);
       console.log(this.solution);
       
       var self = this;
       
       this.solution.votes.forEach(function (vote) {
            if (vote.vote_type == 'up_vote') {
                self.solution.upvote++;
                if (vote.user_id == self.user.id) {
                    self.voteService.votes.up[self.solution.id] = true;
                }
            } else if (vote.user_id == self.user.id) {
                self.voteService.votes.down[self.solution.id] = true;
            }
       });
    };
    
    SolutionCtrl.prototype.deleteSolution = function (id) {
        var self = this;
        this.userService.deleteSolution({user_id: this.user.id, solution_id: id}, function (resp) {
            if (resp.status === 'success') {
                self.util.toast('Solution deleted.');
                self.state.go('profile-solutions');
            }
        });
    };

    SolutionCtrl.$inject = ['solution', 'user', 'ideaService', 'userService', 'util', '$state'];
    return SolutionCtrl;
});