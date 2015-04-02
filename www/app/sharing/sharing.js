angular.module('sharing',['ui.router'])
.config(function($stateProvider){
  $stateProvider.state('sharing',{
    url: '/sharing',
    templateUrl: 'app/sharing/sharing.html'
  });
})
.service('widgetService', function(){
  this.value = 0;
})
.factory('widgetFactory', function(){
  return {
    getWidget: function(name, start){
      var value = start || 0;
      return {name: name, value: value};
    }
  }
})
.controller('firstCtrl', function(widgetService){
  var self = this;
  self.widget = widgetService
  self.addOne = function(){
    self.widget.value += 1;
  }
})
.controller('secondCtrl', function(widgetService){
  var self = this;
  self.widget = widgetService
  self.addTwo = function(){
    self.widget.value += 2;
  }
})

