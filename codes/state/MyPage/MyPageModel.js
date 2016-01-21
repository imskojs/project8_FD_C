(function() {
  'use strict';

  angular.module('app')
    .factory('MyPageModel', MyPageModel);

  MyPageModel.$inject = [];

  function MyPageModel() {

    var Model = {
      loading: false,
      loadingBg: false,
      selectedTab: 'MyPostList',
      templateUrl: 'state/MyPage/template/MyPostList.html',

      MyPage: {
        user: {

        },
        form: {
          myPageBg: ''
        }
      },

      MyPostList: {
        more: true,
        posts: []
      },

      FavoritePlaceList: {
        more: true,
        places: [],
        likes: []
      },

      FavoriteEventList: {
        more: true,
        events: [],
        likes: []
      },

      FavoritePostList: {
        more: true,
        posts: [],
        likes: []
      }
    };
    return Model;
  }
})();
