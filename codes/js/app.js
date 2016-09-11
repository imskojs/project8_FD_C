(function(angular) {
  'use strict';
  angular.module('app', [
      'ionic',
      'applicat.push.service',
      'ngCordova',
      'ngResource',
      'ngFileUpload',
      'ngTemplates',
      'ngStorage',
      'ngImgCrop'
    ])
    .run(init);

  init.$inject = [
    '$ionicPlatform', '$window', '$rootScope', '$state',
    'RootScope', 'Preload', 'PushService',
    'DEV_MODE', 'Assets'
  ];

  function init(
    $ionicPlatform, $window, $rootScope, $state,
    RootScope, Preload, PushService,
    DEV_MODE, Assets
  ) {

    // Preload.assets(Assets);

    angular.extend($rootScope, RootScope);

    // if (DEV_MODE) {
    //   setInitialState();
    // }

    $ionicPlatform.ready(onIonicPlatformReady);
    //====================================================
    //  Implementation
    //====================================================
    function onIonicPlatformReady() {
      if ($window.cordova && $window.cordova.plugins.Keyboard) {
        PushService.registerDevice();
        $window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if ($window.StatusBar) {
        $window.StatusBar.styleDefault();
      }
      setInitialState();
    }
    //====================================================
    //  Helper
    //====================================================
    function setInitialState() {
      if ($rootScope.AppStorage.isFirstTime && $state.get('WalkThrough')) {
        // First time user logic
        $state.go('WalkThrough');
      } else if (!$rootScope.AppStorage.token) {
        // Not logged in user logic
        $state.go('Main.Login');
      } else {
        $state.go('Main.MainTab.PlaceEvent.DaumMap');
        // $state.go('Main.Login');
        // $state.go('Main.Profile');
      }
    }

  }
})(angular);
