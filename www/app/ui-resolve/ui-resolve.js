angular.module('resolver',['ui.router'])
.config(function($stateProvider){
  $stateProvider.state('resolver',{
    url: '/resolver',
    controller: "ResolverController",
    controllerAs: "rc",
    templateUrl: 'app/ui-resolve/ui-resolve.html',
      resolve: {
        myNames: function(resolverNameFactory, $timeout){
                    return $timeout(function() {
                      return resolverNameFactory.getData().then(function(response){
                        return response.data;
                      })
                    }, 2000);
                  }
        }
  });
})
.factory('resolverNameFactory', function($http){
  return {
    getData: function() {
      return $http.get('app/names.json')
      }
    }
})
.controller("ResolverController", function(myNames, resolverNameFactory){
  var vm = this;
  vm.names = myNames;
//  resolverNameFactory.getData().then(function(response){
//    vm.names = response.data;
//  });
});
