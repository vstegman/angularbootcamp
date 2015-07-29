angular.module('sharing',['ui.router'])
.config(function($stateProvider){
  $stateProvider.state('sharing',{
    url: '/sharing',
    templateUrl: 'app/sharing/sharing.html'
  });
})
.service('widgetOldService', function(){
  // these two providers achieve the same result for the controllers, just a matter of syntax
  var self = this;
  self.widgets = [];
  self.value = function() {return self.widgets.length};
  self.createWidget = function(name, start){
      value = start || 0;
      w = {name: name, value: value};
      return w;
  };
  self.addWidget = function(widget){
      self.widgets.push(widget);
  };
})
.factory('widgetService', function(){
  // these two providers achieve the same result for the controllers, just a matter of syntax
  return {
    widgets: [],
    value: function() { return this.widgets.length },
    createWidget: function(name, start){
      value = start || 0;
      return {name: name, value: value};
    },
    addWidget: function(widget){
      this.widgets.push(widget);
    }
  }
})
.controller('nameCtrl', function(widgetService){
  //these two controllers are very similar, but each set up to only alter 1 property of 'widgets'
  var self = this;
  self.widgets = widgetService.widgets
  self.addWidget = function(){
    widgetService.addWidget(widgetService.createWidget('new widget'));
  }
})
.controller('valueCtrl', function(widgetService){
  var self = this;
  self.widgets = widgetService.widgets
  self.addWidget = function(){
    widgetService.addWidget(widgetService.createWidget('anonymous',10));
  }
})

