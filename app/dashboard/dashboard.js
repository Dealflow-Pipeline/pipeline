var app = angular.module('dashboard', ['firebase', 'ui.bootstrap', 'xeditable']);

// sets theme for xeditable
app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme
});

app.controller('dashboardCtrl', [
  '$scope',
  'startupsTableFactory',
  'foundersTableFactory',
  'notesTableFactory',
  'noteInfoFactory',
  '$uibModal',
  function($scope, startupsTableFactory, foundersTableFactory, notesTableFactory, noteInfoFactory, $uibModal) {

  // sets the default sort column
  $scope.sortType = {
    startups: 'pipeline',
    founders: 'lastContact',
    notes: 'date'
  };

  // sets the table sort to ascending
  $scope.sortReverse = {
    startups: true,
    founders: true,
    notes: true
  };
  
  // set the default search/filter term
  $scope.searchTable = '';


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


  $scope.getNotes = function() {

    notesTableFactory.getNotes()
      .then(function(data) {
        console.log(data)
        $scope.notes = data;
    console.log($scope.notes)
      });
  };
  $scope.getNotes();


  // controls addNote (+) symbol; pass through info listed in the row
  $scope.open = function(startupName, startupId, founderName, founderId) {
    noteInfoFactory.getRow(startupName, startupId, founderName, founderId);
  };
}]);
