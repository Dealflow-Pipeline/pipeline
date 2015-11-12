var app = angular.module('pipeline.factory', [
  'firebase',
]);

app.factory('entrepFactory', function($http, $firebaseObject) {
  var refEntrep = new Firebase('https://pipeline8.firebaseio.com/entrepreneur');

  startupRef.push($scope.startup)
  .then(function(res) {
    return res.data;
  });

});
