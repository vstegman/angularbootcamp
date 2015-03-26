angular.module('demoApp',['Red','nameDisplay'])
.config(function($routeProvider){
  $routeProvider.when("/404",{
    templateUrl: "/app/not-found.html",
    controller: "RedController",
    controllerAs: 'red'
  }).
    otherwise({
    redirectTo: "/404"
  });
});

