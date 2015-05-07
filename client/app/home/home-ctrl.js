/**
 * Created by davidadamojr on 4/15/15.
 */
define(function () {

    var HomeCtrl = function (user, issues, categories, $http) {
        this.user = user;
        this.issues = issues;
        this.categories = categories;
        this.$http = $http;
        this.loading = false;

    };

    HomeCtrl.prototype.loadMore = function () {
        var self = this;
        if (!this.loading && this.issues.next_page_url !== null) {
            this.loading = true;
            this.$http.get(this.issues.next_page_url).success(function (issues) {
                self.loading = false;
                self.issues.next_page_url = issues.next_page_url;
                self.issues.data = self.issues.data.concat(issues.data);
            });
        }
    };

    HomeCtrl.$inject = ['user', 'issues', 'categories', '$http'];
    return HomeCtrl;
});