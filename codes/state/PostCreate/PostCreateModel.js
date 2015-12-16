(function(angular) {
  'use strict';

  angular.module('app')
    .factory('PostCreateModel', PostCreateModel);

  PostCreateModel.$inject = [];

  function PostCreateModel() {

    var model = {
      form: {}
    };
    return model;
  }
})(angular);
