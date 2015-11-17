var app = angular.module('startup', ['ui.bootstrap']);

app.controller('profileStartupCtrl', [
  '$scope',
  'profileFactory',
  '$stateParams',
  function($scope, profileFactory, $stateParams) {
    var startupId = $stateParams.startupId;

    // Get startup information via factory
    $scope.getProfile = function() {
      profileFactory.getStartup(startupId).then(function(returnedData) {

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
      profileFactory.getNotes(notes).then(function(returnedData) {
        $scope.notes = returnedData;
      });
    };

    // Get founders via factory
    $scope.getFounders = function(founders) {
      profileFactory.getFounders(founders).then(function(returnedData) {
        $scope.founders = returnedData;
      });
    };

    // Invoke inital method to get startup info
    $scope.getProfile();
  },
]);

app.factory('profileFactory', [
  '$q',
  function($q) {
    // Set all ref URL's
    var startupRef = new Firebase('https://pipeline8.firebaseio.com/startup/');
    var notesRef = new Firebase('https://pipeline8.firebaseio.com/notes/');
    var foundersRef = new Firebase('https://pipeline8.firebaseio.com/founder/');

    // define variables to store returned data
    var _startupData;
    var _notesArr = [];
    var _foundersArr = [];

    return {
      getStartup: function(startupId) {
        var defer = $q.defer();

        // add startup ID to ref URL
        var profile = startupRef.child(startupId);

        profile.on('value', function(data) {
          // assign data reponse to _startupData variable
          _startupData = data.val();
          defer.resolve(_startupData);
        });

        return defer.promise;
      },

      getNotes: function(notes) {
        var defer = $q.defer();

        // iterate through notesArr and add notes ID to ref URL
        notes.forEach(function(note) {
          var notesAll = notesRef.child(note);

          // call reference URL and push response onto notesArr
          notesAll.on('value', function(data) {
            _notesArr.push(data.val());
            defer.resolve(_notesArr);
          });

          return defer.promise;
        });

        return defer.promise;
      },

      getFounders: function(founders) {
        var defer = $q.defer();

        // iterate through foundersArr and add founders ID to ref URL
        founders.forEach(function(founder) {
          var foundersAll = foundersRef.child(founder);

          // call reference URL and push response onto foundersArr
          foundersAll.on('value', function(data) {
            _foundersArr.push(data.val());
            defer.resolve(_foundersArr);
          });

          return defer.promise;
        });

        return defer.promise;
      },
    };
  },
]);
