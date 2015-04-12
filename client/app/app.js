define(['angular', './state-config', 'main/main-ctrl', 'uiRouter', 'angularResource'],
    function (angular, StateConfig, MainCtrl) {

        var app = angular.module(
            'buildnigeria.web',
            [
                'ui.router',
                'ngResource'
            ]);
        app.config(StateConfig)
            .controller('MainCtrl', MainCtrl);
        return app;
    });