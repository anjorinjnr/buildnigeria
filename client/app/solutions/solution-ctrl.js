/**
 * Created by davidadamojr on 4/15/15.
 */
define(function () {

    var SolutionCtrl = function (solution) {
       this.solution = solution;
       console.log(this.solution);
    };

    SolutionCtrl.$inject = ['solution'];
    return SolutionCtrl;
});