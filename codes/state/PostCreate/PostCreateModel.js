(function(angular) {
  'use strict';

  angular.module('app')
    .factory('PostCreateModel', PostCreateModel);

  PostCreateModel.$inject = [];

  function PostCreateModel() {

    var model = {
      form: {
        files: [null, null, null, null, null],
        category: 'NORMAL-POST',
        content: ''
      }
    };
    return model;
  }
})(angular);
