var app = angular.module('addNote', ['ui.bootstrap', 'firebase']);

app.controller('addNoteCtrl', 
  function($scope, $firebaseObject) {
  var ref = new Firebase('https://pipeline8.firebaseio.com/notes');
  console.log($scope)
  console.log(ref)
  $scope.data = $firebaseObject(ref);

  $scope.note = {};

  $scope.note.date = new Date();

  $scope.add = function(note) {
    console.log('note added!')

    $scope.note = angular.copy(note);

    $scope.addNote = function() {
      $scope.note.$save().then(function() {
        console.log('saved!')
      })
      .catch(function(err) {
        console.log(err)
      });
    };

    $scope.clear();
  };

  $scope.clear = function() {
    $scope.note = {
      "date": $scope.date
    }

    $scope.addNote.$setUntouched();
    $scope.addNote.$setPristine();
  };

});




