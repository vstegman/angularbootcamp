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
      self.addWidget(w);
      return w;
  };
  self.addWidget = function(widget){
      self.widgets.push(widget);
  };
})
.controller('firstCtrl', function(widgetService){
  var self = this;
  self.mycount = 1;
  self.newWidget = {name:'anonymous', value:1};
  self.widget = widgetService
  self.addWidget = function(){
    widgetService.createWidget(self.newWidget.name, self.newWidget.value);
    self.newWidget = {name:'anonymous', value:1};
    self.mycount++;
  }
  widgetService.createWidget('first is first', 12);
})
.controller('secondCtrl', function(widgetService){
  var self = this;
  self.mycount = 1;
  self.newWidget = {name:'unnamed', value:2};
  self.widget = widgetService
  self.addWidget = function(){
    widgetService.createWidget(self.newWidget.name, self.newWidget.value);
    self.newWidget = {name:'unnamed', value:1};
    self.mycount++;
  }
  widgetService.createWidget('second is first', 24);
})

