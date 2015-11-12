var app = angular.module('addEntry', [
  'ui.bootstrap',
  ]);

app.controller('addEntryCtrl',
  function($scope, $firebaseObject) {
  // var startupRef = new Firebase('https://pipeline8.firebaseio.com/startup');
  // var refEntrep = new Firebase('https://pipeline8.firebaseio.com/entrepreneur');

  console.log($scope);

  // attach startup to scope and populate with today's date
  $scope.startup = {
    "date": $scope.date,
    "founders": {}
  };

  // attach entrep to scope and populate with today's date
  $scope.founder = {
    "date": $scope.date
  };

  // startup form fields will display by default, entrep fields will not
  $scope.entry = {
    startup: true,
    founder: false,
  };

  $scope.date = new Date();

  // gets invoked on form submission
  $scope.add = function(startup, founder) {
    console.log('added!');
    $scope.startup = angular.copy(startup);
    $scope.founder = angular.copy(founder);

    // POST req here; send data to the server
    if (Object.keys($scope.founder).length > 1) {
      newFounder($scope.founder);
    } else {
      newStartup($scope.startup);
    }

    // startupRef.push($scope.startup);
    // on submit, clear the form
    $scope.clear();
  };

  var newStartup = function(startup) {
    var startupRef = new Firebase('https://pipeline8.firebaseio.com/startup');
    var newStartRef = startupRef.push($scope.startup);
    var startupID = newStartRef.key();
    newStartRef.on('value', function(dataSnapshot) {
      // console.log(startupID);
      // console.log('success');
      // console.log($scope.entrepreneur);
    },

    function(error) {
      console.log('Error: ' + error);
    });
  };

  var newFounder = function(founder) {
    // TODO: Prevent new record from being created with empty form submit
    var foudnerRef = new Firebase('https://pipeline8.firebaseio.com/founder');
    var newFounderRef = foudnerRef.push($scope.founder);
    var founderID = newFounderRef.key();
    newFounderRef.on('value', function(dataSnapshot) {
      // console.log(entrepreneurID);
      // console.log('success');
      addFounderToStartup(founderID);
    },

    function(error) {
      console.log('Error: ' + error);
    });
  };

  var addFounderToStartup = function(founderID) {
    $scope.startup.founders[founderID] = true;
    console.log($scope.startup);
    newStartup($scope.startup);
  };

  // var addEntreToStartup = function(entrepreneur, startup)

  $scope.clear = function() {

    // reset startup and entrep object
    $scope.startup = {
      "date": $scope.date,
      "entrepreneurs": {}
    };
    $scope.foudner = {
      "date": $scope.date
    };

    // make form fields untouched and pristine
    $scope.addEntry.$setUntouched();
    $scope.addEntry.$setPristine();
  };

});

// app.factory('startupFactory', function($http, $firebaseObject) {
//   var startupRef = new Firebase('https://pipeline8.firebaseio.com/startup');
//
//   var addNewStartup = function(newStartup, startupRef) {
//     startupRef.push($scope.startup);
//   };
// });
