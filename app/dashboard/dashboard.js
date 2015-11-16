var app = angular.module('dashboard', ['firebase']);

app.controller('dashboardCtrl', function($scope, $firebaseObject) {
  var ref = new Firebase('https://pipeline8.firebaseio.com/')
  $scope.data = $firebaseObject(ref);

  $scope.data.$loaded()
    .then(function() {
      console.log($scope.data);
    })
    .catch(function(err) {
      console.error(err);
    })
    
});
