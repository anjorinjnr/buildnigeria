/**
 * Created by davidadamojr on 4/30/15.
 */
define(function () {
    // TODO : implement add solution from issue-detail, implement more expander.
        
    var DRAFT = 0;
    var PUBLISHED = 1;
    
    var IssueCtrl = function (issue, user, ideaService, util) {
        this.issue = issue;
        this.user = user;
        this.ideaService = ideaService;
        this.util = util;
        this.votes = {
            up: {},
            down: {}
        };
        this.solution = {user_id: this.user.id, issue_id: this.issue.id, detail: ''};
        
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
        
        this.errors = {};
        
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
    
    IssueCtrl.prototype.saveSolution = function (saveAsDraft) {
        
        // ensure this user has not already proposed a solution to this problem 
        for (var i=0; i<this.issue.solutions.length; i++) {
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
        console.log(this.solution);
        // save solution
        self.ideaService.saveSolution(this.solution, function (resp) {
            if (resp.status === 'success') {
                if (saveAsDraft) {
                    // update draft count if new draft is saved
                    if (!self.solution.id) self.user.drafts++;
                    self.solution = resp.data;
                    self.util.toast('Draft saved.');
                } else {
                    console.log("Response: " + JSON.stringify(resp.data));
                    self.issue.solutions.push(resp.data);
                    self.errors = {};
                    self.solution = {user_id: self.user.id, issue_id: self.issue.id, detail: ''}
                    self.util.toast('Posted.');
                }
            }
        });
    };

    IssueCtrl.$inject = ['issue', 'user', 'ideaService', 'util'];
    return IssueCtrl;
});