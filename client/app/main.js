requirejs.config({
    paths: {
        angular: 'bower_components/angular/angular',
        angularResource: 'bower_components/angular-resource/angular-resource.min',
        angularCookies: 'bower_components/angular-cookies/angular-cookies.min',
        angularNotify: 'bower_components/angular-notify/dist/angular-notify.min',
        angularSanitize: 'bower_components/angular-sanitize/angular-sanitize.min',
        angularAria: 'bower_components/angular-aria/angular-aria.min',
        angularAnimate: 'bower_components/angular-animate/angular-animate',
        angularMaterial: 'bower_components/angular-material/angular-material.min',
        uiRouter: 'bower_components/angular-ui-router/release/angular-ui-router.min',
        lodash: 'bower_components/lodash/lodash.min',
        jquery: 'bower_components/jquery/dist/jquery.min',
        ngTags: 'bower_components/ng-tags-input/ng-tags-input',
        ngSummernote: 'bower_components/angular-summernote/dist/angular-summernote.min',
        summernote: 'bower_components/summernote/dist/summernote',
        twBootstrap: 'bower_components/bootstrap/dist/js/bootstrap.min',
        ngToast: 'bower_components/ngtoast/dist/ngToast.min',
        moment: 'bower_components/momentjs/min/moment.min',
        hashids: 'bower_components/hashids/lib/hashids.min'
    },
    shim: {
        ngToast: {deps: ['angular', 'angularSanitize']},
        ngSummernote: {deps: ['summernote', 'angular']},
        twBootstrap: {deps: ['jquery']},
        angular: {exports: 'angular', deps: ['twBootstrap']},
        angularResource: {deps: ['angular']},
        angularNotify: {deps: ['angular']},
        angularSanitize: {deps: ['angular']},
        angularCookies: {deps: ['angular']},
        angularMaterial: {deps: ['angularAria', 'angularAnimate']},
        angularAria: {deps: ['angular']},
        angularAnimate: {deps: ['angular']},
        uiRouter: {deps: ['angular']},
        ngTags: {deps: ['angular']},
        lodash: {exports: '_'}
    },
    priority: [
        'angular'
    ],
    deps: [
        'bootstrap'
    ]
});

