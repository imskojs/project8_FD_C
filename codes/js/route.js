(function(angular) {
  'use strict';
  angular.module('app')
    .config(route);
  route.$inject = ['$stateProvider', '$httpProvider'];

  function route($stateProvider, $httpProvider) {

    $httpProvider.interceptors.push('AuthInterceptor');

    $stateProvider

    .state('Main', {
      abstract: true,
      url: '/Main',
      templateUrl: 'state/0Main/Main.html',
      controller: 'MainController as Main'
    })
      .state('Main.MainTab', { // Tab Sub Header
        abstract: true,
        url: '/MainTab',
        views: {
          Main: {
            templateUrl: 'state/1MainTab/MainTab.html',
            controller: 'MainTabController as MainTab'
          }
        }
      })
      .state('Main.MainTab.PlaceEvent', {
        abstract: true,
        url: '/PlaceEvent',
        views: {
          MainTab: {
            templateUrl: 'state/2PlaceEvent/PlaceEvent.html',
            controller: 'PlaceEventController as PlaceEvent'
          }
        }
      })
      .state('Main.MainTab.PostList', {
        abstract: true,
        url: '/PostList',
        views: {
          MainTab: {
            templateUrl: 'state/2PostList/PostList.html',
            controller: 'PostListController as PostList'
          }
        }
      })

    //====================================================
    //  Login
    //====================================================
    .state('Main.Login', {
      url: '/Login',
      views: {
        Main: {
          templateUrl: 'state/Login/Login.html',
          controller: 'LoginController as Login'
        }
      }
    })

    //====================================================
    //  SignUp
    //====================================================
    .state('Main.SignUp', {
      url: '/SignUp',
      views: {
        Main: {
          templateUrl: 'state/SignUp/SignUp.html',
          controller: 'SignUpController as SignUp'
        }
      }
    })

    //====================================================
    //  FilterList, PlaceEvent.DaumMap, PlaceEvent.EventList, PlaceList
    //====================================================
    .state('Main.MainTab.FilterList', {
      params: {
        prev: ''
      },
      url: '/FilterList',
      views: {
        MainTab: {
          templateUrl: 'state/FilterList/FilterList.html',
          controller: 'FilterListController as FilterList'
        }
      }
    })

    .state('Main.MainTab.PlaceEvent.DaumMap', {
      params: {
        prev: ''
      },
      url: '/DaumMap',
      views: {
        PlaceEvent: {
          templateUrl: 'state/DaumMap/DaumMap.html',
          controller: 'DaumMapController as DaumMap'
        }
      }
    })

    .state('Main.MainTab.PlaceEvent.EventList', {
      params: {
        prev: ''
      },
      url: '/EventList',
      views: {
        PlaceEvent: {
          templateUrl: 'state/EventList/EventList.html',
          controller: 'EventListController as EventList'
        }
      }
    })

    .state('Main.MainTab.PlaceList', {
      params: {
        category: ''
      },
      url: '/PlaceList',
      views: {
        MainTab: {
          templateUrl: 'state/PlaceList/PlaceList.html',
          controller: 'PlaceListController as PlaceList'
        }
      }
    })

    //====================================================
    //  Timeline
    //====================================================
    .state('Main.MainTab.PostList.PostListRecent', {
      url: '/PostListRecent',
      views: {
        PostList: {
          templateUrl: 'state/PostListRecent/PostListRecent.html',
          controller: 'PostListRecentController as PostListRecent'
        }
      }
    })
      .state('Main.MainTab.PostList.PostListPopular', {
        url: '/PostListPopular',
        views: {
          PostList: {
            templateUrl: 'state/PostListPopular/PostListPopular.html',
            controller: 'PostListPopularController as PostListPopular'
          }
        }
      })
      .state('Main.MainTab.PostList.PostListContent', {
        url: '/PostListContent',
        views: {
          PostList: {
            templateUrl: 'state/PostListContent/PostListContent.html',
            controller: 'PostListContentController as PostListContent'
          }
        }
      })

    //====================================================
    //  MyPage
    //====================================================
    .state('Main.MainTab.MyPage', {
      url: '/MyPage',
      views: {
        MainTab: {
          templateUrl: 'state/MyPage/MyPage.html',
          controller: 'MyPageController as MyPage'
        }
      }
    });

  } //route end
})(angular);
