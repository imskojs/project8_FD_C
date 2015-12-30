(function() {
  'use strict';
  angular.module('app')
    .controller('PasswordController', PasswordController);

  PasswordController.$inject = [
    'PasswordModel'
  ];

  function PasswordController(
    PasswordModel
  ) {
    var Password = this;
    Password.Model = PasswordModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
