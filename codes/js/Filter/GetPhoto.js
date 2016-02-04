(function(angular) {
  'use strict';
  angular.module('app')
    .filter('GetPhoto', GetPhoto);

  GetPhoto.$inject = [];

  function GetPhoto() {
    return function(createdBy) {
      if (createdBy.profilePhoto && createdBy.profilePhoto.url) {
        return createdBy.profilePhoto.url;
      } else if (createdBy.profile_image) {
        return createdBy.profile_image;
      } else {
        return 'http://placehold.it/200x200';
      }
    };
  }
})(angular);
