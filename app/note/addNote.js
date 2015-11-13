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
      });
      
      // cache the startup & founder for our success callback below (searchStartups/searchFounders)
      var startupName = note.startup;
      var founderName = note.founder;

      // clear the form upon submission
      $scope.clear();
    }
    
    // once a new note is created
    if (newNoteRef) {

      // success/error callback
      newNoteRef.on('value', function(dataSnapshot) {
        console.log('note added:' + dataSnapshot.val());
        console.log('note ID:' + newNoteRef.key());

        // if the user enters a startup name, search for that startup's ID and add to note object
        if (!!note.startup) {
          var startupId = searchStartups(note.startup);
          console.log('1', startupId)
          if (startupId) {
            console.log('2', startupId)
            notes.newNoteRef.key().startups[startupId] = true;
          }
        }
        // if the user enters a founder name, search for that founder's ID and add to note object
        // if (!!note.founder) {
          // var founderId = searchFounders(note.founder);
          // if (founderId) {
            // notes.newNoteRef.key().founders[founderId] = true;
          // }
        // }
      }, function(err) {
        console.log(err);
      });
    }
  };

    var test = '?';
  var searchStartups = function(startupName) {
    var startupRef = new Firebase('https://pipeline8.firebaseio.com/startup');
    startupRef.once("value", function(snapshot) {
      return snapshot.forEach(function(childSnapshot) {
        if (childSnapshot.val().name === startupName) {
          console.log(childSnapshot.key())
          test = childSnapshot.key();
        }
        var key = childSnapshot.key();
        // console.log(key)
        var childSnapshot = childSnapshot.val();
        // console.log(childSnapshot)
      });
      console.log(test)
    });
    // for debugging; this logs the entire notes object
    // console.log($firebaseObject(startupRef));
    // var startups = $firebaseObject(startupRef)
    // for (var startup in startups) {
    //   console.log(startupName)
    //   console.log(startup)
    //   if (startup[startupName]) {
    //     console.log('YES!!')
    //     console.log(note.startup)
    //     return startup[note.startup]
    //   }
    // }
    // return null;
    console.log(test)
    return test;
  };

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




