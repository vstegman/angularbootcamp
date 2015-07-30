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
.controller('MergingController', function(traitService, traitCache){
  var self = this;

  self.ids = [{value:1, selected:true},{value:2, selected: true},{value:3, selected: false},
    {value:4, selected: false},{value:5, selected: false},{value: 6, selected: false}];
  self.traits = traitService.traits;
  self.results = [];
  self.selectedTraits = [];

  self.go = function(){
    self.results = [];
    selectedIds = self.ids.filter(function(i){ return i.selected == true; }).map(function(i){return i.value;});
    angular.forEach(selectedIds, function(id){self.addId(id)});
  };
  self.clear = function(){
    angular.forEach(self.ids, function(id){ id.selected = false; });
    angular.forEach(self.traits, function(t){ t.selected = false; });
    self.results = [];
    traitCache.clear();
  };
  self.addId = function(id){
    if(id != undefined) {
      self.selectedTraits = traitService.selectedTraits(self.traits);
      var display = {id: id};
      self.results.push(display);
      traitService.getTraits(self.selectedTraits, id, display);
    }
  }

})
.service("traitService", function(api, traitCache, traitConfig){
  return {
    traits: traitConfig.traits,

    selectedTraits: function(list){
        return list.filter(function(t){ return t.selected == true });
    },
    getTraits: function(selectedTraits, id, container){
      cached = this.checkCache(selectedTraits, id);
      _.assign(container, cached);
      test = _.keys(_.pick(container, function(v){ return v == null; }));
      var hitList = traitConfig.resourceList(test);
      angular.forEach(hitList, function(res){
        api.get(res,id).then(function(response){
            _.assign(container, response);
        });
      });
      traitCache.add(container);
    },
    checkCache: function(selectedTraits,id) {
      var c = traitCache.get(id);
      if(!c){ c = {} };
      var req = this.nullObject(selectedTraits.map(function(t){return t.data;}));
      return _.assign(req, c);
    },
    nullObject: function(properties){
      obj = {}
      angular.forEach(properties, function(p){ obj[p] = null; });
      return obj;
    }

  }
})
.service("traitCache", function(){

  this.add = function(item){
    this.cache[item.id] = item;
  };
  this.cache = [];
  this.get = function(id){
    return this.cache[id];
  }
  this.clear = function(){
    this.cache = [];
  }
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
    findResourceFor: function(trait){
      return _.findKey(this.resources, function(res){
        return res.indexOf(trait) > -1;
      });
    },
    resourceList: function(traits) {
      self = this;
      uniq = [];
      angular.forEach(traits, function(t){
        if(t.hasOwnProperty('resource')) {
          uniq.push(t.resource);
        } else {
          uniq.push(self.findResourceFor(t));
        }
      });
      return _.uniq(uniq);
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

