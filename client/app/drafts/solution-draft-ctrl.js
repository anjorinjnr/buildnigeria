/**
 * Created by davidadamojr on 4/28/15.
 */
define(function () {

    var SolutionDraftCtrl = function (user) {
       this.user = user;
    };

    SolutionDraftCtrl.$inject = ['user'];
    return SolutionDraftCtrl;
});