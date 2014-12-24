define([
  'jquery',
  'underscore',
  'backbone',
  'models/season'
], function($, _, Backbone,Season){
  var SeasonCollection = Backbone.Collection.extend({
    model: Season,
    url: '/api/season',
    initialize: function(){
    },
    comparator: function(param){
    }
  });
  return SeasonCollection;
});