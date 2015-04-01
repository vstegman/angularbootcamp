angular.module('nested',['ui.router'])
.config(function($stateProvider){
  $stateProvider.state('nested', {
    url: '/nested',
    //controller: 'nestedController',
    //controllerAs: 'nc',
    templateUrl: 'app/nested/nested.html'
  });
})
.controller('nestedController', function(){
  var self = this;

  self.children = [];

  self.select = function(selectedChild) {
    angular.forEach(self.children, function(c){
      c.selected = false;
    });
    selectedChild.selected = true;
  };

  self.addChild = function(child){
    if(self.children.length ===0){
      self.select(child);
    }
    self.children.push(child);
  };

  self.counter = 0;
  self.countUp = function(){
    self.counter++;
  }
})
.directive('vsParent', function(){
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'app/nested/parent.html',
    controller: 'nestedController',
    controllerAs: 'nc'
  }
})
.directive('vsChild', function(){
  return {
      restrict: 'E',
      require: '^vsParent',
      templateUrl: 'app/nested/child.html',
      transclude: true,
      scope: {
        title: '@'
      },
      link: function(scope, element, attrs, prtCtrl){
        prtCtrl.addChild(scope);
        scope.countUp = function(){
          prtCtrl.countUp();
        };
      }
    }
});

