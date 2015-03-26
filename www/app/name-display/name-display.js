angular.module('nameDisplay', ['ui.router'])
.config(function($stateProvider){
  $stateProvider
    .state("name",{
      url: "/name",
      templateUrl: 'app/name-display/name-display.html',
      controller: "MainController",
      controllerAs: 'mc'
    })
    .state('name.details',{
      url: "/details",
      template: "this is the name details child"
    });
})
.controller("MainController", function(){
    var vm = this;
    vm.name = "Smith";
 //   vm.scream = function scream(){
 //     return vm.name.toUpperCase();
 //   }
})
.controller("SecondController",function(){
    var vm = this;
    vm.name = "John";
});
