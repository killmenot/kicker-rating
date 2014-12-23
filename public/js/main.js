// Filename: main.js

require.config({
  paths: {
    jquery: '../assets/components/jquery/dist/jquery.min',
    underscore: '../assets/components/underscore/underscore-min',
    backbone: '../assets/components/backbone/backbone',
    bootstrap: '../assets/components/bootstrap/dist/js/bootstrap.min',
    text: '../assets/components/requirejs-text/text',
    datepicker:'../assets/components/bootstrap-datepicker/js/bootstrap-datepicker'
  },
  shim: {
    backbone: {
        deps: ["underscore", "jquery"],
        exports: "Backbone"
    },
    underscore: {
        deps: ["jquery"],
        exports: "_"
    },
    bootstrap: {
      deps: ['jquery'],
      exports: "bootstrap"
    }
  }

});

require([
  'app'
], function(App){
  App.initialize();
});