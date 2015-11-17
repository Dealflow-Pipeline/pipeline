var app = angular.module('dashboard', ['firebase']);

app.controller('dashboardCtrl', ['$scope', 'startupFactory', function($scope, startupFactory) {

  // GET req for all startups; to populate our startup table
  $scope.getStartups = function() {

    // invoke our getStartup's from our factory
    startupFactory.getStartups()
      .then(function(data) {

        // assign the startups data returned from our promise to scope
        $scope.startups = data;
      });
  };
  $scope.getStartups();

  // GET req for all founder; to populate our founder table
  $scope.getFounders = function() {

    // invoke our getFounder's from our factory
    startupFactory.getFounders()
      .then(function(data) {

        // assign the founders data returned from our promise to scope
        $scope.founders = data;
      });
  };
  $scope.getFounders();
}]);


app.factory('startupFactory', ['$q', '$firebaseArray', '$firebaseObject', function($q, $firebaseArray, $firebaseObject) {

  // instantiate new firebase objects
  var startupRef = new Firebase('https://pipeline8.firebaseio.com/startup');
  var founderRef = new Firebase('https://pipeline8.firebaseio.com/founder');

  var startups = [];
  var founders = [];

  return {
    getStartups: function() {

      var defer = $q.defer();

      // when the startup object changes or updates
      startupRef.on("value", function(data) {

        // firebase snapshot of our startup database
        startups = $firebaseArray(startupRef)

        // on resolve, pass the startups array to our controller
        defer.resolve(startups);
      });

      // return the deferred object's promise property
      return defer.promise;
    },

    getFounders: function() {

      var defer = $q.defer();

      // when the founder object changes or updates
      founderRef.on("value", function(data) {

        // firebase snapshot of our founder database
        founders = $firebaseArray(founderRef)
        
        // on resolve, pass the founders array to our controller
        defer.resolve(founders)
      });

      // return the deferred object's promise property
      return defer.promise;
    }
  }
}]);

