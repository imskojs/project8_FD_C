(function() {
  'use strict';
  angular.module('app')
    .controller('FilterListController', FilterListController);

  FilterListController.$inject = [
    '$window', '$timeout',
    'FilterListModel'
  ];

  function FilterListController(
    $window, $timeout,
    FilterListModel
  ) {

    //====================================================
    //  Init
    //====================================================
    var _ = $window._;
    var FilterList = this;
    FilterList.Model = FilterListModel;

    FilterList.toggleSelectedFilter = toggleSelectedFilter;
    FilterList.isSelectedFilter = isSelectedFilter;

    //------------------------
    //  IMPLEMENTATIONS
    //------------------------
    function toggleSelectedFilter(filterObj) {
      if (isSelectedFilter(filterObj)) {
        var selectedTexts = _.pluck(FilterListModel.selectedFilters, 'text');
        var index = selectedTexts.indexOf(filterObj.text);
        $timeout(function() {
          FilterListModel.selectedFilters.splice(index, 1);
        }, 0);
      } else if (!isSelectedFilter(filterObj)) {
        var filterObjTextOnly = {};
        filterObjTextOnly.text = filterObj.text;
        $timeout(function() {
          FilterListModel.selectedFilters.push(filterObjTextOnly);
          console.log("---------- FilterListModel.selectedFilters ----------");
          console.log(FilterListModel.selectedFilters);
        }, 0);
      }
    }

    function isSelectedFilter(filterObj) {
      for (var i = 0; i < FilterListModel.selectedFilters.length; i++) {
        if (filterObj.text === FilterListModel.selectedFilters[i].text) {
          return true;
        }
      }
      return false;
    }


    //====================================================
    //  Helper
    //====================================================

  }
})();
