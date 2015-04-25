requirejs.config({
    paths: {
        angular: 'bower_components/angular/angular',
        angularResource: 'bower_components/angular-resource/angular-resource.min',
        angularCookies: 'bower_components/angular-cookies/angular-cookies.min',
        angularNotify: 'bower_components/angular-notify/dist/angular-notify.min',
        angularAria: 'bower_components/angular-aria/angular-aria.min',
        angularAnimate: 'bower_components/angular-animate/angular-animate',
        angularMaterial: 'bower_components/angular-material/angular-material.min',
        uiRouter: 'bower_components/angular-ui-router/release/angular-ui-router.min',
        lodash: 'bower_components/lodash/lodash.min',
        jquery: 'bower_components/jquery/dist/jquery.min'
    },
    shim: {
        angular: {exports: 'angular'},
        angularResource: {deps: ['angular']},
        angularNotify: {deps: ['angular']},
        angularCookies: {deps: ['angular']},
        angularMaterial: {deps: ['angularAria', 'angularAnimate']},
        angularAria: {deps: ['angular']},
        angularAnimate: {deps: ['angular']},
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

