angular.module('colorDisplay',['ui.router'])
.config(function($stateProvider){
  $stateProvider
  .state("color", {
    url: "/color",
    templateUrl: 'app/color-display/color-display.html',
    controller: "ColorController",
    controllerAs: "clr"
  })
  .state("color.details",{
    url: '/details',
    templateUrl: 'app/color-display/color-details.html',
  });
})
.controller("ColorController", function(){
  var vm = this;
  vm.options = ["Red", "Blue", "Green"];
  vm.selected = vm.options[0]; //"Red";
})
