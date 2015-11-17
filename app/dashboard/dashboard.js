var app = angular.module('dashboard', ['firebase']);

app.controller('dashboardCtrl', function($scope, startupFactory) {

  $scope.getStartups = function() {
    startupFactory.getStartups()
      .then(function(data) {
        $scope.startups = data;
      });
  };
  $scope.getStartups();

  $scope.getFounders = function() {
    startupFactory.getFounders()
      .then(function(data) {
        $scope.founders = data;
      });
  };
  $scope.getFounders();
});


app.factory('startupFactory', function($q, $firebaseArray, $firebaseObject) {
  var startupRef = new Firebase('https://pipeline8.firebaseio.com/startup');
  var founderRef = new Firebase('https://pipeline8.firebaseio.com/founder');

  var startups = [];

  var founders = [];


  return {
    getStartups: function() {

      var defer = $q.defer();

      startupRef.on("value", function(data) {
        startups = $firebaseArray(startupRef)
        console.log(startups)
        defer.resolve(startups);
      });
      return defer.promise;
    },

    getFounders: function() {

      var defer = $q.defer();

      founderRef.on("value", function(data) {
        founders = $firebaseArray(founderRef)
        defer.resolve(founders)
      });
      return defer.promise;
    }
  }
});
