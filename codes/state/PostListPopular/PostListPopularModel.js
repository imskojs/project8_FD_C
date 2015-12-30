(function() {
  'use strict';

  angular.module('app')
    .factory('PostListPopularModel', PostListPopularModel);

  PostListPopularModel.$inject = [];

  function PostListPopularModel() {

    var Model = {
      loading: true,
      loadPhotos: true,
      more: true,
      posts: []
    };

    return Model;
  }
})();
