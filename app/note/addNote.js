var app = angular.module('addNote', ['ui.bootstrap', 'firebase']);

app.controller('addNoteCtrl', 
  function($scope, $firebaseObject) {
  var noteRef = new Firebase('https://pipeline8.firebaseio.com/notes');
  
  // for debugging; this logs the entire notes object
  console.log($firebaseObject(noteRef));

  // set our initial note object with only a date field (today's date)
  $scope.note = {
    date: new Date()
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
        "startups": {},
        "founders": {}
      }, function () {

        // once the data gets posted to server, read the data located there
        newNoteRef.once('value', function(noteSnapshot) {

          // console.log(newNoteRef.val())
          console.log(newNoteRef.key())

          // create new instance of startup and founder
          var startupRef = new Firebase('https://pipeline8.firebaseio.com/startup');
          var founderRef = new Firebase('https://pipeline8.firebaseio.com/founder');

          // capture data inside the startup (nested) object so we can iterate over it
          startupRef.once('value', function(startupSnapshot) {

            // iterate over startup nested object so we can find a startup name match
            startupSnapshot.forEach(function(startup) {

              // if the name of the startup entered by user matches one in the database
              if (startup.val().name === note.startup) {
                
                console.log(startup.key())
                console.log(noteSnapshot.key())

                var startupRefId = startup.key()
                var noteId = noteSnapshot.key()

                var newStartupRef = new Firebase('https://pipeline8.firebaseio.com/startup/' + startupRefId + '/notes/' + noteId);

                console.log('https://pipeline8.firebaseio.com/startup/' + startupRefId + '/notes/' + noteId)

                newStartupRef.set(true);


                // create a new object called 'notes' with the key as the notes unique id and value as true
                // console.log(startupRef.child(startup.key()));

                // startupRef.child(startup.key()).child('notes').push(true);

                // newNoteRef.child('startups').child(newNoteRef.key()).push(true);
              }


                // var noteKey = noteSnapshot.key();
                // startup.val().push({"notes": { noteKey: true }})


                // console.log(startupSnapshot.val()[startup.key()])
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

});




