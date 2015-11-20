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
  function($scope, startupProfileFactory, $stateParams, searchAngelListStartups) {
    var startupId = $stateParams.startupId;

    // callback for firebase set method
    var onComplete = function(error) {
      if (error) {
        console.log('Error: ' + error);
      } else {
        console.log('Synchronization succeeded');
      }
    };

    // update startup object via xeditable
    $scope.updateStartup = function(update) {
      var startupRef = new Firebase('https://pipeline8.firebaseio.com/startup/');
      var startup = startupRef.child(startupId);
      startup.set(update, onComplete);
    };

    $scope.updateNotes = function(update) {
      update.$save().then(function(ref) {
        ref.key() === update.$id; // true
      },

      function(error) {
        console.log('Error:', error);
      });
    };

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
        $scope.notes = [];
        $scope.notes = returnedData;
        console.log($scope.notes);
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

    // $scope.updateStartup = function(startupId) {
    //   ref = new Firebase('https://pipeline8.firebaseio.com/startup/' + startupId);
    //   var sync = $firebase(ref);
    //
    //   $scope.startup = sync.$asArray();
    // };

    console.log($scope.startup);
  },
]);
