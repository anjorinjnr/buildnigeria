/**
 * Created by davidadamojr on 4/30/15.
 */
define(['components/vote/vote-service'], function (VoteService) {

    var DRAFT = 0;
    var PUBLISHED = 1;

    var IssueCtrl = function (issue, user, ideaService, util, $state) {
        this.issue = issue;
        this.user = user;
        this.ideaService = ideaService;
        this.util = util;
        this.state = $state;
        this.solution = {user_id: this.user.id, issue_id: this.issue.id, detail: ''};
        this.voteService = new VoteService(ideaService, user);
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
                            self.voteService.votes.up[solution.id] = true;
                        }
                    } else if (vote.user_id == self.user.id) {
                        self.voteService.votes.down[solution.id] = true;
                    }
                });
            });
        }

        this.errors = {};
       console.log(issue);
    };

    IssueCtrl.prototype.saveSolution = function (saveAsDraft) {

        // ensure this user has not already proposed a solution to this problem 
        for (var i = 0; i < this.issue.solutions.length; i++) {
            var solution = this.issue.solutions[i];
            if (solution.user_id === this.user.id) {
                this.util.toast("You have already proposed a solution to this problem.");
                return;
            }
        }

        if (!saveAsDraft) {
            // user is not saving as draft, so validate
            if (_.isEmpty(this.solution.detail)) {
                this.errors.solutionDetail = true;
                this.util.toast("Please provide text for your proposed solution.");
                return;
            }

            this.util.toast('Posting...');
            this.solution.status = PUBLISHED;
        } else {
            this.util.toast('Saving draft...');
            this.solution.status = DRAFT;
        }

        var self = this;
        //console.log(this.solution);
        // save solution
        self.ideaService.saveSolution(this.solution, function (resp) {
            if (resp.status === 'success') {
                if (saveAsDraft) {
                    // update draft count if new draft is saved
                    if (!self.solution.id) self.user.drafts++;
                    self.solution = resp.data;
                    self.util.toast('Draft saved.');
                   
                } else {
                    //console.log("Response: " + JSON.stringify(resp.data));
                    var solution = resp.data;
                    var encodedSolutionId = self.util.encodeId(solution.id);
                    // self.issue.solutions.push(solution);
                    self.errors = {};
                    self.solution = {user_id: self.user.id, issue_id: self.issue.id, detail: ''}
                    self.util.toast('Posted.');
                    
                    // redirect to issue-detail page after saving
                    self.state.go('solution-detail', { solutionId: encodedSolutionId });
                }
            }
        });
    };

    IssueCtrl.$inject = ['issue', 'user', 'ideaService', 'util', '$state'];
    return IssueCtrl;
});