var app = angular.module('startup', ['ui.bootstrap', 'xeditable', 'firebase']);

// sets theme for xeditable
app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme
});

app.controller('profileStartupCtrl', [
  '$scope',
  'startupProfileFactory',
  '$stateParams',
  'searchAngelListStartups',
  '$http',
  function($scope, startupProfileFactory, $stateParams, searchAngelListStartups, $http) {
    var startupId = $stateParams.startupId;

    // callback for firebase set method
    var onComplete = function(error) {
      if (error) {
        console.log('Error: ' + error);
      } else {
        console.log('Synchronization succeeded');
      }
    };

    // update startup object via x-editable
    $scope.updateStartup = function(update) {
      var startupRef = new Firebase('https://pipeline8.firebaseio.com/startup/');
      var startup = startupRef.child(startupId);
      startup.set(update, onComplete);
    };

    // update individual notes object via x-editable
    $scope.updateNotes = function(update) {
      $scope.notesIndex.$save(update).then(function(ref) {
        ref.key() === update.$id; // true
      },

      function(error) {
        console.log('Error:', error);
      });
    };

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

    // status dropdown options for x-editable
    $scope.statuses = [
      {text: 'No status'},
      {text: 'Past due'},
      {text: 'Requires immediate action'},
      {text: 'To do'},
      {text: 'Just a reminder'},
      {text: 'Completed'},
    ];

    // Get startup information via factory
    $scope.getProfile = function() {
      startupProfileFactory.getStartup(startupId).then(function(returnedData) {

        $scope.startup = returnedData;

        // Check if notes object exists within startup
        if ($scope.startup.notes) {
          // assign notes key's within startup to own variable
          $scope.notesArr = Object.keys($scope.startup.notes);

          // call getNotes
          $scope.getNotes();
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
        $scope.notesIndex = returnedData;

        // array to store notes specific to this startup
        $scope.notes = [];

        // search notesIndex for keys stored in notesArr and
        // push associated record to $scope.notes
        $scope.notesArr.forEach(function(name) {
          if ($scope.notesIndex.$getRecord(name)) {
            $scope.notes.push($scope.notesIndex.$getRecord(name));
          }
        });
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
    $scope.getAngelList = function(startup) {
      searchAngelListStartups.searchAngel(startup).then(function(returnedData) {
        $scope.angelList = returnedData;
        console.log($scope.angelList);
        $scope.getAngelCompany($scope.angelList);
      });
    };

    $scope.getAngelCompany = function(startup) {
      console.log(startup[0].id);
      searchAngelListStartups.getAngel(startup[0].id).then(function(returnedData) {
        $scope.angelCompany = returnedData;
        console.log($scope.angelCompany);
      });
    };
  },
]);
