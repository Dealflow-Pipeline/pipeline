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

        // assign notes object within startup to own variable
        var notesArray = Object.keys($scope.startup.notes);

        // assign founders object within startup to own variable
        var foundersArray = Object.keys($scope.startup.founders);

        // call both getNotes and getFounders methods
        $scope.getNotes(notesArray);
        $scope.getFounders(foundersArray);
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
