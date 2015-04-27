/**
 * Created by davidadamojr on 4/19/15.
 */
define(function () {

    var ShareCtrl = function (user, ideaService, tipService) {
        this.ideaService = ideaService;
        this.tipService = tipService;
        this.user = user;
        var self = this;
        ideaService.categories(function (categories) {
            self.categories = [];
            categories.forEach(function (item) {
                self.categories.push({text: item.category})
            });
        });
        this.issueCategories = [];
        this.issue = {user_id: this.user.id};

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
        console.log(form)
        var self = this;
        form.submitted = true;
        if (form.$valid) {
            if (this.issueCategories == 0) {
                this.missingCategory = true;
                return;
            }
            this.issue.categories = _.pluck(this.issueCategories, 'text');
            this.tipService
                .info('Posting issue...')
                .delay(function () {
                    self.ideaService.createIssue(self.issue, function (resp) {
                        if (resp.status === 'success') {
                            self.tipService
                                .info('Your issue has been posted.')
                                .show();
                            self.issue = {};
                            self.issueCategories = [];
                            form.submitted = false;
                        } else {
                            self.tipService
                                .error('Your issue could not be posted.')
                                .show();
                        }
                    })
                })
                .show();
        }

    };
    ShareCtrl.$inject = ['user', 'ideaService', 'tipService'];
    return ShareCtrl;
});