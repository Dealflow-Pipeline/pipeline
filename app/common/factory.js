var app = angular.module('pipeline', []);

app.factory('addEntrepFactory', function($http) {

});

app.factory('addStartupFactory', function($http) {
  var submitNewStartup = function(newStartup) {
    return $http.post('')
  }
});
