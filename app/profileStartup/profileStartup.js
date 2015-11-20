var app = angular.module('startup', ['ui.bootstrap']);

app.controller('profileStartupCtrl', [
  '$scope',
  'startupProfileFactory',
  '$stateParams',
  'searchAngelListStartups',
  function($scope, startupProfileFactory, $stateParams, searchAngelListStartups) {
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

    // Invoke initial method to get startup info
    $scope.getProfile();



    // Search AL's database for match
    $scope.getAngelList = function(startupName) {
      // searchAngelListStartups
      // invoke the http GET req in angelListFactory.js
      //   this will return an array matching the search query
      //   choose the first one (index 0)
      //   return the object response from AL 
      //   display on the page via profileStartup.js

    };
  },
]);
