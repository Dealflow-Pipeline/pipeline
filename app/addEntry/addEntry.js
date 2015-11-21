var app = angular.module('addEntry', [
  'ui.bootstrap',
  ]);

app.controller('addEntryCtrl',
  function($scope, $firebaseObject) {

    // restricts the city autocomplete to USA only
    $scope.options = {
      type: ['(cities)'],
      componentRestrictions: { country: 'USA' }
    }

    $scope.date = new Date();

    // pre-populate form field & startup object with today's date
    $scope.startup = {
      "date": $scope.date,
      "lastContact": $scope.date,
      "pipeline": "1. Introduced",
      "founders": {}
    };

    // pre-populate form field & founder object with today's date
    $scope.founder = {
      "date": $scope.date,
      "lastContact": $scope.date,
      "startups": {}
    };

    // startup form fields will display by default, founder fields will not
    $scope.entry = {
      startup: true,
      founder: false,
    };

    // gets invoked on form submission
    $scope.add = function(startup, founder) {

      // turn dates to strings
      startup.date = startup.date.toISOString();
      startup.lastContact = startup.date;
      founder.date = founder.date.toISOString();
      founder.lastContact = founder.date;

      // Check whether we are adding a startup, a founder, or both
      function setAddEntry() {
        if ((Object.keys(founder).length > 3) && (Object.keys(startup).length > 3)) {

          // newStartupAndFounder(startup, founder);
          return {
            then: function(callback) {

              // create a new Startup and Founder
              callback(newStartup(startup), newFounder(founder));
            },
          };
        } else if (Object.keys(startup).length > 3) {
          return {
            then: function(callback) {

              // create a new startup
              callback(newStartup(startup));
            },
          };
        } else if (Object.keys(founder).length > 3) {
          return {
            then: function(callback) {

              // create a new founder
              callback(null, newFounder(founder));
            },
          };
        } else {
          console.log('Errror');
        }
      };

      // Invoke setAddEtnry with a promise
      setAddEntry().then(function(startupId, founderId) {
        if ((Object.keys(founder).length > 3) && (Object.keys(startup).length > 3)) {

          // add startupId and founderId reference to each others record
          pushStartupIdToFounder(startupId, founderId);
          pushFounderIdToStartup(founderId, startupId);
        } else {
          return;
        }

        return;
      },

      function(error) {
        console.log(error);
      });

      // on submit, clear the form
      $scope.clear();
    };

    // create a new startup in the database
    var newStartup = function(startup) {
      var startupRef = new Firebase('https://pipeline8.firebaseio.com/startup');
      var newStartupRef = startupRef.push(startup);

      // grab unique reference id for startup
      var startUpRefId = newStartupRef.key();

      // newStartupRef.on('value', function(dataSnapshot) {
        // console.log('Success');
      // },

      // function(error) {
      //   console.log('Error :' + error);
      // });

      return startUpRefId;
    };

    // create a new founder in the database
    var newFounder = function(founder) {

      // TODO: Prevent new record from being created with empty form submit
      var founderRef = new Firebase('https://pipeline8.firebaseio.com/founder');
      var newFounderRef = founderRef.push(founder);

      // grab founders unique reference id
      var founderRefId = newFounderRef.key();

      // newFounderRef.on('value', function(dataSnapshot) {
        // console.log('Success');
      // },

      // function(error) {
      //   console.log('Error :' + error);
      // });

      return founderRefId;
    };

    // sets startupId on founder record
    var pushStartupIdToFounder = function(startupId, founderRefId) {
      var founderRef = new Firebase('https://pipeline8.firebaseio.com/founder/' + founderRefId + '/startups/' + startupId);
      founderRef.set(true);
    };

    // sets founderId on startup record
    var pushFounderIdToStartup = function(founderId, startupRefId) {
      var startupRef = new Firebase('https://pipeline8.firebaseio.com/startup/' + startupRefId + '/founders/' + founderId);
      startupRef.set(true);
    };

    $scope.clear = function() {

      // reset startup and entrep object
      $scope.startup = {
        "date": $scope.date,
        "founders": {}
      };
      $scope.founder = {
        "date": $scope.date,
        "startups": {}
      };

      // make form fields untouched and pristine
      $scope.addEntry.$setUntouched();
      $scope.addEntry.$setPristine();
    };

  }
);
