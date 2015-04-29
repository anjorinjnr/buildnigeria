/**
 * Created by eanjorin on 9/23/14.
 */
define([], function () {

    var TipService = function ($interval, $sce) {
        this.sce_ = $sce;
        this.styles = {
            INFO: 'tip-info',
            ERROR: 'tip-error',
            HEADSUP: 'tip-headsup'
        };
        this.interval_ = $interval;
        this.tip = {
            message: '',
            visible: false,
            style: this.styles.INFO,
            delay: 5000
        };

    };
    TipService.prototype.headsUp = function (message) {
        this.tip.message = this.sce_.trustAsHtml(message);
        this.tip.preventHide = false;
        this.tip.style = this.styles.HEADSUP;
        this.tip.delay = 5000; //reset the delay
        return this;
    };
    TipService.prototype.info = function (message) {
        this.tip.message = this.sce_.trustAsHtml(message);
        this.tip.preventHide = false;
        this.tip.style = this.styles.INFO;
        this.tip.delay = 5000; //reset the delay
        return this;
    };
    TipService.prototype.loading = function () {
        this.tip.message = this.sce_.trustAsHtml('Loading..');
        this.tip.preventHide = false;
        this.tip.style = this.styles.INFO;
        this.tip.delay = 5000; //reset the delay
        return this;
    };
    TipService.prototype.ajaxError = function () {
        this.tip.message = this.sce_.trustAsHtml(['An error has occurred, please try again or ',
            '<a href=\'\'>reload<a/> your browser'].join(''));
        this.tip.style = this.styles.ERROR;
        this.tip.preventHide = false;
        this.delay = 60000;
        this.show();
    };
    TipService.prototype.error = function (message) {
        this.tip.message = this.sce_.trustAsHtml(message);
        this.tip.style = this.styles.ERROR;
        this.tip.delay = 60000;
        this.tip.preventHide = false;
        return this;
    };

    TipService.prototype.delay = function (delay) {
        this.tip.delay = delay;
        return this;
    };

    TipService.prototype.preventHide = function () {
        this.tip.preventHide = true;
        return this;
    };
    TipService.prototype.hide = function () {
        if (this.tip.preventHide) {
            return;
        }
        this.tip.visible = false;
        this.tip.delay = 5000; //reset the delay
        return this;
    };

    TipService.prototype.user = function () {
        this.tip.preventHide = true;
        this.tip.delay = 999999999; //reset the delay
        return this;
    };

    var stop;
    TipService.prototype.execute = function (fn) {
        fn(this);
    };
    TipService.prototype.show = function () {

        if (angular.isString(this.tip.message.toString())) {
            console.log('show tip');
            var self = this;
            this.tip.visible = true;


        }

    };
    TipService.$inject = ['$interval', '$sce'];
    return TipService;


});
