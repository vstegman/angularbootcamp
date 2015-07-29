angular.module('demoApp',['ui.router',
               'nameDisplay',
               'colorDisplay',
               'watchThis',
              'promises',
              'resolver',
              'directives',
              'nested',
              'sharing',
              'merging'
])
.config(function($urlRouterProvider){
  $urlRouterProvider
  .otherwise("/name");
});
//.config(function($routeProvider){
//  $routeProvider.when("/404",{
//    templateUrl: "/app/not-found.html",
//    controller: "RedController",
//    controllerAs: 'red'
//  }).
//    otherwise({
//    redirectTo: "/404"
//  });
//});
//
