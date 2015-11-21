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

    // cache the number of startups at each pipeline step for our dashboard funnel
    $scope.pipelineCount = {
      "1. Introduced": 0,
      "2. Spoke with Team": 0,
      "3. Met Team": 0,
      "4. Due Diligence": 0,
      "5. Invested": 0,
      "6. Passed": 0,
      "7. Never Met": 0
    }

    // set the default search/filter term
    $scope.searchTable = '';

    $scope.updateNotes = function(update) {
      console.log(update);
      $scope.notes.$save(update).then(function(ref) {
        ref.key() === update.$id; // true
        console.log($scope.notesArr);

        // call getNotes
        $scope.getNotes($scope.notesArr);
      },

      function(error) {
        console.log('Error:', error);
      });
    };

    $scope.statuses = [
      {text: 'No status'},
      {text: 'Past due'},
      {text: 'Requires immediate action'},
      {text: 'To do'},
      {text: 'Just a reminder'},
      {text: 'Completed'},
    ];


    // GET req for all startups; to populate our startup table
    $scope.getStartups = function() {

      // invoke our getStartup's from our factory
      startupsTableFactory.getStartups()
      .then(function(data) {

        // assign the startups data returned from our promise to scope
        $scope.startups = data;

        // iterate over all our startups
        data.forEach(function(startup, index) {

          // increment the appropriate pipeline counter for each startup in that step
          $scope.pipelineCount[startup.pipeline]++
        })
      });

    };
    $scope.getStartups();


    // GET req for all founders; to populate our founder table
    $scope.getFounders = function() {
      foundersTableFactory.getFounders()
      .then(function(data) {
        $scope.founders = data;

      });
    };
    $scope.getFounders();

    // GET req for all notes; to populate our notes table
    $scope.getNotes = function() {
      notesTableFactory.getNotes()
      .then(function(data) {
        $scope.notes = data;
      });
    };
    $scope.getNotes();


    // controls addNote (+) symbol; pass through info listed in the row
    $scope.open = function(startupName, startupId, founderName, founderId) {
      noteInfoFactory.getRow(startupName, startupId, founderName, founderId);
    };
  }]);
