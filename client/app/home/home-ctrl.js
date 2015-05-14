/**
 * Created by davidadamojr on 4/15/15.
 */
define(function () {

    var HomeCtrl = function (user, issues, categories, loader) {
        this.user = user;
        this.issues = issues;
        this.categories = categories;
        this.loader = loader;

    };

    HomeCtrl.prototype.loadMore = function () {
        this.loader.loadMore(this.issues);
    };

    HomeCtrl.$inject = ['user', 'issues', 'categories', 'loader'];
    return HomeCtrl;
});