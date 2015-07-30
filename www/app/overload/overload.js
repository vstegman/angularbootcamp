angular.module('overload', ['ui.router'])
.config(function($stateProvider){
  $stateProvider.state('overload', {
    url: '/overload',
    templateUrl: 'app/overload/overload.html',
    controller: 'OverloadCtrl',
    controllerAs: 'vm',
    resolve: {
      dataset: function(RandomData){
        return RandomData.generateData(1000000);
      }
    }
  });
})
.factory('RandomData', function(){
  return {
    generateData: function(n){
      self = this;
      dataset = [];
      for (i = 0; i < n; i++) {
        dataset[i] = self.generatePoint();
      }
      return dataset;
    },
    generatePoint: function(){
      return {color: self.randColor(), value: self.randValue(1000000) };
    },

    randValue: function(scale){
      return Math.round(Math.random()*scale,0);
    },

    randColor: function(){
      pick = Math.round(Math.random()*4,0);
      return this.colors[pick];
    },
    colors: ["Green", "Blue", "Yellow", "Red", "Orange"],
  }

})
.controller('OverloadCtrl', function(dataset, RandomData){
  self = this;
  this.dataset = dataset;
  this.title = "I am the Overload!";
  this.count = this.dataset.length;
  this.collection = [];
  this.setCollection = function(){
    var grouped = _.groupBy(self.dataset, 'color');
    //console.log(grouped);
    sums = [];
    keys = Object.keys(grouped);
    _.forEach(keys, function(k){
      obj = {};
      obj.name = k;
      //values = grouped[k].map(function(i){return i.value;});
      sum = _.sum(grouped[k], function(i){ return i.value; });
      //console.log(values);
      obj.sum = sum; //values.sum;
      sums.push(obj);
    });
    self.collection = sums;
  };

});
