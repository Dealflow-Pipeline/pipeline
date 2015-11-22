var app = angular.module('angelListFactory', ['firebase']);

app.factory('searchAngelListStartups', [
  '$q',
  '$http',
  'apiKeys',
  function($q, $http, apiKeys) {

    return {
      searchAngel: function(startup) {
        var defer = $q.defer();
        var url = 'https://api.angel.co/1/search?query=' + startup + '&access_token=' + apiKeys.angelList + '&callback=JSON_CALLBACK';

        $http.jsonp(url)
        .success(function(data) {
          defer.resolve(data);
        }).error(function(error) {
          console.log(error);
        });

        return defer.promise;
      },

      getAngel: function(id) {
        var defer = $q.defer();
        var url = 'https://api.angel.co/1/startups/' + id + '?access_token=' + apiKeys.angelList + '&callback=JSON_CALLBACK';

        // https://api.angel.co/1/startups/50?

        $http.jsonp(url)
        .success(function(data) {
          defer.resolve(data);
        }).error(function(error) {
          console.log(error);
        });

        return defer.promise;
      },
    };
  },
]);
