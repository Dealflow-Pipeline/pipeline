var app = angular.module('dashboard', ['firebase']);

app.controller('dashboardCtrl', [
  '$scope',
  'startupsTableFactory',
  'foundersTableFactory',
  '$uibModal',
  function($scope, startupsTableFactory, foundersTableFactory, foundersFactory, $uibModal) {

  // GET req for all startups; to populate our startup table
  $scope.getStartups = function() {

    // invoke our getStartup's from our factory
    startupsTableFactory.getStartups()
      .then(function(data) {

        // assign the startups data returned from our promise to scope
        $scope.startups = data;
      });
  };
  $scope.getStartups();

  // GET req for all founder; to populate our founder table
  $scope.getFounders = function() {

    // invoke our getFounder's from our factory
    foundersTableFactory.getFounders()
      .then(function(data) {

        // assign the founders data returned from our promise to scope
        $scope.founders = data;
      });
  };
  $scope.getFounders();

  // controls addNote (+) symbol; pass through info listed in the row
  $scope.open = function(startupName, startupId, founderName, founderId) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'note/addNote.html',
      controller: 'addNoteCtrl',
      resolve: {
        entity: function() {
          return {
            startupName: startupName,
            startupId: startupId,
            founderName: founderName,
            founderId: founderId
          };
        }
      }
    });
  };
}]);
