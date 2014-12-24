define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  var Season = Backbone.Model.extend({
    urlRoot: '/api/season',
    defaults: {
      date_started: null,
      date_ended: null,
      name: null,
      note:null
    },
    initialize: function(){
    },
    validate: function(attrs, options) {
      var errors = {};
      if($.trim(attrs.date_ended).length === 0 && $.trim(attrs.name).length === 0){
       console.log('attr',attrs);
        errors.message = 'name or date ended should be filled';
      }
      return (!_.isEmpty(errors))?errors:'';
    }
  });

  return Season;
});