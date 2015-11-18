var app = angular.module('addNote', ['firebase', 'ui.bootstrap']);

app.controller('addNoteCtrl', [
  '$scope',
  '$firebaseObject',
  'noteInfoFactory',
  'entity',
  function($scope, $firebaseObject, noteInfoFactory, entity) {
    var noteRef = new Firebase('https://pipeline8.firebaseio.com/notes');
  
    // set our initial note object
    $scope.note = {
      date: new Date(),
      "startup": entity.startupName || null,
      "startupId": entity.startupId || null,
      "founder": entity.founderName || null,
      "founderId": entity.founderId || null
    };

    // invoke on form submission
    $scope.add = function(note) {
  
      // turn date to a string
      note.date = note.date.toString();
  
      // if user submits a note, parse the form and submit the data
      if (!!note.text) {
        var newNoteRef = noteRef.push({
          "note": note.text,
          "date": note.date,
          "status": note.status || null,
          "startup": entity.startupName || null,
          "startupId": entity.startupId || null,
          "founder": entity.founderName || null,
          "founderId": entity.founderId || null
        }, function () {
  
          // once the data gets posted to server, read the data located there
          newNoteRef.once('value', function(noteSnapshot) {
  
            // create new instance of startup and founder
            var startupRef = new Firebase('https://pipeline8.firebaseio.com/startup');
            var founderRef = new Firebase('https://pipeline8.firebaseio.com/founder');
  
            // capture data inside the startup (nested) object so we can iterate over it
            startupRef.once('value', function(startupSnapshot) {
  
              // iterate over startup nested object so we can find a startup name match
              startupSnapshot.forEach(function(startup) {
  
                // if the name of the startup entered by user matches one in the database
                if ((!!note.startup) && (note.startup !== '') && startup.val().name === note.startup) {
  
                  // cache the startup key and note key
                  var startupRefId = startup.key()
                  var noteId = noteSnapshot.key()
  
                  // instantiate a reference to the nested notes object inside of startup
                  var newStartupRef = new Firebase('https://pipeline8.firebaseio.com/startup/' + startupRefId + '/notes/' + noteId);
  
                  // set the nested noteId to true
                  newStartupRef.set(true);
  
                  // instantiate a reference to the nested startup object inside of startup
                  var newNoteRef = new Firebase('https://pipeline8.firebaseio.com/notes/' + noteId + '/startups/' + startupRefId);
  
                  // set the nested startupId to true
                  newNoteRef.set(true);
                }
              });
            });
  
            // capture data inside the founder (nested) object so we can iterate over it
            founderRef.once('value', function(founderSnapshot) {
  
              // iterate over founder nested object so we can find a founder name match
              founderSnapshot.forEach(function(founder) {
  
                // if the name of the founder entered by user matches one in the database
                if ((!!note.founder) && (note.founder !== '') && (founder.val().name === note.founder)) {
  
                  // cache the founder key and note key
                  var founderRefId = founder.key()
                  var noteId = noteSnapshot.key()
  
                  // instantiate a reference to the nested notes object inside of founder
                  var newFounderRef = new Firebase('https://pipeline8.firebaseio.com/founder/' + founderRefId + '/notes/' + noteId);
  
                  // set the nested noteId to true
                  newFounderRef.set(true);
  
                  // instantiate a reference to the nested founder object inside of founder
                  var newNoteRef = new Firebase('https://pipeline8.firebaseio.com/notes/' + noteId + '/founders/' + founderRefId);
  
                  // set the nested founderId to true
                  newNoteRef.set(true);
                }
              });
            });
          });
        });
  
        // clear the form upon submission
        $scope.clear();
      }
    }
  
    $scope.clear = function() {
  
      // reset note object
      $scope.note = {
        date: new Date()
      };
  
      // make form fields untouched and pristine
      $scope.addNote.$setUntouched();
      $scope.addNote.$setPristine();
    };
  }
]);
