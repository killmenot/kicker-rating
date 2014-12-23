define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/season_list.html',
], function($, _, Backbone, TEMPLATE_season_list){
  var SeasonList = Backbone.View.extend({
    container: $('#content-container'),
    template: _.template(TEMPLATE_season_list),
    events: {
    },
    render: function() {
      this.setElement(this.template());
      this.container.append(this.$el);
    },
    initialize: function(){
    }
  });
  return SeasonList;
});