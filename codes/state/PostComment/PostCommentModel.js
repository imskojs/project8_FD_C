(function() {
  'use strict';

  angular.module('app')
    .factory('PostCommentModel', PostCommentModel);

  PostCommentModel.$inject = [];

  function PostCommentModel() {

    var Model = {
      loading: true,
      loadPhotos: true,
      comments: [],
      form: {
        post: '',
        content: ''
      }
    };

    return Model;
  }
})();
