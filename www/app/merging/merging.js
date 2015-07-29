angular.module('merging',['ui.router'])
.config(function($stateProvider, $provide, $httpProvider){
  $stateProvider.state('merging', {
    url: '/merging',
    templateUrl: 'app/merging/merging.html',
    controller: 'MergingController',
    controllerAs: 'vm'
  });

  $provide.factory('vsInterceptor', function($q){
    return {
//      'response': function(response){
//        console.log('response intercepted');
//        return response;
//      },
      'responseError': function(response){
        if(response.status == 302){
          console.log('redirect to login');
        } else{
          console.log('error intercepted');
          return $q.reject(response);
        }
      }
    }
  });

  $httpProvider.interceptors.push('vsInterceptor');
})
.controller('MergingController', function(traitService){
  var self = this;

  self.ids = [1,2,3,4,5,6];
  self.traits = traitService.traits;
  self.results = [];
  self.selectedTraits = [];

  self.addId = function(id){
    if(id != undefined) {
      self.selectedTraits = traitService.selectedTraits(self.traits);
      var display = {id: id};
      self.results.push(display)
      traitService.getTraits(self.selectedTraits, id, display)
    }
  }


})
.service("traitService", function(api, traitConfig){
  return {
    traits: traitConfig.traits,

    selectedTraits: function(list){
        return list.filter(function(t){ return t.selected == true });
    },

    getTraits: function(selectedTraits, id, container){
        var hitList = traitConfig.resourceList(selectedTraits);
        angular.forEach(hitList, function(res){
          api.get(res,id).then(function(response){
            angular.forEach(traitConfig.resources[res], function(pt){
              container[pt] = response[pt];
            })
          });
        });
      }
  }
})
.service("traitCache", function(){
  add = function(item){
    cache[item.id] = item
  };
  cache = [];
})
.service("traitConfig", function(){
  return {
    traits: [
              {label: "First",data:'name', resource: 'name', selected: true},
              {label: "Last",data:'last',resource: 'name',selected: false},
              {label: "Age",data:'age',resource: 'age',selected: true},
              {label: "Kids",data:'kids',resource: 'kinder',selected: true},
              {label: "Residence",data:'state',resource: 'state',selected: true},
              {label: "Married",data:'status',resource: 'status', selected: true}
            ],

    resources:  {
                  name: ['name','last'],
                  age: ['age'],
                  kinder: ['kids'],
                  state: ['state'],
                  status: ['status']
                },

    resourceList: function(traits) {
      uniq = [];
      angular.forEach(traits, function(t){ if(uniq.indexOf(t.resource) == -1){uniq.push(t.resource);} });
      return uniq;
    }
  }

})
.service("api", function($http, $timeout){
  return {
    get: function(type, id) {
      var url = "app/merging/data/" + type + ".json";
      return $http.get(url).catch(function(err){
        console.log(err);
        return err;
      }).then(function(response){
         if(response.status == 404){
           data = {};
           data[type] = 'err'
           return data;
         } else {
           return $timeout(function(){
             if(id == undefined){
              return response.data[type];
             } else {
               return response.data[type].filter( function(e){
                 return e.id == id;
               })[0];
             };
           }, Math.random()*1000);
         }
      });
    }
  }

});

