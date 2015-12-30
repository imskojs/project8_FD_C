(function() {
  'use strict';
  angular.module('app')
    .controller('Test1Controller', Test1Controller);

  Test1Controller.$inject = [
    'Test1Model'
  ];

  function Test1Controller(
    Test1Model
  ) {
    var Test1 = this;
    Test1.Model = Test1Model;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
