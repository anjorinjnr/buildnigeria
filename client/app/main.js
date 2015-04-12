requirejs.config({
    paths: {
        angular: 'bower_components/angular/angular.min',
        angularResource: 'bower_components/angular-resource/angular-resource.min',
        uiRouter: 'bower_components/angular-ui-router/release/angular-ui-router.min',
        lodash: 'bower_components/requirejs/require',
        jquery: 'bower_components/jquery/dist/jquery.min'
    },
    shim: {
        angular: {exports: 'angular'},
        angularResource: {deps: ['angular']},
        uiRouter: {deps: ['angular']},
        lodash: {exports: '_'}
    },
    priority: [
        'angular'
    ],
    deps: [
        'bootstrap'
    ]
});

