(function() {
  'use strict';

  angular.module('app')
    .factory('EventListModel', EventListModel);

  EventListModel.$inject = [];

  function EventListModel() {

    var Model = {
      loading: true,
      loadPhotos: true,
      more: true,
      events: []
    };

    return Model;
  }
})();
