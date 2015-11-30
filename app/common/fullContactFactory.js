var app = angular.module('fullContactFactory', ['firebase']);

app.factory('fullContactPersonFactory', [
  '$q',
  '$http',
  'apiKeys',
  function($q, $http, apiKeys) {

    return {
      getPerson: function(personEmail) {
        var url = 'https://api.fullcontact.com/v2/person.json?email=personEmail&apiKey=' + apiKeys.fullContact;
        var defer = $q.defer();
        var url = url;
        $http.get(url, {
          headers: {
            'Content-type': 'application/json',
          },
        }).success(function(data) {
          defer.resolve(data);
        }).error(function(error) {
          console.log(error);
        });

        return defer.promise;
      },
    };
  },
]);
