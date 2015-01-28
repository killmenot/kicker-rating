requirejs.config({
    baseUrl: '/javascripts',
    shim: {
        'jquery': {
            exports: 'jQuery'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'bootstrap-datepicker': {
            deps: ['bootstrap']
        },
        'bootbox': {
            deps: ['bootstrap']
        }
    },
    paths: {
        'jquery': '/assets/components/jquery/dist/jquery.min',
        'bootstrap': '/assets/components/bootstrap/dist/js/bootstrap.min',
        'bootstrap-datepicker': '/assets/components/bootstrap-datepicker/js/bootstrap-datepicker',
        'bootbox': '/assets/components/bootbox/bootbox'
    }
});
