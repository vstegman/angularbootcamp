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
    template: "this is the child state! <a ui-sref='color'>close</a>"
  });
})
.controller("ColorController", function(){
  var vm = this;
  vm.selected = "Red";
  vm.options = ["Red", "Blue", "Green"];
})
