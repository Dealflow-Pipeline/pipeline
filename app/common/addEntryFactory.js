var app = angular.module('addEntryFactory', ['firebase', 'ui.bootstrap']);

app.factory('newEntryFactory', [
  '$uibModal',
  function($uibModal) {

    return {
      openModal: function() {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'addEntry/addEntry.html',
          controller: 'addEntryCtrl',
          // resolve: {
          //   entity: function() {
          //     return {
          //       startupName: startupName,
          //       startupId: startupId,
          //       founderName: founderName,
          //       founderId: founderId,
          //     };
          //   },
          // },
        });
      },
    };
  },
]);
