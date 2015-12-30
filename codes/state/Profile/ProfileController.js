(function() {
  'use strict';
  angular.module('app')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = [
    'ProfileModel'
  ];

  function ProfileController(
    ProfileModel
  ) {
    var Profile = this;
    Profile.Model = ProfileModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
