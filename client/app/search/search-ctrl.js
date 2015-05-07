/**
 * Created by davidadamojr on 4/23/15.
 */
define(function () {

    var SearchCtrl = function (issues,$stateParams) {

        this.issues = issues;
        this.term = $stateParams.term;
    };
    SearchCtrl.$inject = ['issues', '$stateParams'];

    return SearchCtrl;
});