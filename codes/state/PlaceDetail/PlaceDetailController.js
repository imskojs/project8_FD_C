(function (){
  'use strict';
  angular.module('app')
    .controller('PlaceDetailController', PlaceDetailController);

  PlaceDetailController.$inject = [
    '$window', '$scope',
    'PlaceDetailModel', 'FilterListModel'
  ];

  function PlaceDetailController(

    $window, $scope,
    PlaceDetailModel, FilterListModel
  ){
    var _ = $window._;

    var PlaceDetail = this;
    PlaceDetail.Model = PlaceDetailModel;
    PlaceDetail.getImage = getImage;


    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    var categoryImages = _.map(FilterListModel.filters, function(filterObj){
      var categoryObj = {};
      categoryObj.text = filterObj.text;
      categoryObj.alone = filterObj.alone;
      return categoryObj;
    });

    //====================================================
    //  Implementation
    //====================================================
    function getImage(filterObj){
      var imagePath = _.where(categoryImages, {text: filterObj.text})[0].alone;
      return imagePath;
    }

    function onAfterEnter(){

    }

  }
})();


