var app = angular.module('dashboard', ['firebase', 'ui.bootstrap', 'xeditable', 'angularUtils.directives.dirPagination']);

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

    // presets number of rows to 10 (pagination)
    $scope.rowCount = {
      startups: 10,
      notes: 10,
      founders: 10
    };

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

    // update individual notes object via x-editable
    $scope.updateNotes = function(update) {
      $scope.notes.$save(update).then(function(ref) {
        ref.key() === update.$id; // true
      },

      function(error) {
        console.log('Error:', error);
      });
    };

    // update startup object via x-editable
    $scope.updateStartup = function(update) {
      console.log($scope.startups);
      $scope.startups.$save(update).then(function(ref) {
        ref.key() === update.$id; // true
      },

      function(error) {
        console.log('Error:', error);
      });
    };

    // // status dropdown options for x-editable
    $scope.statuses = [
      {text: 'No status'},
      {text: 'Past due'},
      {text: 'Requires immediate action'},
      {text: 'To do'},
      {text: 'Just a reminder'},
      {text: 'Completed'},
    ];

    // pipeline dropdown options for x-editable
    $scope.pipelines = [
      {text: '-'},
      {text: '1. Introduced'},
      {text: '2. Spoke with Team'},
      {text: '3. Met Team'},
      {text: '4. Due Diligence'},
      {text: '5. Invested'},
      {text: '6. Passed'},
      {text: '7. Never Met'},
    ];

    // industry dropdown options for x-editable
    $scope.industries = [
      {text: '-'},
      {text: 'Agriculture'},
      {text: 'Clean Technology'},
      {text: 'Consumer"'},
      {text: 'Cryptocurrency'},
      {text: 'Design'},
      {text: 'Education'},
      {text: 'Energy'},
      {text: 'Enterprise'},
      {text: 'Entertainment'},
      {text: 'Events'},
      {text: 'Fashion'},
      {text: 'Finance'},
      {text: 'Hardware'},
      {text: 'Health & Wellness'},
      {text: 'Health Care'},
      {text: 'Internet of Things'},
      {text: 'Life Sciences'},
      {text: 'Media'},
      {text: 'Mobile'},
      {text: 'Real Estate'},
      {text: 'Retail'},
      {text: 'Sports'},
      {text: 'Travel'},
      {text: 'Venture for Good'},
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
