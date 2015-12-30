(function() {
  'use strict';
  angular.module('app')
    .controller('MyPageController', MyPageController);

  MyPageController.$inject = [
    '$scope', '$ionicScrollDelegate', '$timeout', '$q', '$ionicHistory', '$ionicSlideBoxDelegate',
    '$window',
    'MyPageModel', 'Preload', 'Post', 'U', 'AppStorage', 'Place', 'Photo'
  ];

  function MyPageController(
    $scope, $ionicScrollDelegate, $timeout, $q, $ionicHistory, $ionicSlideBoxDelegate,
    $window,
    MyPageModel, Preload, Post, U, AppStorage, Place, Photo
  ) {

    var _ = $window._;
    var MyPage = this;
    MyPage.Model = MyPageModel;

    MyPage.setMyPageBg = setMyPageBg;
    MyPage.goToCreatePost = goToCreatePost;

    MyPage.loadMoreMyPostList = loadMoreMyPostList;
    MyPage.loadMoreFavoritePostList = loadMoreFavoritePostList;
    MyPage.loadMoreFavoritePlaceList = loadMoreFavoritePlaceList;

    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    MyPage.loadTemplate = _.throttle(loadTemplate, 600, {
      trailing: false
    });
    //====================================================
    //  Implementation
    //====================================================
    function setMyPageBg() {
      return Photo.get('gallery', 800, true, 600, 'rectangle', 2)
        .then(function(base64) {
          console.log("---------- base64 ----------");
          console.log(base64);
          $timeout(function() {
            MyPageModel.MyPage.form.myPageBg = base64;
          }, 0);
        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
        });
    }

    function goToCreatePost() {
      return U.goToState('Main.PostCreate', {
        category: 'NORMAL-POST'
      }, 'forward');
    }

    function loadMoreMyPostList() {
      var last = MyPageModel.MyPostList.posts.length - 1;
      return findMyPosts({
          olderThan: MyPageModel.MyPostList.posts[last].id
        })
        .then(function(postsWrapper) {
          U.appendData(postsWrapper, MyPageModel.MyPostList, 'posts');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function loadMoreFavoritePostList() {
      var last = MyPageModel.FavoritePostList.likes.length - 1;
      return findFavoritePostList({
          olderThan: MyPageModel.FavoritePostList.likes[last].id
        })
        .then(function(postsWrapper) {
          angular.forEach(postsWrapper.likes, function(like) {
            MyPageModel.FavoritePostList.likes.push(like);
          });
          U.appendData(postsWrapper, MyPageModel.FavoritePostList, 'posts');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function loadMoreFavoritePlaceList() {
      var last = MyPageModel.FavoritePlaceList.likes.length - 1;
      return findFavoritePlaceList({
          olderThan: MyPageModel.FavoritePlaceList.likes[last].id
        })
        .then(function(placesWrapper) {
          angular.forEach(placesWrapper.likes, function(like) {
            MyPageModel.FavoritePlaceList.likes.push(like);
          });
          U.appendData(placesWrapper, MyPageModel.FavoritePlaceList, 'places');
        })
        .catch(function(err) {
          U.error(err);
        });
    }


    function onAfterEnter() {
      return loadTemplate(MyPageModel.selectedTab);
    }

    //====================================================
    //  Helper
    //====================================================
    function findMyPosts(extraQuery) {
      var query = {
        owner: AppStorage.user.id,
        category: 'NORMAL-POST',
        limit: 5,
        populates: 'photos,createdBy',
        sort: 'id DESC'
      };
      angular.extend(query, extraQuery);
      return Post.find(query).$promise
        .then(function(postsWrapper) {
          var photosPromise = Preload.photos(postsWrapper.posts, 'Cloudinary600', true);
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
        limit: 20,
        sort: 'id DESC'
      };
      angular.extend(query, extraQuery);
      return Place.findLikedPlaces(query).$promise
        .then(function(placesWrapper) {
          var photosPromise = Preload.photos(placesWrapper.places, 'Cloudinary300', true);
          return $q.all([placesWrapper, photosPromise]);
        })
        .then(function(array) {
          var placesWrapper = array[0];
          return placesWrapper;
        });
    }

    function findFavoriteEventList(extraQuery) { // and Event
      var query = {
        category: 'notification',
        limit: 20,
        sort: 'id DESC'
      };
      angular.extend(query, extraQuery);
      return Post.find(query).$promise
        .then(function(postsWrapper) {
          var photosPromise = Preload.photos(postsWrapper.posts, 'Cloudinary600', true);
          return $q.all([postsWrapper, photosPromise]);
        })
        .then(function(array) {
          var postsWrapper = array[0];
          return postsWrapper;
        });
    }

    function findFavoritePostList(extraQuery) {
      var query = {
        limit: 5,
        sort: 'id DESC',
      };
      angular.extend(query, extraQuery);
      console.log("---------- query ----------");
      console.log(query);
      return Post.findLikedPosts(query).$promise
        .then(function(postsWrapper) {
          var photosPromise = Preload.photos(postsWrapper.posts, 'Cloudinary600', true);
          return $q.all([postsWrapper, photosPromise]);
        })
        .then(function(array) {
          var postsWrapper = array[0];
          return postsWrapper;
        });
    }

    function loadTemplate(tab) {
      MyPageModel.loading = true;
      $ionicScrollDelegate.$getByHandle('MyPage').freezeScroll(true);
      MyPageModel.selectedTab = tab;
      MyPageModel.templateUrl = 'state/MyPage/template/' + MyPageModel.selectedTab + '.html';
      if (tab === 'MyPostList') {
        return findMyPosts()
          .then(function(postsWrapper) {
            console.log("---------- postsWrapper ----------");
            console.log(postsWrapper);
            console.log("HAS TYPE: " + typeof postsWrapper);

            U.bindData(postsWrapper, MyPageModel.MyPostList, 'posts', /*loadingModel*/ MyPageModel);
          })
          .catch(U.error)
          .finally(function() {
            $ionicScrollDelegate.$getByHandle('MyPage').freezeScroll(false);
            U.broadcast($scope);
          });
      } else if (tab === 'FavoritePlaceList' /*Event and Places*/ ) {
        return findFavoritePlaceList()
          .then(function(placesWrapper) {
            console.log("---------- placesWrapper ----------");
            console.log(placesWrapper);
            MyPageModel.FavoritePlaceList.likes = placesWrapper.likes;
            U.bindData(placesWrapper, MyPageModel.FavoritePlaceList, 'places', /*loadingModel*/ MyPageModel);
          })
          .catch(U.error)
          .finally(function() {
            U.broadcast($scope);
            $ionicScrollDelegate.$getByHandle('MyPage').freezeScroll(false);
          });
      } else if (tab === 'FavoriteEventList' /*Event and Places*/ ) {
        return findFavoriteEventList()
          .then(function(postsWrapper) {
            U.bindData(postsWrapper, MyPageModel.FavoriteEventList, 'events', /*loadingModel*/ MyPageModel);
          })
          .catch(U.error)
          .finally(function() {
            $ionicScrollDelegate.$getByHandle('MyPage').freezeScroll(false);
          });
      } else if (tab === 'FavoritePostList') {
        return findFavoritePostList()
          .then(function(postsWrapper) {
            console.log("---------- postsWrapper ----------");
            console.log(postsWrapper);
            MyPageModel.FavoritePostList.likes = postsWrapper.likes;
            U.bindData(postsWrapper, MyPageModel.FavoritePostList, 'posts', /*loadingModel*/ MyPageModel);
          })
          .catch(U.error)
          .finally(function() {
            $ionicScrollDelegate.$getByHandle('MyPage').freezeScroll(false);
          });
      }
    }

  } //end
})();
