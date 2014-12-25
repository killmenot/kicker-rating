define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  var Season = Backbone.Model.extend({
    urlRoot: '/api/tournament',
    defaults: {
      name: null,
      date: null,
      season_id: null,
      location_id:1,
      note:null
    },
    initialize: function(){
    },
    validate: function(attrs, options) {
      var errors = {};
      if($.trim(attrs.note).length === 0){
        errors.message = 'note should be filled';
      }
      return (!_.isEmpty(errors))?errors:'';
    }
  });

  return Season;
});