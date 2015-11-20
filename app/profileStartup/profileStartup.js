var app = angular.module('startup', ['ui.bootstrap', 'xeditable', 'firebase']);

// sets theme for xeditable
app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme
});

app.filter('pipelineFilter', [
  function() {
    return function(pipelineNum) { //1 = Introduced
      var pipelineNames = [
        'Introduced',
        'Spoke with Team',
        'Met Team',
        'Due Diligence',
        'Invested',
        'Passed',
        'Never Met',
      ];
      return pipelineNames[pipelineNum - 1];
    };
  },
]);

// app.filter('industryFilter', [
//   function() {
//     return function(pipelineNum) { //1 = Introduced
//       var pipelineNames = [
//         'Introduced',
//         'Spoke with Team',
//         'Met Team',
//         'Due Dukugence',
//         'Invested',
//         'Passed',
//         'Never Met',
//       ];
//       console.log(pipelineNames[pipelineNum - 1]);
//       return pipelineNames[pipelineNum - 1];
//     };
//   },
// ]);

app.controller('profileStartupCtrl', [
  '$scope',
  'startupProfileFactory',
  '$stateParams',
  'searchAngelListStartups',
  function($scope, startupProfileFactory, $stateParams, searchAngelListStartups) {
    var startupId = $stateParams.startupId;

    var ref = new Firebase('https://pipeline8.firebaseio.com/startup/');
    var startup = ref.child(startupId);
    console.log(startup);

    var onComplete = function(error) {
      if (error) {
        console.log('Error: ' + error);
      } else {
        console.log('Synchronization succeeded');
      }
    };

    $scope.updateStartup = function(update) {
      console.log(update);
      startup.set(update, onComplete);
    };

    // Get startup information via factory
    $scope.getProfile = function() {
      startupProfileFactory.getStartup(startupId).then(function(returnedData) {

        $scope.startup = returnedData;
        var test = $scope.startup;

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

    console.log($scope.notes);

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
