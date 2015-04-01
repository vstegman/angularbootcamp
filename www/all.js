angular.module("demoApp",["ui.router","nameDisplay","colorDisplay","watchThis","promises","resolver","directives","nested"]).config(["$urlRouterProvider",function(e){e.otherwise("/name")}]),angular.module("colorDisplay",["ui.router"]).config(["$stateProvider",function(e){e.state("color",{url:"/color",templateUrl:"app/color-display/color-display.html",controller:"ColorController",controllerAs:"clr"}).state("color.details",{url:"/details",templateUrl:"app/color-display/color-details.html"})}]).controller("ColorController",function(){var e=this;e.options=["Red","Blue","Green"],e.selected=e.options[0]}),angular.module("directives",["ui.router"]).config(["$stateProvider",function(e){e.state("directive",{url:"/directives",controller:"DirectiveController",controllerAs:"dc",templateUrl:"app/directives/directives.html"})}]).controller("DirectiveController",function(){var e=this;e.address={street:"123 Des Peres Road",city:"St. Louis",state:"MO"}}).directive("vsDir",function(){return{restrict:"EA",templateUrl:"app/directives/vs.html",scope:{addressObj:"="}}}).directive("vsPanel",function(){return{templateUrl:"app/directives/panel.html",transclude:!0}}),angular.module("nameDisplay",["ui.router"]).config(["$stateProvider",function(e){e.state("name",{url:"/name",templateUrl:"app/name-display/name-display.html",controller:"MainController",controllerAs:"mc"}).state("name.details",{url:"/details",template:"this is the name details child"})}]).controller("MainController",function(){var e=this;e.name="Smith"}).controller("SecondController",function(){var e=this;e.name="John"}),angular.module("nested",["ui.router"]).config(["$stateProvider",function(e){e.state("nested",{url:"/nested",templateUrl:"app/nested/nested.html"})}]).controller("nestedController",function(){var e=this;e.children=[],e.select=function(t){angular.forEach(e.children,function(e){e.selected=!1}),t.selected=!0},e.addChild=function(t){0===e.children.length&&e.select(t),e.children.push(t)},e.counter=0,e.countUp=function(){e.counter++}}).directive("vsParent",function(){return{restrict:"E",transclude:!0,templateUrl:"app/nested/parent.html",controller:"nestedController",controllerAs:"nc"}}).directive("vsChild",function(){return{restrict:"E",require:"^vsParent",templateUrl:"app/nested/child.html",transclude:!0,scope:{title:"@"},link:function(e,t,r,n){n.addChild(e),e.countUp=function(){n.countUp()}}}}),angular.module("promises",["ui.router"]).config(["$stateProvider",function(e){e.state("promises",{url:"/promises",templateUrl:"app/promises/promises.html",controller:"PromiseController",controllerAs:"pc"})}]).factory("promiseFactory",["$http",function(e){return{getData:function(){return e.get("app/data.json").then(function(e){return e.data}).then(function(e){return e.number})}}}]).factory("slowFactory",["$http",function(e){return{getData:function(){return e.get("app/data.json").then(function(e){return e.data}).then(function(e){return e.number+3})}}}]).controller("PromiseController",["promiseFactory","slowFactory","$q",function(e,t,r){var n=this,o=e.getData(),l=t.getData(),a=o.then(function(e){return 10*e}),i=l.then(function(e){return e/3}),c=r.when(10),s=r.defer();n.resolve=function(){s.resolve(1)},n.reject=function(){s.reject("NAN Error")},p8=s.promise,l.then(function(e){n.delayed=e}),o.then(function(e){n.number=e}),p9=p8["catch"](function(e){return console.log(e),0}).then(function(e){return e});var u=r.all([o,l,a,i,c,p9]);u.then(function(e){console.log("p3: "+e),n.sum=e.reduce(function(e,t){return e+t})})}]),angular.module("resolver",["ui.router"]).config(["$stateProvider",function(e){e.state("resolver",{url:"/resolver",controller:"ResolverController",controllerAs:"rc",templateUrl:"app/ui-resolve/ui-resolve.html",resolve:{myNames:["resolverNameFactory","$timeout",function(e,t){return t(function(){return e.getData().then(function(e){return e.data})},2e3)}]}})}]).factory("resolverNameFactory",["$http",function(e){return{getData:function(){return e.get("app/names.json")}}}]).controller("ResolverController",["myNames","resolverNameFactory",function(e){var t=this;t.names=e}]),angular.module("watchThis",["ui.router"]).config(["$stateProvider",function(e){e.state("watch",{url:"/watch",templateUrl:"/app/watch-this/watch-this.html",controller:"WatchController"})}]).controller("WatchController",["$scope",function(e){e.counter=0,e.$watch("counter",function(t){e.boxes=[];for(var r=0;r<parseInt(t);r++)e.boxes.push({i:r})}),e.name={first:"Vince",last:"Stegman"},e.fullName=function(){return e.name.first+" "+e.name.last},e.$watch("name.first",function(e,t){console.log("new: "+e+", old: "+t)}),e.$watch(e.fullName,function(){console.log("$watch fullName fired")}),e.$watch(e.name,function(){console.log("deep watch fired")},!0)}]);