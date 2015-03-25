angular.module('demoApp',[])
  .controller("MainController", function(){
    console.log('MainCtrl created');
    this.name =  "Smith";
  })
  .controller("SecondController",function(){
    this.name = "John";
  });
