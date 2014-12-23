// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'js/views/season_create.js',
  'js/views/season_list.js',
], function($, _, Backbone,SeasonCreate,Season_List){
  window.BASE_URL = 'http://'+window.location.host;
  Backbone.View.prototype.leave = function(){
    this.off();
    this.$el.remove();
    this.remove();
    this.unbind();
    if(this.onLeave){
      this.onLeave();
    }
  };

  window.App = {};



  var AppRouter = Backbone.Router.extend({
    routes: {
      'create_season':'createSeason',
      'list_seasons':'listSeasons',
      '*actions': 'defaultAction'
    },
    initialize: function(){

    },
    defaultAction: function(){
      this.listSeasons();
    },
    listSeasons: function(){
      var self=this;
      var SeasonList = new Season_List();
      self.swap(SeasonList);
      SeasonList.render();
    },
    createSeason: function(){
      var self=this;
      var seasonCreate = new SeasonCreate();
      self.swap(seasonCreate);
      seasonCreate.render();
    },
    swap: function(view){
      if (this.currentView){
        this.currentView.leave();
      }
      this.currentView = view;
    }
  });

  var initialize = function(){
    window.App.Vent = _.clone(Backbone.Events);
    var app_router = new AppRouter();
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});