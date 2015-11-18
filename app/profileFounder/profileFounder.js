var app = angular.module('founder', ['ui.bootstrap']);

app.controller('profileFounderCtrl', [
  '$scope',
  'founderProfileFactory',
  '$stateParams',
  function($scope, founderProfileFactory, $stateParams) {
    var founderId = $stateParams.founderId;

    // Get founder information via factory
    $scope.getProfile = function() {
      founderProfileFactory.getFounder(founderId).then(function(returnedData) {

        $scope.founder = returnedData;

        // Check if notes object exists within founder
        if ($scope.founder.notes) {
          // assign notes key's within founder to own variable
          var notesArr = Object.keys($scope.founder.notes);

          // call getNotes
          $scope.getNotes(notesArr);
        };

        // Check if startups object exists within founder
        if ($scope.founder.startups) {
          // assign startups key's within founder to own variable
          var startupsArr = Object.keys($scope.founder.startups);

          // call getStartups
          $scope.getStartups(startupsArr);
        };
      });
    };

    // Get notes via factory
    $scope.getNotes = function(notes) {
      founderProfileFactory.getNotes(notes).then(function(returnedData) {
        $scope.notes = returnedData;
      });
    };

    // Get startups via factory
    $scope.getStartups = function(startups) {
      founderProfileFactory.getStartups(startups).then(function(returnedData) {
        $scope.startups = returnedData;
      });
    };

    // Invoke inital method to get founder info
    $scope.getProfile();
  },
]);
