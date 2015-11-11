var app = angular.module('addEntry', [
  'ui.bootstrap'
  ]);

app.controller('addEntryCtrl', function($scope) {
  console.log($scope);

  // attach startup to scope and populate with today's date
  $scope.startup = {
    "date": $scope.date
  };
  // attach entrep to scope and populate with today's date
  $scope.entrepreneur = {
    "date": $scope.date
  };

  // startup form fields will display by default, entrep fields will not
  $scope.entry = {
    startup: true,
    entrepreneur: false
  };

  $scope.date = new Date();

  // gets invoked on form submission
  $scope.add = function(startup, entrepreneur) {
    console.log('added!')
    $scope.startup = angular.copy(startup);
    $scope.entrepreneur = angular.copy(entrepreneur);

    // POST req here; send data to the server

    // on submit, clear the form
    $scope.clear();
  };

  $scope.clear = function() {

    // reset startup and entrep object
    $scope.startup = {
      "date": $scope.date
    };
    $scope.entrepreneur = {
      "date": $scope.date
    };

    // make form fields untouched and pristine
    $scope.addEntry.$setUntouched();
    $scope.addEntry.$setPristine();
  };

});
