var app = angular.module('angelListFactory', ['firebase']);

app.factory('searchAngelListStartups', [
  '$q',
  '$http',
  'apiKeys',
  function($q, $http, apiKeys) {
  
  console.log(apiKeys.angelList)
  
  var companyName = 'periscope';

  return $http({
    method: 'JSONP',
    url: 'https://api.angel.co/1/search?query=periscope&access_token=00c527015025ccb99080a0e8c9b1b2cff0b8444eab0564f0',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Content-Type": "application/jsonp"
    },
    // url: 'https://api.angel.co/1/search?query=' + companyName + '&access_token=' + apiKeys.angelList
  })
    .then(function successCallback(response) {
      console.log(response);
      return response;
    }, function errorCallback(response) {
      console.log(response)
    })
}]);
