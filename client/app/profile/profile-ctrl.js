/**
 * Created by davidadamojr on 5/12/2015
 */
define(function () {
    var ProfileCtrl = function (user, issues, solutions, loader, userService) {
        this.user = user;
        this.issues = issues;
        this.solutions = solutions;
        this.loader = loader;
        this.userService = userService;
        //console.log(this);
    };

    ProfileCtrl.prototype.deleteSolution = function (index, id) {
        var self = this;
        this.userService.deleteSolution({user_id: this.user.id, solution_id: id}, function (resp) {
            if (resp.status === 'success') {
                self.solution.total--;
                self.solutions.data.splice(index, 1);
                self.loader.loadMore(self.solutions);
            }
        })


    };
    ProfileCtrl.prototype.deleteIssue = function (index, id) {
        var self =  this;
        this.userService.deleteIssue({user_id: this.user.id, issue_id: id}, function(resp) {
            if (resp.status === 'success') {
                self.issues.total--;
                self.issues.data.splice(index, 1);
                self.loader.loadMore(self.issues);
            }
        });


    };
    ProfileCtrl.$inject = ['user', 'issues', 'solutions', 'loader', 'userService'];

    return ProfileCtrl;
});