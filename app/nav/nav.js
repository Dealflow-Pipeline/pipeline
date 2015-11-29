var app = angular.module('nav', ['ui.bootstrap']);

app.controller('navCtrl', [
  '$scope',
  '$uibModal',
  function($scope, $uibModal) {
    console.log('more tests')

  $scope.open = function() {
    var uibModalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'addEntry/addEntry.html',
      controller: 'addEntryCtrl',
    });
  };

}]);
