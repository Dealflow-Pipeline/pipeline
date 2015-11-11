var app = angular.module('addEntry', [
  'ui.bootstrap'
  ]);

app.controller('addEntryCtrl', function($scope) {
  console.log($scope);

  $scope.startup = {
    "date": $scope.date
  };
  $scope.entrepreneur = {
    "date": $scope.date
  };

  $scope.entry = {
    startup: true,
    entrepreneur: false
  };

  $scope.date = new Date();

  $scope.add = function(startup, entrepreneur) {
    console.log('added!')
    $scope.startup = angular.copy(startup);
    $scope.entrepreneur = angular.copy(entrepreneur);
  };

});
