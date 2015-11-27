var app = angular.module('addEntry', ['ui.bootstrap']);

app.controller('addEntryCtrl', [
  '$scope', 
  '$firebaseObject', 
  '$state',
  function($scope, $firebaseObject, $state) {

  // restricts the city autocomplete to USA only
  $scope.options = {
    type: ['(cities)'],
    componentRestrictions: { country: 'USA' }
  }

  $scope.date = new Date();

  // pre-populate form field & startup object
  $scope.startup = {
    "date": $scope.date,
    "lastContact": $scope.date,
    "pipeline": "1. Introduced",
    "founders": {}
  };

  // pre-populate form field & founder object
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

  // if you change the "pre-populate form fields" above, you must also update this object
  var objectLength = {
    startup: 4,
    founder: 3
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
      if ((Object.keys(startup).length > objectLength.startup) && (Object.keys(founder).length > objectLength.founder)) {

        // newStartupAndFounder(startup, founder);
        return {
          then: function(callback) {

            // create a new startup and founder
            callback(newStartup(startup), newFounder(founder));

            // on submit, redirect use to newly-created startup profile page
            $state.go('startup', {startupId: $scope.startupId});
          },
        };
      } else if (Object.keys(startup).length > objectLength.startup) {
        return {
          then: function(callback) {

            // create a new startup
            callback(newStartup(startup));

            console.log('startup fired')
            // on submit, redirect use to newly-created startup profile page
            $state.go('startup', {startupId: $scope.startupId});
          },
        };
      } else if (Object.keys(founder).length > objectLength.founder) {
        return {
          then: function(callback) {

            // create a new founder
            callback(null, newFounder(founder));
            
            console.log('founder fired')
            // on submit, redirect use to newly-created startup profile page
            $state.go('founder', {founderId: $scope.founderId});

          },
        };
      } else {
        console.log('Error');
      }
    };

    // Invoke setAddEntry with a promise
    setAddEntry().then(function(startupId, founderId) {
      if ((Object.keys(startup).length > objectLength.startup) && (Object.keys(founder).length > objectLength.founder)) {

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
    var startupRefId = newStartupRef.key();

    newStartupRef.on('value', function(dataSnapshot) {
      console.log('Success');
    },

    function(error) {
      console.log('Error :' + error);
    });

    // assign the new startup ID to $scope and return it
    $scope.startupId = startupRefId;
    return startupRefId;
  };

  // create a new founder in the database
  var newFounder = function(founder) {

    // TODO: Prevent new record from being created with empty form submit
    var founderRef = new Firebase('https://pipeline8.firebaseio.com/founder');
    var newFounderRef = founderRef.push(founder);

    // grab founders unique reference id
    var founderRefId = newFounderRef.key();

    newFounderRef.on('value', function(dataSnapshot) {
      console.log('Success');
    },
    function(error) {
      console.log('Error :' + error);
    });

    // assign the new founder ID to $scope and return it
    $scope.founderId = founderRefId;
    return founderRefId;
  };

  // sets startupId on founder record
  var pushStartupIdToFounder = function(startupId, founderRefId) {
    var founderRef = new Firebase('https://pipeline8.firebaseio.com/founder/' + founderRefId + '/startup');
    founderRef.set($scope.startup.name);

    // this code below is used in situations where a founder belongs to multiple startups; for our purposes (MVP), we assume a founder can belong to only one startup at a time
    // var founderRef = new Firebase('https://pipeline8.firebaseio.com/founder/' + founderRefId + '/startups/' + startupId);
    // founderRef2.set(true);
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
}]);
