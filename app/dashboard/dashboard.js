var app = angular.module('dashboard', ['firebase']);

app.controller('dashboardCtrl', function($scope, $firebaseObject) {
  var startupRef = new Firebase('https://pipeline8.firebaseio.com/startup')
  var founderRef = new Firebase('https://pipeline8.firebaseio.com/founder')

  
  startupRef.on("value", function(startupSnapshot) {
    $scope.$apply(function() {
      var startups = [];
      startupSnapshot.forEach(function(startup) {
        startups.push(startup.val());
      });
      $scope.startups = startups;
    });
  });

  founderRef.on("value", function(founderSnapshot) {
    $scope.$apply(function() {
      var founders = [];
      founderSnapshot.forEach(function(founder) {
        founders.push(founder.val());
      });
      $scope.founders = founders;
  console.log($scope.founders)
    });
  });

  // console.log($scope)

  // $scope.startups.$loaded()
  //   .then(function() {
  //     console.log($scope.startups);
  //   })
  //   .catch(function(err) {
  //     console.error(err);
  //   })
    
});
