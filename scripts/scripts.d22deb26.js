"use strict";angular.module("aroundMeApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","google-maps".ns()]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl as main"}).when("/queries/:query",{templateUrl:"views/map.html",controller:"QueryCtrl as query",resolve:{query:["$route",function(a){return a.current.params.query}]}}).otherwise({redirectTo:"/"})}]).config(["GoogleMapApiProvider".ns(),function(a){a.configure({key:"AIzaSyDqpJTYvrzDKPx3VnMuFpn3Y7MP86DfQ_k",v:"3.17",libraries:"weather,geometry,visualization,places"})}]),angular.module("aroundMeApp").factory("getLatLong",["$q",function(a){return function(){var b=a.defer();return navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(a){var c={lat:a.coords.latitude,lng:a.coords.longitude};b.resolve(c)}),b.promise}}]),angular.module("aroundMeApp").factory("getSearchQuery",function(){var a="beer";return{set:function(b){a=b},get:function(){return a}}}),angular.module("aroundMeApp").factory("getNearby",["$q","getSearchQuery",function(a,b){return function(c){var d=a.defer(),e=new google.maps.LatLng(c.lat,c.lng),f=new google.maps.Map(angular.element(".temp").get(0),{center:e,zoom:15}),g=new google.maps.places.PlacesService(f),h={location:e,radius:"500",query:b.get()};return g.textSearch(h,function(a,b){b===google.maps.places.PlacesServiceStatus.OK&&d.resolve(a)}),d.promise}}]),angular.module("aroundMeApp").controller("MainCtrl",["$scope","$location","getSearchQuery",function(a,b,c){var d=this;d.isSearchEntered=function(){return d.query?(c.set(d.query),!0):!1},d.enter=function(a){b.path("/queries/"+a)}}]),angular.module("aroundMeApp").controller("QueryCtrl",["$scope","GoogleMapApi".ns(),"getLatLong","getSearchQuery","getNearby",function(a,b,c,d,e){function f(){}function g(){}function h(b,c,d){a.sliderDetails=d,i()}var i={};b.then(function(){var b=c(),d=[],f=!1;b.then(function(b){a.map={center:{latitude:b.lat,longitude:b.lng},zoom:12},a.userPosition={latitude:b.lat,longitude:b.lng},i=function(){f=!0,angular.element("#location-info").css("width","30%"),angular.element("#map-canvas").css("width","70%")};var c=e(b);c.then(function(b){console.log(b),console.log(b[0].opening_hours);for(var c=b.length,e=0;c>e;e++){var f={latitude:b[e].geometry.location.k,longitude:b[e].geometry.location.B,id:"m"+e,options:{title:b[e].name,rating:b[e].rating,address:b[e].formatted_address,price_level:b[e].price_level}};d.push(f)}a.nearbyMarkers=d})})}),a.clickEventsObject={mouseover:f,mouseout:g,click:h},a.sliderOff=function(){angular.element("#location-info").css("width","0"),angular.element("#map-canvas").css("width","100%"),a.sliderDetails={}},a.options={scrollwheel:!1},a.markerIconPath="../images/aroundMeLogoSmall2.png"}]),angular.module("aroundMeApp").directive("aroundMe",function(){return{restrict:"EA",replace:!0,templateUrl:"../../views/aroundMe.html",link:function(){}}}),angular.module("aroundMeApp").directive("priceAndRatings",function(){return{restrict:"EA",replace:!1,templateUrl:"../../views/priceAndRating.html",link:function(a,b,c){console.log("Ratings: "+c.ratings),console.log(c)}}});