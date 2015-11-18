var app = angular.module('profileFactory', [
  'firebase',
]);

app.factory('startupProfileFactory', [
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

app.factory('founderProfileFactory', [
  '$q',
  function($q) {
    // Set all ref URL's
    var founderRef = new Firebase('https://pipeline8.firebaseio.com/founder/');
    var notesRef = new Firebase('https://pipeline8.firebaseio.com/notes/');
    var startupsRef = new Firebase('https://pipeline8.firebaseio.com/startup/');

    // define variables to store returned data
    var _founderData;
    var _notesArr = [];
    var _startupArr = [];

    return {
      getFounder: function(founderId) {
        var defer = $q.defer();

        // add startup ID to ref URL
        var profile = founderRef.child(founderId);

        profile.on('value', function(data) {
          // assign data reponse to _founderData variable
          _founderData = data.val();
          defer.resolve(_founderData);
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

      getStartups: function(startups) {
        var defer = $q.defer();

        // iterate through foundersArr and add founders ID to ref URL
        startups.forEach(function(startup) {
          var startupsAll = startupsRef.child(startup);

          // call reference URL and push response onto foundersArr
          startupsAll.on('value', function(data) {
            _startupArr.push(data.val());
            defer.resolve(_startupArr);
          });

          return defer.promise;
        });

        return defer.promise;
      },
    };
  },
]);
