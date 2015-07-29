angular.module('promises',['ui.router'])
.config(function($stateProvider){
  $stateProvider.state('promises',{
    url: '/promises',
    templateUrl: 'app/promises/promises.html',
    controller: "PromiseController",
    controllerAs: "pc"
  });
})
.factory('promiseFactory', function($http){
  return {
    getData: function() {
      return $http.get('app/data.json').then(function(response){
        return response.data;
      }).then(function(data){ return data.number; });
    }
  }
})
.factory('slowFactory', function($http){
  return {
    getData: function() {
      return $http.get('app/data.json').then(function(response){
        //console.log(response.data);
        return response.data;
      }).then(function(data){ return data.number + 3; });
    }
  }
})
.controller("PromiseController", function(promiseFactory, slowFactory, $q){
  //setting up some promises
  var vm = this;
  var p1 = promiseFactory.getData();
  var p2 = slowFactory.getData();
  var p4 = p1.then(function(number){
    return number*10;
  });
  var p5 = p2.then(function(number){
    return number / 3;
  });
  var p6 = $q.when(3+7);
  //playing with a deferred promise
  var d = $q.defer();
  vm.resolve = function(){
    d.resolve(1)
  };
  vm.reject = function(){
    d.reject("NAN Error");
  };
  p8 = d.promise;


  //handling promises
  p2.then(function(number){
    vm.delayed = number;
  });
  p1.then(function(number){
    vm.number = number;
  });
  //p8.then(function(number){
  //   console.log('p8: '+ number);
  //});
  //handling some errors on promises
  p9 = p8.catch(function(err){
    console.log(err);
    return 0;
  }).then( function(number){
    return number;
  });

  // an ALL promise
  var p3 = $q.all([p1,p2,p4,p5,p6, p9]);

  p3.then(function(number){
    console.log('p3: ' + number);
    vm.sum = number.reduce(function(previousValue, currentValue, index, array) {
      return previousValue + currentValue;
    });
  });
});
