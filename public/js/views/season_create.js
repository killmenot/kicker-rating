define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/season_create.html',
  '../models/season.js',
  'datepicker'
], function($, _, Backbone, TEMPLATE_season_create,Season){
  var SeasonCreate = Backbone.View.extend({
    container: $('#content-container'),
    template: _.template(TEMPLATE_season_create),
    events: {
    },
    render: function() {
      this.setElement(this.template());
      this.container.append(this.$el);
      $('.input-daterange').datepicker({
          format: "yyyy-mm-dd",
          clearBtn: true,
          orientation: "auto auto",
          autoclose: true,
          todayHighlight: true
      });
      this.$el.find('#save_new_season').on('click',$.proxy(this.submit,this));
    },
    initialize: function(){
      this.model = new Season();
    },
    submit:function(){
      this.model.set({
          start: this.$el.find('input[name=start]').val(),
          end: this.$el.find('input[name=end]').val(),
          name: this.$el.find('input[name=name]').val(),
          note:this.$el.find('rextarea[name=note]').val()
      })
      if (this.model.isValid()) {
        var self = this;
        this.model.save().then(function(data){
            if (data && data.message) {
                self.renderHandleError(data.message);
            } else {
                window.location.hash = "list_seasons";
            }
        },function(e){
          var error = JSON.parse(e.responseText);
                if (error && error.error) {
                  self.showError(error.error);
                }
        });
      } else {
        if (this.model.validationError.message){
          this.showError(this.model.validationError.message);
        }
      }
      console.log('submit')
    },
    showError: function(error) {
      this.$el.find('.errors')
                  .text(error)
                  .show();
    }
  });
  return SeasonCreate;
});