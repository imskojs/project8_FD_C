(function(angular) {
  'use strict';
  angular.module('app', [
    'ionic',
    'ngCordova',
    'ngResource',
    'ngFileUpload',
    'ngTemplates',
    'ngStorage'
  ])
    .run(init);

  init.$inject = [
    '$ionicPlatform', '$window', '$rootScope', '$state',
    'RootScope', 'DEV_MODE'
  ];

  function init(
    $ionicPlatform, $window, $rootScope, $state,
    RootScope, DEV_MODE
  ) {

    angular.extend($rootScope, RootScope);
    if (DEV_MODE) {
      setInitialState();
    }
    $ionicPlatform.ready(onIonicPlatformReady);

    //====================================================
    //  Implementation
    //====================================================
    function onIonicPlatformReady() {
      if ($window.cordova && $window.cordova.plugins.Keyboard) {
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
      if ($rootScope.AppStorage.firstTime && $state.get('Main.WalkThrough')) {
        // First time user logic
        $state.go('Main.WalkThrough');
      } else if (!$rootScope.AppStorage.token) {
        // Not logged in user logic
        $state.go('Main.MainTab.PlaceEvent.DaumMap');
      } else {
        // Normal user logic
        $state.go('Main.SampleList');
      }
    }

  }
})(angular);
