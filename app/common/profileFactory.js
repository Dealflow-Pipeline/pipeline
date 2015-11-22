var app = angular.module('profileFactory', [
  'firebase',
]);

app.factory('startupProfileFactory', [
  '$q',
  '$firebaseObject',
  '$firebaseArray',
  function($q, $firebaseObject, $firebaseArray) {
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

      getNotes: function() {
        var defer = $q.defer();

        notesRef.on('value', function(data) {

          // firebase snapshot of our startup database
          notes = $firebaseArray(notesRef);

          // on resolve, pass the startups array to our controller
          defer.resolve(notes);
        });

        return defer.promise;
      },

      getFounders: function(founders) {
        var defer = $q.defer();
        _foundersArr = [];

        // iterate through foundersArr and add founders ID to ref URL
        founders.forEach(function(founder) {
          var foundersAll = foundersRef.child(founder);

          // call reference URL and push response onto foundersArr
          foundersAll.on('value', function(data) {
            _foundersArr.push($firebaseObject(foundersAll));
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
  '$firebaseObject',
  '$firebaseArray',
  function($q, $firebaseObject, $firebaseArray) {
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
          console.log(_founderData)
          defer.resolve(_founderData);
        });

        return defer.promise;
      },

      getNotes: function() {
        var defer = $q.defer();

        notesRef.on('value', function(data) {

          // firebase snapshot of our startup database
          notes = $firebaseArray(notesRef);

          // on resolve, pass the startups array to our controller
          defer.resolve(notes);
        });

        return defer.promise;
      },

      getStartups: function(startups) {
        var defer = $q.defer();
        _startupArr = [];

        // iterate through foundersArr and add founders ID to ref URL
        startups.forEach(function(startup) {
          var startupsAll = startupsRef.child(startup);

          // call reference URL and push response onto foundersArr
          startupsAll.on('value', function(data) {
            _startupArr.push($firebaseObject(startupsAll));
            defer.resolve(_startupArr);
          });

          return defer.promise;
        });

        return defer.promise;
      },
    };
  },
]);
