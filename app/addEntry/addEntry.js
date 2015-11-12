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
    "entrepreneurs": {}
  };

  // attach entrep to scope and populate with today's date
  $scope.entrepreneur = {
    "date": $scope.date
  };

  // startup form fields will display by default, entrep fields will not
  $scope.entry = {
    startup: true,
    entrepreneur: false,
  };

  $scope.date = new Date();

  // gets invoked on form submission
  $scope.add = function(startup, entrepreneur) {
    console.log('added!');
    $scope.startup = angular.copy(startup);
    $scope.entrepreneur = angular.copy(entrepreneur);

    // POST req here; send data to the server
    if (Object.keys($scope.entrepreneur).length > 1) {
      addNewEntrepreneur($scope.entrepreneur);
    } else {
      addNewStartup($scope.startup);
    }

    // startupRef.push($scope.startup);
    // on submit, clear the form
    $scope.clear();
  };

  var addNewStartup = function(startup) {
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

  var addNewEntrepreneur = function(entrepreneur) {
    // TODO: Prevent new record from being created with empty form submit
    var entrepreneurRef = new Firebase('https://pipeline8.firebaseio.com/entrepreneur');
    var newEntreRef = entrepreneurRef.push($scope.entrepreneur);
    var entrepreneurID = newEntreRef.key();
    newEntreRef.on('value', function(dataSnapshot) {
      // console.log(entrepreneurID);
      // console.log('success');
      addEntreToStartup(entrepreneurID);
    },

    function(error) {
      console.log('Error: ' + error);
    });
  };

  var addEntreToStartup = function(entrepreneurID) {
    $scope.startup.entrepreneurs[entrepreneurID] = true;
    console.log($scope.startup);
    addNewStartup($scope.startup);
  };

  // var addEntreToStartup = function(entrepreneur, startup)

  $scope.clear = function() {

    // reset startup and entrep object
    $scope.startup = {
      "date": $scope.date,
      "entrepreneurs": {}
    };
    $scope.entrepreneur = {
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
