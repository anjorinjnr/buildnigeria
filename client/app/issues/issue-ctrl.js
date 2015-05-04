/**
 * Created by davidadamojr on 4/30/15.
 */
define(function () {

    var IssueCtrl = function (user, issue) {
        this.user = user;
        this.issue = issue;
        console.log(issue);
    };

    IssueCtrl.$inject = ['user', 'issue'];
    return IssueCtrl;
});