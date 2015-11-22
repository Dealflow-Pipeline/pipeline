var app = angular.module('founder', ['ui.bootstrap']);

// sets theme for xeditable
app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme
});

app.controller('profileFounderCtrl', [
  '$scope',
  'founderProfileFactory',
  'fullContactPersonFactory',
  '$stateParams',
  function($scope, founderProfileFactory, fullContactPersonFactory, $stateParams) {
    var founderId = $stateParams.founderId;

    // callback for firebase set method
    var onComplete = function(error) {
      if (error) {
        console.log('Error: ' + error);
      } else {
        console.log('Synchronization succeeded');
      }
    };

    // update startup object via x-editable
    $scope.updateFounder = function(update) {
      var founderRef = new Firebase('https://pipeline8.firebaseio.com/founder/');
      var founder = founderRef.child(founderId);
      founder.set(update, onComplete);
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

    // status dropdown options for x-editable
    $scope.statuses = [
      {text: 'No status'},
      {text: 'Past due'},
      {text: 'Requires immediate action'},
      {text: 'To do'},
      {text: 'Just a reminder'},
      {text: 'Completed'},
    ];

    // Get founder information via factory
    $scope.getProfile = function() {
      founderProfileFactory.getFounder(founderId).then(function(returnedData) {

        $scope.founder = returnedData;

        // Check if notes object exists within founder
        if ($scope.founder.notes) {

          // assign notes key's within founder to own variable
          $scope.notesArr = Object.keys($scope.founder.notes);

          // call getNotes
          $scope.getNotes($scope.notesArr);
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
    // $scope.getNotes = function(notes) {
    //   founderProfileFactory.getNotes(notes).then(function(returnedData) {
    //     $scope.notes = returnedData;
    //   });
    // };

    // Get notes via factory
    $scope.getNotes = function(notes) {
      founderProfileFactory.getNotes(notes).then(function(returnedData) {
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

    // Get startups via factory
    $scope.getStartups = function(startups) {
      founderProfileFactory.getStartups(startups).then(function(returnedData) {
        $scope.startups = returnedData;
      });
    };

    // Invoke inital method to get founder info
    $scope.getProfile();

    // here we will store the persons social profiles as an object
    $scope.fullContactSocialProfiles = {};

    // GET req for FullContact Person API (by email address)
    $scope.getFullContact = function(personEmail) {
      fullContactPersonFactory.getPerson(personEmail)
      .then(function(returnedData) {
        // assign returned data to $scope
        $scope.fullContact = returnedData;

        // convert person's social profile list from an array to object
        returnedData.socialProfiles.forEach(function(profile, index) {
          $scope.fullContactSocialProfiles[profile.type] = profile;
          console.log($scope.fullContactSocialProfiles)
        })
      }).catch(function(error) {
        console.log(error);
      });
    };
  },
]);
