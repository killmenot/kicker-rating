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
          name: i.attributes.name,
          id: i.attributes.id
        };
      });
      this.setElement(self.template({seasons:listItemsForTemplate}));
      this.container.append(this.$el);
      this.$el.find('.delete').on('click',$.proxy(this.delete,this));
    },
    initialize: function(){
    },
    delete: function(e) {
      e.preventDefault();
      var elementId = $(e.target).data('item');
      var model = this.collection.get(elementId);
      var self = this;
      this.$el.find('#confirm').modal()
          .one('click', '#delete', function (e) {
              model.destroy({
                success: $.proxy(self.removeRecordFromList,self),
                error: $.proxy(self.errorProcess,self)
              });
      });
    },
    removeRecordFromList: function(model,response) {
      this.$el.find('.errors').hide();
      this.$el.find('[data-item='+model.id+']').parents('.season-wrapper').remove();
    },
    errorProcess: function(model,response) {
      var error = JSON.parse(response.responseText);
      if (error && error.error) {
        this.showError(error.error);
      }
    },
    showError: function(error) {
      this.$el.find('.errors')
                  .text(error)
                  .show();
    }
  });
  return SeasonList;
});