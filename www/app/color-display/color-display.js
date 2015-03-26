angular.module('colorDisplay',['ngRoute'])
.config(function($routeProvider){
  $routeProvider
  .when("/color", {
    templateUrl: 'app/color-display/color-display.html',
    controller: "ColorController",
    controllerAs: "clr"
  })
})
.controller("ColorController", function(){
  var vm = this;
  vm.selected = "Red";
  vm.options = ["Red", "Blue", "Green"];
})
