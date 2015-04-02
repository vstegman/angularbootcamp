angular.module('sharing',['ui.router'])
.config(function($stateProvider){
  $stateProvider.state('sharing',{
    url: '/sharing',
    templateUrl: 'app/sharing/sharing.html'
  });
})
.service('widgetService', function(){
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
.controller('nameCtrl', function(widgetService){
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

