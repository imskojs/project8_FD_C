(function() {
  'use strict';
  angular.module('app')
    .controller('FilterListController', FilterListController);

  FilterListController.$inject = ['FilterListModel'];

  function FilterListController(FilterListModel) {

    var FilterList = this;
    FilterList.Model = FilterListModel;

    //------------------------
    //  IMPLEMENTATIONS
    //------------------------

  }
})();
