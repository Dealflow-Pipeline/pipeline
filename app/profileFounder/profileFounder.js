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

        // assign notes object within founder to own variable
        // var notesArr = Object.keys($scope.founder.notes);

        // assign startups object within founder to own variable
        var startupsArr = Object.keys($scope.founder.startups);

        // call both getNotes and getStartups methods
        // $scope.getNotes(notesArr);
        $scope.getStartups(startupsArr);
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
