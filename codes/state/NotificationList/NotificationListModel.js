(function() {
  'use strict';

  angular.module('app')
    .factory('NotificationListModel', NotificationListModel);

  NotificationListModel.$inject = [];

  function NotificationListModel() {

    var model = {
      posts: []
    };

    return model;

  }
})();
