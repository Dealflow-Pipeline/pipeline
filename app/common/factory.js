var app = angular.module('pipeline.factory', [
  'firebase',
]);

app.factory('addNewRecord', function($firebaseObject) {
  return function(startup) {
    // create a reference to the database ndoe where we will store our data
    var randomStartupId = Math.round(Math.random() * 100000000);
    var ref = new Firebase('https://pipeline8.firebaseio.com/startup/' + randomStartupId);
    var startupRef = ref.child(randomStartupId);

    return $firebaseObject(startupRef);
  }
});
