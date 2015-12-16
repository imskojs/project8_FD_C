(function() {
  'use strict';
  angular.module('app')
    .controller('MyPageController', MyPageController);

  MyPageController.$inject = [
    '$scope', '$ionicScrollDelegate', '$timeout', '$q', '$ionicHistory',
    'MyPageModel', 'Preload', 'Post', 'U'
  ];

  function MyPageController(
    $scope, $ionicScrollDelegate, $timeout, $q, $ionicHistory,
    MyPageModel, Preload, Post, U
  ) {

    var MyPage = this;
    MyPage.Model = MyPageModel;
    // Defaults to MyPostList
    MyPage.selectedTab = 'MyPostList';
    MyPage.templateUrl = 'state/MyPage/template/' + MyPage.selectedTab + '.html';

    MyPage.loadTemplate = loadTemplate;

    function loadTemplate(tab) {
      MyPageModel.loading = true;
      $ionicScrollDelegate.$getByHandle('MyPage').freezeScroll(true);
      MyPage.selectedTab = tab;
      MyPage.templateUrl = 'state/MyPage/template/' + MyPage.selectedTab + '.html';
      if (tab === 'MyPostList') {
        return findMyPostList()
          .then(function(postsWrapper) {
            U.bindData(postsWrapper, MyPageModel.MyPostList, 'posts', /*loadingModel*/ MyPageModel);
          })
          .catch(U.error);
      } else if (tab === 'FavoritePlaceList' /*Event and Places*/ ) {
        return findFavoritePlaceList()
          .then(function(postsWrapper) {
            U.bindData(postsWrapper, MyPageModel.FavoritePlaceList, 'places', /*loadingModel*/ MyPageModel);
          })
          .catch(U.error);
      } else if (tab === 'FavoritePostList') {
        return findFavoritePostList()
          .then(function(postsWrapper) {
            U.bindData(postsWrapper, MyPageModel.FavoritePostList, 'posts', /*loadingModel*/ MyPageModel);
          })
          .catch(U.error);
      }
    }

    function findMyPostList(extraQuery) {
      var query = {
        category: 'notification',
        limit: 20,
        sort: 'id DESC'
      };
      angular.extend(query, extraQuery);
      return Post.find(query).$promise
        .then(function(postsWrapper) {
          var photosPromise = Preload.photos(postsWrapper.posts, 'Cloudinary200', true);
          return $q.all([postsWrapper, photosPromise]);
        })
        .then(function(array) {
          var postsWrapper = array[0];
          return postsWrapper;
        });
    }

    //TODO: findPlace, findEvent all
    function findFavoritePlaceList(extraQuery) { // and Event
      var query = {
        category: 'notification',
        limit: 20,
        sort: 'id DESC'
      };
      angular.extend(query, extraQuery);
      return Post.find(query).$promise
        .then(function(postsWrapper) {
          var photosPromise = Preload.photos(postsWrapper.posts, 'Cloudinary200', true);
          return $q.all([postsWrapper, photosPromise]);
        })
        .then(function(array) {
          var postsWrapper = array[0];
          return postsWrapper;
        });
    }

    function findFavoritePostList(extraQuery) {
      var query = {
        category: 'notification',
        limit: 20,
        sort: 'id DESC'
      };
      angular.extend(query, extraQuery);
      return Post.find(query).$promise
        .then(function(postsWrapper) {
          var photosPromise = Preload.photos(postsWrapper.posts, 'Cloudinary200', true);
          return $q.all([postsWrapper, photosPromise]);
        })
        .then(function(array) {
          var postsWrapper = array[0];
          return postsWrapper;
        });
    }

  } //end
})();
