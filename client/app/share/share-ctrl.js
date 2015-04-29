/**
 * Created by davidadamojr on 4/19/15.
 */
define(function () {

    var ShareCtrl = function (user, ideaService, tipService, $scope, ngToast) {
        this.ideaService = ideaService;
        this.tipService = tipService;
        this.user = user;
        this.$scope = $scope;
        this.ngToast = ngToast;
        var self = this;
        ideaService.categories(function (categories) {
            self.categories = [];
            categories.forEach(function (item) {
                self.categories.push({text: item.category})
            });
        });
        this.issueCategories = [];
        this.issue = {user_id: this.user.id, detail: ''};
        this.errors = {};

    };
    ShareCtrl.prototype.suggestTags = function (tag) {
        var filter = [];
        this.categories.forEach(function (item) {
            if (item.text.toLowerCase().indexOf(tag.toLowerCase()) >= 0) {
                filter.push(item);
            }
        });
        return filter;
    };
    ShareCtrl.prototype.postIssue = function (form) {
        this.ngToast.create('Posting issue...');
        var self = this;
        if (_.isEmpty(this.issue.detail) || this.issue.detail.trim().length < 150) {
            this.errors.issueDetail = true;
            return;
        }
        if (this.issueCategories.length == 0) {
            this.errors.missingCategory = true;
            return;
        }
        this.issue.categories = _.pluck(this.issueCategories, 'text');
        self.ideaService.createIssue(self.issue, function (resp) {
            if (resp.status === 'success') {
                self.issue = {};
                self.errors = {};
                self.issueCategories = [];
                self.ngToast.create('Your issue has been posted...');
            }
        });
    };
    ShareCtrl.$inject = ['user', 'ideaService', 'tipService', '$scope', 'ngToast'];
    return ShareCtrl;
});