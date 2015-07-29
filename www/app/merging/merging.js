angular.module('merging',['ui.router'])
.config(function($stateProvider){
  $stateProvider.state('merging', {
    url: '/merging',
    templateUrl: 'app/merging/merging.html',
    controller: 'MergingController',
    controllerAs: 'vm'
  });
})
.controller('MergingController', function(api){
  var self = this;

  self.ids = [1,2,3,4,5,6];
  self.traits = [
    {label: "Name",data:'name',selected: true},
    {label: "Age",data:'age',selected: true},
    {label: "Kids",data:'kids',selected: true},
    {label: "Residence",data:'state',selected: true},
    {label: "Married",data:'status', selected: true},
  ];
  self.results = [];
  self.selectedTraits = [];

  self.call = function(data, id, container){
    console.log("calling:  " + data);
    api.get(data,id).then(function(response){
      container[data] = response[data];
      //self.results.push(response);
      console.log("resolving:  " + data);
    });
  }

  self.addId = function(id){
    self.selectedTraits = self.traits.filter(function(t){ return t.selected == true });
    var display = {id: id};
    self.results.push(display)
    angular.forEach(self.selectedTraits, function(s){
      display[s.data] = null;
      self.call(s.data,id, display);
    });
  }

  //self.call('age',3);
  //self.call('status')

})
.service("api", function($http, $timeout){
  return {
    get: function(type, id) {
      var url = "app/merging/data/" + type + ".json";
      return $http.get(url).catch(function(err){
        console.log(err);
      }).then(function(response){
         return $timeout(function(){
           if(id == undefined){
            return response.data[type];
            //return response.data;
           } else {
             return response.data[type].filter( function(e){
               return e.id == id;
             })[0];
           };
        }, Math.random()*3000);
      });
      //.error(function(data, status, headers){
      //  console.log("error")
      //})
    }
  }

});
