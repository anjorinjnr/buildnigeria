/**
 * Created by davidadamojr on 4/15/15.
 */
define(function () {

    var DraftsCtrl = function (user, drafts) {
       this.user = user;
        console.log(drafts);
    };

    DraftsCtrl.$inject = ['user', 'drafts'];
    return DraftsCtrl;
});