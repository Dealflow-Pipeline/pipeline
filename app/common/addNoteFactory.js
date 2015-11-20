var app = angular.module('addNoteFactory', ['firebase', 'ui.bootstrap']);

app.factory('noteInfoFactory', ['$uibModal', function($uibModal) {

  var rowInfo = {};

  return {
    getRow: function(startupName, startupId, founderName, founderId) {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'note/addNote.html',
        controller: 'addNoteCtrl',
        resolve: {
          entity: function() {
            return {
              startupName: startupName,
              startupId: startupId,
              founderName: founderName,
              founderId: founderId
            };
          }
        }
      });
    },
  }
}]);
