/**
 * Created by davidadamojr on 4/15/15.
 */
define(function () {

    var HomeCtrl = function (user, issues, categories) {
        this.user = user;
        this.issues = issues;
        this.categories =  categories;
    };

    HomeCtrl.$inject = ['user', 'issues', 'categories'];
    return HomeCtrl;
});