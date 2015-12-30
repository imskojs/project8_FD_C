(function() {
  'use strict';

  angular.module('app')
    .factory('PostListContentModel', PostListContentModel);

  PostListContentModel.$inject = [];

  function PostListContentModel() {

    var Model = {
      loading: true,
      loadPhotos: true,
      more: true,
      posts: []
    };

    return Model;
  }
})();
