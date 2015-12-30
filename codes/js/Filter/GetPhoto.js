(function(angular) {
  'use strict';
  angular.module('app')
    .filter('GetPhoto', GetPhoto);

  GetPhoto.$inject = [];

  function GetPhoto() {
    return function(createdBy) {
      if (createdBy.profilePhoto && createdBy.profilePhoto.url) {
        return createdBy.profilePhoto.url;
      } else if (createdBy.profile_picture) {
        return createdBy.profile_picture;
      } else {
        return 'http://placehold.it/200x200';
      }
    };
  }
})(angular);
