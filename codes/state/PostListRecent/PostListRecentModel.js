(function() {
  'use strict';

  angular.module('app')
    .factory('PostListRecentModel', PostListRecentModel);

  PostListRecentModel.$inject = [];

  function PostListRecentModel() {

    var Model = {
      loading: true,
      loadPhotos: true,
      more: true,
      posts: []
    };

    return Model;
  }
})();
