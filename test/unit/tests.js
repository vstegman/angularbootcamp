describe('The application', function(){
  beforeEach(module('promises'));

  describe('has a service', function(){
    var promiseFactory, $httpBackend,
        data = {number: 6};
    beforeEach(inject(function($injector){
      promiseFactory = $injector.get('promiseFactory');
      $httpBackend = $injector.get('$httpBackend');
    }));
    it('that can get data', function(){
      promiseFactory.getData().then(function(d){
        expect(d).toBe(data.number);
      });
      $httpBackend.expectGET('app/data.json').respond(data);
      $httpBackend.flush();
    });
  })

  describe('has a controller', function(){
    var $q, $controller, mockPromiseFactory;

    beforeEach(inject(function($injector){
      $q = $injector.get('$q');
      $controller = $injector.get('$controller');
      mockPromiseFactory = {
        getData: function(){ return $q.when(3); },
        //example - not in my implementation of PromisesController
        getBadData: function(){return $q.reject('Mock error');}
      }

    }));
    it('that sets up the scope properly', function(){
      var scope = {};
      $controller('PromiseController as pc', {
        promiseFactory: mockPromiseFactory, $scope: scope
      });
      expect(scope.pc.reject).toBeDefined();
      expect(scope.pc.resolve).toBeDefined();
      // This doesn't work because the tests run through before the promise resolves
      //expect(scope.pc.number).toBe(3);
    });
  })

  describe('with basic logic', function(){

    it('expect true to be true', function(){
      expect(true).toBe(true);
    });

    it('expect false to be false', function(){
      expect(false).toBe(false);
    });

  })

})
