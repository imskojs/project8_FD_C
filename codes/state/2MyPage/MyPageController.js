(function() {
  'use strict';
  angular.module('app')
    .controller('MyPageController', MyPageController);

  MyPageController.$inject = ['$scope', 'MyPageModel', '$timeout', '$ionicScrollDelegate'];

  function MyPageController($scope, MyPageModel, $timeout, $ionicScrollDelegate) {

    var MyPage = this;
    MyPage.Model = MyPageModel;
    MyPage.selectedTab = 'myPosts';

    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    //------------------------
    //  IMPLEMENTATIONS
    //------------------------
    //------------------------
    //  IMPLEMENTATIONS
    //------------------------
    function onAfterEnter() {
      $timeout(function() {
        MyPage.loadPhotos = true;
      }, 100);
      $ionicScrollDelegate.resize();
    }
    $scope.$watch('MyPage.selectedTab', function(nv, ov) {
      if (nv !== ov) {
        $ionicScrollDelegate.resize();
      }
    });

    function onBeforeLeave() {
      MyPage.loadPhotos = false;
    }
  }
})();
