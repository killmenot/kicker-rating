define([
  'jquery',
  'underscore',
  'backbone',
  // 'backbone_validate'
], function($, _, Backbone){
  var Season = Backbone.Model.extend({
    urlRoot: '/api/season',
    defaults: {
      start: null,
      end: null,
      name: null,
      note:null
    },
    initialize: function(){
    },
    validate: function(attrs, options) {
      var errors = {};
      if($.trim(attrs.end).length==0 && $.trim(attrs.name).length==0){
       console.log('attr',attrs);
        errors.message = 'name or date ended should be filled';
      }
      return (!_.isEmpty(errors))?errors:'';
    }
  });

  return Season;
});