angular.module('demoApp',['Red'])
  .controller("MainController", function(){
    var vm = this;
    vm.scream = function scream(){
      return vm.name.toUpperCase();
    }
    vm.name =  "Smith";
  })
  .controller("SecondController",function(){
    var vm = this;
    vm.name = "John";
  });
