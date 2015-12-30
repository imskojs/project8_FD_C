(function() {
  'use strict';
  angular.module('app')
    .controller('PlaceDetailController', PlaceDetailController);

  PlaceDetailController.$inject = [
    '$window', '$scope', '$state', '$q',
    'PlaceDetailModel', 'FilterListModel', 'Preload', 'Place', 'U', 'Link', 'Favorite'
  ];

  function PlaceDetailController(
    $window, $scope, $state, $q,
    PlaceDetailModel, FilterListModel, Preload, Place, U, Link, Favorite
  ) {
    var _ = $window._;
    var categoryImages = _.map(FilterListModel.filters, function(filterObj) {
      var categoryObj = {};
      categoryObj.text = filterObj.text;
      categoryObj.alone = filterObj.alone;
      return categoryObj;
    });

    var PlaceDetail = this;
    PlaceDetail.Model = PlaceDetailModel;
    PlaceDetail.getCategoryIconImage = getCategoryIconImage;
    PlaceDetail.openLink = openLink;
    PlaceDetail.likePlace = likePlace;


    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);


    //====================================================
    //  Implementation
    //====================================================
    function onBeforeEnter() {
      PlaceDetailModel.loading = true;
    }

    function likePlace() {
      Favorite.likePlace(PlaceDetailModel.place);
    }

    function getCategoryIconImage(filterObj) {
      var imagePath = _.where(categoryImages, {
        text: filterObj.text
      })[0].alone;
      return imagePath;
    }

    function openLink() {
      console.log("---------- PlaceDetailModel.place.homepage ----------");
      console.log(PlaceDetailModel.place.homepage);
      Link.open(PlaceDetailModel.place.homepage);
    }

    function onAfterEnter() {
      return findOne()
        .then(function(place) {
          console.log("---------- place ----------");
          console.log(place);
          U.bindData(place, PlaceDetailModel, 'place');
          U.update();
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function onBeforeLeave() {
      U.resetSlides();
    }

    function findOne(extraQuery) {
      var query = {
        id: $state.params.id,
        populates: 'photos'
      };
      angular.extend(query, extraQuery);
      return Place.findOne(query).$promise
        .then(function(post) {
          var photosPromise = Preload.photos(post, 'Cloudinary600', true);
          return $q.all([post, photosPromise]);
        })
        .then(function(array) {
          var post = array[0];
          post.categories = _.map(post.categories, function(category) {
            var obj = {
              text: category
            };
            return obj;
          });
          return post;
        });
    }

  }
})();
