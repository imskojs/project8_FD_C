(function() {
  'use strict';
  angular.module('app')
    .controller('WalkThroughController', WalkThroughController);

  WalkThroughController.$inject = [
    '$scope', '$ionicSlideBoxDelegate', '$window', '$state', '$ionicGesture',
    'WalkThroughModel', 'AppStorage', 'U'
  ];

  function WalkThroughController(
    $scope, $ionicSlideBoxDelegate, $window, $state, $ionicGesture,
    WalkThroughModel, AppStorage, U 
  ) {

    var WalkThrough = this;
    WalkThrough.Model = WalkThroughModel;

    WalkThrough.leaveWalkThrough = leaveWalkThrough;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.enter', onEnter);

    //====================================================
    //  Implementations
    //====================================================

    function onBeforeEnter() {
      $ionicSlideBoxDelegate.$getByHandle('walk-through-slide').update();
      $ionicSlideBoxDelegate.$getByHandle('walk-through-slide').slide(0, 0);
      $ionicSlideBoxDelegate.$getByHandle('walk-through-slide').enableSlide(true);
    }

    function onEnter() {
      var lastSlideIndex = WalkThroughModel.imagePaths.length - 1;
      var lastSlideElement = angular.element($window.document.querySelector('#slide' + lastSlideIndex));
      $ionicGesture.on('swipeleft', leaveWalkThrough, lastSlideElement);
    }

    function leaveWalkThrough() {
      AppStorage.isFirstTime = false;
      U.goToState('Main.Login', null, 'forward');
    }

  }
})();
