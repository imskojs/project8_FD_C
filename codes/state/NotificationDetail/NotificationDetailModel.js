(function() {
  'use strict';

  angular.module('app')
    .factory('NotificationDetailModel', NotificationDetailModel);

  NotificationDetailModel.$inject = [];

  function NotificationDetailModel() {

    var Model = {
      post: {}
    };

    return Model;

  }
})();
