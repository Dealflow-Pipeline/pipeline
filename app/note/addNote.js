var app = angular.module('addNote', ['firebase', 'ui.bootstrap']);

app.controller('addNoteCtrl', ['$scope', '$firebaseObject', 'noteInfoFactory', '$uibModalInstance', 'entity', function($scope, $firebaseObject, noteInfoFactory, $uibModalInstance, entity) {
  var noteRef = new Firebase('https://pipeline8.firebaseio.com/notes');

  // set our initial note object
  $scope.note = {
    "date": new Date(),
    "status": "No status",
    "startup": entity.startupName || null,
    "startupId": entity.startupId || null,
    "founder": entity.founderName || null,
    "founderId": entity.founderId || null
  };
  
  // will determine whether the startup or founder form field gets displayed (and pre-populated)
  $scope.entry = {
    startup: false,
    founder: false
  };
  if ($scope.note.startupId) {
    $scope.entry.startup = true;
  }
  if ($scope.note.founderId) {
    $scope.entry.founder = true;
  }

  // modal 'cancel' button
  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

  // invoke on form submission
  $scope.add = function(note) {

    // if user submits a note, parse the form and submit the data
    if (!!note.text) {
      var newNoteRef = noteRef.push({
        "date": note.date.toISOString(),
        "note": note.text,
        "status": note.status || null,
        "startup": entity.startupName || null,
        "startupId": entity.startupId || null,
        "founder": entity.founderName || null,
        "founderId": entity.founderId || null
      }, function () {
    


      // if data hits the server, close the modal
      $uibModalInstance.close();

      // once the note data hits our server, read the data located there
      newNoteRef.once('value', function(noteSnapshot) {

        // cache the note key
        var noteId = noteSnapshot.key()

        if (!!entity.startupId) {

          // instantiate a reference to the nested notes object inside of startup
          var startupObjNote = new Firebase('https://pipeline8.firebaseio.com/startup/' + entity.startupId + '/notes/' + noteId);

          // set the nested noteId to true
          startupObjNote.set(true);

          // instantiate a reference to the nested notes object inside of startup
          var startupObjLastContact = new Firebase('https://pipeline8.firebaseio.com/startup/' + entity.startupId + '/lastContact');

          startupObjLastContact.once('value', function(date) {

            // if this note's date is more recent, set the startup's lastContact date to same date as the note
            if (Date.parse(note.date) > Date.parse(date.val())) {
              startupObjLastContact.set(note.date.toISOString());
            }
          }, function(errorObj) {
            console.log('Read Failed: ' + errorObj.code);
          });
        }

        if (!!entity.founderId) {

          // instantiate a reference to the nested notes object inside of founder
          var founderObjNote = new Firebase('https://pipeline8.firebaseio.com/founder/' + entity.founderId + '/notes/' + noteId);

          // set the noteId (thats inside this founder obj) to true
          founderObjNote.set(true);

          // instantiate a reference to the nested notes object inside of founder
          var founderObjLastContact = new Firebase('https://pipeline8.firebaseio.com/founder/' + entity.founderId + '/lastContact');

          founderObjLastContact.once('value', function(date) {

            // if this note's date is more recent, set the founder's lastContact date to same date as the note
            if (Date.parse(note.date) > Date.parse(date.val())) {
              founderObjLastContact.set(note.date.toISOString());
            }
          }, function(errorObj) {
            console.log('Read Failed: ' + errorObj.code);
          });

        }
        // same as code above, except for founders
        // if (!!entity.founderId) {
        //   var newFounderRef = new Firebase('https://pipeline8.firebaseio.com/founder/' + entity.founderId + '/notes/' + noteId);
        //   newFounderRef.set(true);
        //   var newNoteRefFounder = new Firebase('https://pipeline8.firebaseio.com/notes/' + noteId + '/startups/' + entity.FounderId);
        //   newNoteRefFounder.set(true);
        // }

        // clear the form upon submission
        $scope.clear();
      });
      });
    }
  }

  $scope.clear = function() {

    // reset note object
    $scope.note = {
      date: new Date()
    };

    // make form fields untouched and pristine
    // $scope.addNote.$setUntouched();
    // $scope.addNote.$setPristine();
  };

}]);







// THE CODE BELOW WILL HANDLE SITUATIONS WHERE USER CREATES A NOTE BUT WE DONT YET KNOW THE STARTUP OR FOUNDER ID THUS WE MUST ITERATE OVER STARTUP/FOUNDER OBJECT UNTIL WE LOCATE THE CORRECT ENTRY... THEN WE UPDATE THE DATABASE... THIS CODE IS NO LONGER NEEDED BC WE KNOW THE IDS OF EACH TABLE ROW

          // once the note data hits our server, read the data located there
        //   newNoteRef.once('value', function(noteSnapshot) {

        //     // create new instance of startup and founder
        //     var startupRef = new Firebase('https://pipeline8.firebaseio.com/startup');
        //     var founderRef = new Firebase('https://pipeline8.firebaseio.com/founder');

        //     // capture data inside the startup (nested) object so we can iterate over it
        //     startupRef.once('value', function(startupSnapshot) {

        //       // iterate over startup nested object so we can find a startup name match
        //       startupSnapshot.forEach(function(startup) {

        //         // if the name of the startup entered by user matches one in the database
        //         if ((!!note.startup) && (note.startup !== '') && startup.val().name === note.startup) {

        //           // cache the startup key and note key
        //           var startupRefId = startup.key()
        //           var noteId = noteSnapshot.key()

        //           // instantiate a reference to the nested notes object inside of startup
        //           var newStartupRef = new Firebase('https://pipeline8.firebaseio.com/startup/' + startupRefId + '/notes/' + noteId);

        //           // set the nested noteId to true
        //           newStartupRef.set(true);

        //           // instantiate a reference to the nested startup object inside of startup
        //           var newNoteRef = new Firebase('https://pipeline8.firebaseio.com/notes/' + noteId + '/startups/' + startupRefId);

        //           // set the nested startupId to true
        //           newNoteRef.set(true);
        //         }
        //       });
        //     });

        //     // capture data inside the founder (nested) object so we can iterate over it
        //     founderRef.once('value', function(founderSnapshot) {

        //       // iterate over founder nested object so we can find a founder name match
        //       founderSnapshot.forEach(function(founder) {

        //         // if the name of the founder entered by user matches one in the database
        //         if ((!!note.founder) && (note.founder !== '') && (founder.val().name === note.founder)) {

        //           // cache the founder key and note key
        //           var founderRefId = founder.key()
        //           var noteId = noteSnapshot.key()

        //           // instantiate a reference to the nested notes object inside of founder
        //           var newFounderRef = new Firebase('https://pipeline8.firebaseio.com/founder/' + founderRefId + '/notes/' + noteId);

        //           // set the nested noteId to true
        //           newFounderRef.set(true);

        //           // instantiate a reference to the nested founder object inside of founder
        //           var newNoteRef = new Firebase('https://pipeline8.firebaseio.com/notes/' + noteId + '/founders/' + founderRefId);

        //           // set the nested founderId to true
        //           newNoteRef.set(true);
        //         }
        //       });
        //     });
        //   });
        // });
