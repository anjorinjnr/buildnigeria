/**
 * Created by davidadamojr on 4/30/15.
 */
define(function () {

    var IssueCtrl = function (issue) {
        this.issue = issue;
        console.log(issue);
    };

    IssueCtrl.$inject = ['issue'];
    return IssueCtrl;
});