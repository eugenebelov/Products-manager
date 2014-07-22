require.config({
  paths: {
    jquery: 'http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min',
    underscore: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min',
    backbone: 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
    marionette: 'http://cdnjs.cloudflare.com/ajax/libs/backbone.marionette/2.0.3/backbone.marionette.min',
    handlebars: 'http://cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.3.0/handlebars.min',
    templates: './templates'
  },
  shim: {
        'handlebars': {
            'exports': 'Handlebars'
        },
        'underscore': {
            'exports': '_'
        },
        'backbone': {
            'deps': ['jquery', 'underscore'],
            'exports': 'Backbone'
        }
    }
});

require([
  'application',
  'backbone'
], function(app, Backbone){
  app.start();

  Backbone.history.start();
});