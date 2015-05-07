/**
 * Created by davidadamojr on 4/15/15.
 */
define(['issues/issue-loader'], function (loader) {

    var HomeCtrl = function (user, issues, categories, $http) {
        this.user = user;
        this.issues = issues;
        this.categories = categories;
        this.$http = $http;
        this.loading = false;

    };

    HomeCtrl.prototype.loadMore = function () {
        loader(this);
    };

    HomeCtrl.$inject = ['user', 'issues', 'categories', '$http'];
    return HomeCtrl;
});