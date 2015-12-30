(function() {
  'use strict';
  angular.module('app')
    .controller('NotificationController', NotificationController);

  NotificationController.$inject = [
    'NotificationModel'
  ];

  function NotificationController(
    NotificationModel
  ) {
    var Notification = this;
    Notification.Model = NotificationModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
