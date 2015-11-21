var app = angular.module('angelListFactory', ['firebase']);

app.factory('searchAngelListStartups', [
  '$q',
  '$http',
  'apiKeys',
  function($q, $http, apiKeys) {
  
  console.log(apiKeys.angelList)
  
  var companyName = 'periscope';

  return $http({
    method: 'GET',
    url: 'https://api.angel.co/1/search?query=' + companyName + '&access_token=' + apiKeys.angelList
  })
    .then(function successCallback(response) {
      console.log(response);
      return response;
    }, function errorCallback(response) {
      console.log(response)
    })
}]);
