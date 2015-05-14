/**
 * Created by davidadamojr on 4/23/15.
 */
define(function () {

    var SearchCtrl = function (issues,$stateParams, loader) {

        this.issues = issues;
        this.term = $stateParams.term;
        this.loader = loader;

    };

    SearchCtrl.prototype.loadMore = function () {
        this.loader.loadMore(this.issues);
    };

    SearchCtrl.$inject = ['issues', '$stateParams', 'loader'];

    return SearchCtrl;
});