/**
 * Created by davidadamojr on 4/23/15.
 */
define(['issues/issue-loader'], function (loader) {

    var SearchCtrl = function (issues,$stateParams, $http) {

        this.issues = issues;
        this.term = $stateParams.term;
        this.$http = $http;
        this.loading = false;
    };

    SearchCtrl.prototype.loadMore = function () {
        loader(this);
    };
    SearchCtrl.$inject = ['issues', '$stateParams', '$http'];

    return SearchCtrl;
});