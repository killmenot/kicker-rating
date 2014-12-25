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
      note:null,
      activated:null
    },
    initialize: function(){
    },
    validate: function(attrs, options) {
      var errors = {};
      if($.trim(attrs.date_ended).length === 0 && $.trim(attrs.name).length === 0){
        errors.message = 'name or date ended should be filled';
      }
      return (!_.isEmpty(errors))?errors:'';
    },
    statusDeactivate: function(data) {
      if (!this.get('date_ended')) {
        var newdate;
        var startedDate = new Date(this.get('date_started'));
        var currentDate = new Date(data);
        currentDate.setDate(currentDate.getDate()-1);
        if (currentDate>startedDate) {
          var month = currentDate.getMonth() + 1;
          var day = currentDate.getDate();
          var year = currentDate.getFullYear();
          newdate = year + "-" + month + "-" + day;
        } else {
          newdate = this.get('date_started');
        }
        console.log('newDate',newdate);
        this.set({date_ended:newdate});
      }
    }
  });

  return Season;
});