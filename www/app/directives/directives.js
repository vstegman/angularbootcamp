angular.module('directives',['ui.router'])
.config(function($stateProvider){
  $stateProvider.state('directive',{
    url: '/directives',
    controller: "DirectiveController",
    controllerAs: "dc",
    templateUrl: 'app/directives/directives.html'
  });
})
.controller('DirectiveController', function(){
  var vm = this;
  vm.address = {street: '123 Des Peres Road',
                city: 'St. Louis',
                state: 'MO'
              }
})
.directive('vsDir', function(){
    return {
      restrict: 'EA',
      templateUrl: 'app/directives/vs.html',
      scope: {
        addressObj: "="
      }
    }
});
