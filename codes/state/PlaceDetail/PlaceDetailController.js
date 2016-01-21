(function() {
  'use strict';
  angular.module('app')
    .controller('PlaceDetailController', PlaceDetailController);

  PlaceDetailController.$inject = [
    '$window', '$scope', '$state', '$q',
    'PlaceDetailModel', 'FilterListModel', 'Preload', 'Place', 'U', 'Link', 'Favorite',
    'Message'
  ];

  function PlaceDetailController(
    $window, $scope, $state, $q,
    PlaceDetailModel, FilterListModel, Preload, Place, U, Link, Favorite,
    Message
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
    PlaceDetail.call = call;
    PlaceDetail.openHomepage = openHomepage;
    PlaceDetail.openBlog = openBlog;
    PlaceDetail.likePlace = likePlace;
    PlaceDetail.unlikePlace = unlikePlace;
    PlaceDetail.isFavorite = Favorite.isFavorite;


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

    function unlikePlace() {
      Favorite.unlikePlace(PlaceDetailModel.place);
    }

    function getCategoryIconImage(filterObj) {
      var imagePath = _.where(categoryImages, {
        text: filterObj.text
      })[0].alone;
      return imagePath;
    }

    function call() {
      var phone = String(PlaceDetailModel.place.phone);
      console.log("---------- PlaceDetailModel.place.phone ----------");
      console.log(PlaceDetailModel.place.phone);
      if (phone[0] !== '0') {
        phone = '0' + phone;
      }
      var phoneArray = phone.split('');
      var indexParen = phoneArray.indexOf(')');
      if (indexParen !== -1) {
        phoneArray.splice(indexParen, 1);
      }
      var indexDash = phoneArray.indexOf('-');
      if (indexDash !== -1) {
        phoneArray.splice(indexDash, 1);
      }
      indexDash = phoneArray.indexOf('-');
      if (indexDash !== -1) {
        phoneArray.splice(indexDash, 1);
      }
      indexDash = phoneArray.indexOf('-');
      if (indexDash !== -1) {
        phoneArray.splice(indexDash, 1);
      }
      phone = phoneArray.join('');
      Link.call(phone);
    }

    function openHomepage() {
      console.log("---------- PlaceDetailModel.place.homepage ----------");
      console.log(PlaceDetailModel.place.homepage);
      if (PlaceDetailModel.place.homepage === 'ㅡ' || !PlaceDetailModel.place.homepage) {
        return Message.alert('홈페이지가기 알림', '홈페이지가 없는 시설입니다.');
      } else {
        Link.open(PlaceDetailModel.place.homepage);
      }
    }

    function openBlog() {
      console.log("---------- PlaceDetailModel.place.blog ----------");
      console.log(PlaceDetailModel.place.blog);
      if (PlaceDetailModel.place.blog) {
        Link.open(PlaceDetailModel.place.blog);
      } else {
        Message.alert('자세히 보기 알림', '추가정보가 없는 시설입니다.');
      }
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
