define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/tournament_create.html',
  'models/tournament',
  'datepicker'
], function($, _, Backbone, TEMPLATE_tournament_create,Tournament){
  var TournamentCreate = Backbone.View.extend({
    container: $('#content-container'),
    template: _.template(TEMPLATE_tournament_create),
    events: {
    },
    render: function() {
      this.setElement(this.template({template_name:'Create tournament'}));
      this.container.append(this.$el);
      $('.input-daterange').datepicker({
          format: "yyyy-mm-dd",
          clearBtn: true,
          orientation: "auto auto",
          autoclose: true,
          todayHighlight: true
      });
      this.$el.find('#save_new_tournament').on('click',$.proxy(this.submit,this));
    },
    initialize: function(){
      this.model = new Tournament();
    },
    submit:function(){

      this.model.set({
          date: this.$el.find('input[name=date]').val(),
          name: this.$el.find('input[name=name]').val(),
          note:this.$el.find('textarea[name=note]').val()
      })
      if (this.model.isValid()) {
        var self = this;
        this.model.save().then(function(data){
            if (data && data.message) {
                self.renderHandleError(data.message);
            } else {
              console.log('data',data);
              window.location.hash = "list_seasons";
            }
        },function(e){
          if (/\{/.test(e.responseText)) {
            var error = JSON.parse(e.responseText);
            if (error && error.error) {
              self.showError(error.error);
            }
          }
        });
      } else {
          if (this.model.validationError.message){
            this.showError(this.model.validationError.message);
          }
      }
    },
    showError: function(error) {
      this.$el.find('.errors')
                  .text(error)
                  .show();
    }
  });
  return TournamentCreate;
});