var app = angular.module('startup', ['ui.bootstrap']);

app.controller('profileStartupCtrl', [
  '$scope',
  '$stateParams',
  function($scope, $stateParams) {
    var startupId = $stateParams.startupId;
    $scope.username = 'World';

    // var startup = {
    //   profile: [],
    // };

    var startupRef = new Firebase('https://pipeline8.firebaseio.com/startup/' + startupId);

    startupRef.on('value', function(snapshot) {
      // angular.copy(snapshot.val(), startup.startup);

      $scope.startup = snapshot.val();

      // $scope.date = startup.date.toString();
      // $scope.name = startup.name;
      // $scope.founders = startup.founders;
      // $scope.funnel = startup.funnel;
      // $scope.location = startup.location;
      // $scope.source = startup.source
      // $scope.
      console.log(1, snapshot.val());
      console.log($scope.startup.name);
    },

    function(errorObject) {
      console.log('The read failed: ' + errorObject.code);
    });

    $scope.tabs = [
      { title:'Dynamic Title 1', content:'Dynamic content 1' },
      { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true },
    ];
    console.log($scope.startup);
  },
]);
