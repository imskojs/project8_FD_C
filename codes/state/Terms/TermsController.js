(function() {
  'use strict';
  angular.module('app')
    .controller('TermsController', TermsController);

  TermsController.$inject = [
    'TermsModel'
  ];

  function TermsController(
    TermsModel
  ) {
    var Terms = this;
    Terms.Model = TermsModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
