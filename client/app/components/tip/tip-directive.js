/**
 * Created by eanjorin on 9/23/14.
 */

define([], function () {

    var TipBar = function ($parse, tipService) {
        return {
            restrict: 'AE',
            templateUrl: 'components/tip/tip.html',
            scope: {},
            link: function (scope, elem, attrs) {
                //var alertMessageAttr = attrs['alertmessage'];
                scope.tip = tipService.tip;
                var pos = elem.position();
                $(window).scroll(function () {
                    var window_pos = $(window).scrollTop();
                    if (window_pos >= pos.top) {
                        elem.addClass("tip-stick");
                    } else {
                        elem.removeClass("tip-stick");
                    }

                });
            }
        };
    };
    TipBar.$inject = ['$parse', 'tipService'];
    return TipBar;

});
