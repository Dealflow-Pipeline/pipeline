var app = angular.module('angelListFactory', ['firebase']);

app.factory('searchAngelListStartups', ['$q', '$http', function($q, $http) {

  var companyName = 'periscope';

  $http({
    method: 'GET',
    url: 'https://api.angel.co/1/search?query=' + companyName + '&access_token=00c527015025ccb99080a0e8c9b1b2cff0b8444eab0564f0'
  })
    .then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
      console.log(response)
    })
}]);
