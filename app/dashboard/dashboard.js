var app = angular.module('dashboard', ['firebase']);


// THIS WORKS; IT IS EVERYTHING EXCEPT FACTORY SOLUTION.... IT REPRESENTS THE MOST RECENT COMMIT
// app.controller('dashboardCtrl', function($scope, $firebaseObject) {
//   var startupRef = new Firebase('https://pipeline8.firebaseio.com/startup')
//   var founderRef = new Firebase('https://pipeline8.firebaseio.com/founder')

//   startupRef.on("value", function(startupSnapshot) {
//     $scope.$apply(function() {
//       var startups = [];
//       startupSnapshot.forEach(function(startup) {
//         startups.push(startup.val());
//       });
//       $scope.startups = startups;
//     });
//   });

//   founderRef.on("value", function(founderSnapshot) {
//     $scope.$apply(function() {
//       var founders = [];
//       founderSnapshot.forEach(function(founder) {
//         founders.push(founder.val());
//       });
//       $scope.founders = founders;
//   console.log($scope.founders)
//     });
//   });    
// });



app.controller('dashboardCtrl', function($scope, startupFactory) {
  $scope.getStartups = function() {
    var startupRef = new Firebase('https://pipeline8.firebaseio.com/startup')
    startupFactory.getStartups()
      .then(function(data) {
        $scope.startups = data;
      });
  };
  $scope.getStartups();
});


app.factory('startupFactory', function($q, $firebaseArray) {
  var startupRef = new Firebase('https://pipeline8.firebaseio.com/startup')

  var startups = [];

  return {
    getStartups: function() {

      var defer = $q.defer();

      startupRef.on("value", function(data) {
        startups = $firebaseArray(startupRef)
        defer.resolve(startups);
      });
      return defer.promise;
    }
  }
});






// WHAT I HAD BEFORE STARTING WITH RYAN:

// app.factory('startupFactory', function() {
//   var startupRef = new Firebase('https://pipeline8.firebaseio.com/startup')
//   var startupsObj = {
//     startups: []
//   };

//   startupsObj.getStartups = function() {
//     return startupRef.on("value", function(startupSnapshot) {
//       var getStartupsNow = function() {
//         startupSnapshot.forEach(function(startup) {
//           // angular.copy(startup.val(), startupsObj.startups)
//           startupsObj.startups.push(startup.val());
//         });
//         console.log(startupsObj.startups)
//       };
//       getStartupsNow();
//     console.log(startupsObj)
//     return startupsObj;
//     });
//   };
//   var test = startupsObj.getStartups();
//   return test;
//   // startupsObj.startups = startups;
//   // return startupsObj;
// });


// app.controller('dashboardCtrl', function($scope, $firebaseObject, startupFactory) {
//   // $scope.$apply(function () {
//   //   startupFactory.getStartups();
//   // })
//   console.log($scope)
//   console.log(startupFactory)
//   $scope.startups = startupFactory.startups;
// });



//   var founderRef = new Firebase('https://pipeline8.firebaseio.com/founder')
//   founderRef.on("value", function(founderSnapshot) {
//     $scope.$apply(function() {
//       var founders = [];
//       founderSnapshot.forEach(function(founder) {
//         founders.push(founder.val());
//       });
//       $scope.founders = founders;
//   console.log($scope.founders)
//     });
//   });    
// });
