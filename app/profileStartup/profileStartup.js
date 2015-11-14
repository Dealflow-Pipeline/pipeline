var app = angular.module('startup', ['ui.bootstrap']);

app.controller('profileStartupCtrl', [
  '$scope',
  function($scope) {
    $scope.tabs = [
      { title:'Dynamic Title 1', content:'Dynamic content 1' },
      { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true },
    ];

  },
]);
