var app = angular.module('startup', ['ui.bootstrap']);

app.controller('profileStartupCtrl', [
  '$scope',
  'startupProfileFactory',
  '$stateParams',
  function($scope, startupProfileFactory, $stateParams) {
    var startupId = $stateParams.startupId;

    // Get startup information via factory
    $scope.getProfile = function() {
      startupProfileFactory.getStartup(startupId).then(function(returnedData) {

        $scope.startup = returnedData;

        console.log($scope.startup);

        // Check if notes object exists within startup
        if ($scope.startup.notes) {
          // assign notes key's within startup to own variable
          var notesArr = Object.keys($scope.startup.notes);

          // call getNotes
          $scope.getNotes(notesArr);
        };

        // Check if founders object exists within startup
        if ($scope.startup.founders) {
          // assign founders key's within startup to own variable
          var foundersArr = Object.keys($scope.startup.founders);

          // call getFounders
          $scope.getFounders(foundersArr);
        };
      });
    };

    // Get notes via factory
    $scope.getNotes = function(notes) {
      startupProfileFactory.getNotes(notes).then(function(returnedData) {
        $scope.notes = returnedData;
      });
    };

    // Get founders via factory
    $scope.getFounders = function(founders) {
      startupProfileFactory.getFounders(founders).then(function(returnedData) {
        $scope.founders = returnedData;
      });
    };

    // Invoke inital method to get startup info
    $scope.getProfile();
  },
]);
