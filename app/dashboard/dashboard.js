var app = angular.module('dashboard', ['firebase', 'ngTable']);

app.controller('dashboardCtrl', function($scope, $firebaseObject, NgTableParams) {
  var startupRef = new Firebase('https://pipeline8.firebaseio.com/startup')
  // $scope = $firebaseObject(startupRef);

  var data = [{ name: 'christian', age: 21 }, { name: 'anthony', age: 88 }];
  $scope.tableParams = new NgTableParams({}, { dataset: data});
  console.log(data)
  
  // startupRef.on("value", function(startupSnapshot) {
  //   console.log(startupSnapshot.val())
  //   $scope.startups = startupSnapshot.val();
  // });
  // console.log($scope)

  // $scope.startups.$loaded()
  //   .then(function() {
  //     console.log($scope.startups);
  //   })
  //   .catch(function(err) {
  //     console.error(err);
  //   })
    
});
