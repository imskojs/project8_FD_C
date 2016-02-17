(function(angular) {
  'use strict';
  angular.module('app')
    .config(route);
  route.$inject = [

    '$stateProvider', '$httpProvider', '$ionicConfigProvider'

  ];

  function route(

    $stateProvider, $httpProvider, $ionicConfigProvider

  ) {

    $ionicConfigProvider.scrolling.jsScrolling(false);

    $httpProvider.interceptors.push('AuthInterceptor');

    $stateProvider
      .state('Main', {
        // abstract: true,
        url: '/Main',
        templateUrl: 'state/0Main/Main.html',
        controller: 'MainController as Main'
      })
      .state('Main.MainTab', { // Tab Sub Header
        // abstract: true,
        url: '/MainTab',
        views: {
          Main: {
            templateUrl: 'state/1MainTab/MainTab.html',
            controller: 'MainTabController as MainTab'
          }
        }
      })

      .state('WalkThrough', {
        url: '/WalkThrough',
        templateUrl: 'state/WalkThrough/WalkThrough.html',
        controller: 'WalkThroughController as WalkThrough'
      })

      .state('Main.Notification', {
        // abstract: true
        url: '/Notification',
        views: {
          Main: {
            templateUrl: 'state/1Notification/Notification.html',
            controller: 'NotificationController as Notification'
          }
        }
      })
      .state('Main.MainTab.PlaceEvent', {
        // abstract: true,
        url: '/PlaceEvent',
        views: {
          MainTab: {
            templateUrl: 'state/2PlaceEvent/PlaceEvent.html',
            controller: 'PlaceEventController as PlaceEvent'
          }
        }
      })
      .state('Main.MainTab.PostList', {
        // abstract: true,
        url: '/PostList',
        views: {
          MainTab: {
            templateUrl: 'state/2PostList/PostList.html',
            controller: 'PostListController as PostList'
          }
        }
      })

    //====================================================
    //  Terms
    //====================================================
    .state('Main.Terms', {
      url: '/Terms',
      views: {
        Main: {
          templateUrl: 'state/Terms/Terms.html',
          controller: 'TermsController as Terms'
        }
      }
    })

    //====================================================
    //  Profile
    //====================================================
    .state('Main.Profile', {
      url: '/Profile',
      views: {
        Main: {
          templateUrl: 'state/Profile/Profile.html',
          controller: 'ProfileController as Profile'
        }
      }
    })

    //====================================================
    // Password 
    //====================================================
    .state('Main.Password', {
      url: '/Password',
      views: {
        Main: {
          templateUrl: 'state/Password/Password.html',
          controller: 'PasswordController as Password'
        }
      }
    })

    //====================================================
    // NotificationList 
    //====================================================
    .state('Main.Notification.NotificationList', {
      url: '/NotificationList',
      views: {
        Notification: {
          templateUrl: 'state/NotificationList/NotificationList.html',
          controller: 'NotificationListController as NotificationList'
        }
      }
    })

    //====================================================
    // NotificationDetail
    //====================================================
    .state('Main.Notification.NotificationDetail', {
      url: '/NotificationDetail/:id',
      views: {
        Notification: {
          templateUrl: 'state/NotificationDetail/NotificationDetail.html',
          controller: 'NotificationDetailController as NotificationDetail'
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
    //  PlaceDetail
    //====================================================

    .state('Main.PlaceDetail', {
      url: '/PlaceDetail/:id',
      views: {
        Main: {
          templateUrl: 'state/PlaceDetail/PlaceDetail.html',
          controller: 'PlaceDetailController as PlaceDetail'
        }
      }
    })

    //====================================================
    // PlaceReview 
    //====================================================

    .state('Main.PlaceReview', {
      url: '/PlaceReview/:placeTitle/:place',
      views: {
        Main: {
          templateUrl: 'state/PlaceReview/PlaceReview.html',
          controller: 'PlaceReviewController as PlaceReview'
        }
      }
    })

    .state('Main.EventReview', {
      url: '/EventReview/:eventTitle/:event',
      views: {
        Main: {
          templateUrl: 'state/EventReview/EventReview.html',
          controller: 'EventReviewController as EventReview'
        }
      }
    })

    /**
     * EventDetail
     */
    .state('Main.EventDetail', {
      url: '/EventDetail/:id',
      views: {
        Main: {
          templateUrl: 'state/EventDetail/EventDetail.html',
          controller: 'EventDetailController as EventDetail'
        }
      }
    })

    /*
      PostCreate
     */
    .state('Main.PostCreate', {
      url: '/PostCreate/:category/:from',
      views: {
        Main: {
          templateUrl: 'state/PostCreate/PostCreate.html',
          controller: 'PostCreateController as PostCreate'
        }
      }
    })

    /*
      PostComment
     */
    .state('Main.PostComment', {
        url: '/PostComment/:post',
        views: {
          Main: {
            templateUrl: 'state/PostComment/PostComment.html',
            controller: 'PostCommentController as PostComment'
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
      url: '/DaumMap/:id',
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
      url: '/MyPage/:reset',
      views: {
        MainTab: {
          templateUrl: 'state/MyPage/MyPage.html',
          controller: 'MyPageController as MyPage'
        }
      }
    })

    //====================================================
    //  Test1
    //====================================================
    .state('Main.Test1', {
      url: '/Test1',
      views: {
        Main: {
          templateUrl: 'state/Test1/Test1.html',
          controller: 'Test1Controller as Test1'
        }
      }
    });


  } //route end
})(angular);
