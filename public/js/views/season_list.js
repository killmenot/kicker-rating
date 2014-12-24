define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/season_list.html'
  ], function($, _, Backbone, TEMPLATE_season_list){
  var SeasonList = Backbone.View.extend({
    container: $('#content-container'),
    template: _.template(TEMPLATE_season_list),
    events: {
    },
    render: function() {
      var self = this;
      var listItemsForTemplate = _.map(this.collection.models,function(i,n){
        return {
          date_started: i.attributes.date_started.replace(/(\d{4})-(\d{2})-(\d{2}).+/,"$1-$2-$3"),
          date_ended: (i.attributes.date_ended)? i.attributes.date_ended.replace(/(\d{4})-(\d{2})-(\d{2}).+/,"$1-$2-$3") : null,
          name: i.attributes.name
        };
      });

      this.setElement(self.template({seasons:listItemsForTemplate}));
      this.container.append(this.$el);
    },
    initialize: function(){
    }
  });
  return SeasonList;
});