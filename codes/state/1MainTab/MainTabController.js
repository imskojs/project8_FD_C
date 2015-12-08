(function() {
  'use strict';
  angular.module('app')
    .controller('MainTabController', MainTabController);

  MainTabController.$inject = [
    'MainTabModel'
  ];

  function MainTabController(
    MainTabModel
  ) {
    var MainTab = this;
    MainTab.Model = MainTabModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
