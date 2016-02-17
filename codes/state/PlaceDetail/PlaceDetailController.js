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
          console.log("place :::\n", place);
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
// {
//   "places": [{
//     "createdBy": "564a80b8df42edae04654abb",
//     "updatedBy": "564a80b8df42edae04654abb",
//     "canPark": "true",
//     "categoies": "[{\"text\":\"스키\"}]",
//     "name": "수안보이글벨리스키리조트",
//     "placeType": "사설체육시설",
//     "openingHours": "(주중) 오전 10:00~13:00, 오후 13:00~17:00, 야간 18:00~22:00, 심야 22:00~00:30 / (주말 및 공휴일) 09:00~00:30",
//     "price": "스키 리프트 (대인기준) 오전권 47,000원 / 오후권 49,000원 / 야간권 49,000원 / 주간권 67,000원 / 심야권 35,000원",
//     "usage": "방문 및 인터넷예약",
//     "phone": "043-846-3000",
//     "homepage": "www.eaglevalley.co.kr",
//     "utilities": "의료실, 렌탈샵, 락커룸, 스키스쿨, 음식점 등",
//     "description": "서울 및 수도권, 전국 교통요지에 위치하여 수도권 지역에서는 1시간 30분, 경기 권에서는 1시간, 포항,대구,대전,청주 2시간 이내의 교통이 편리한 곳에 위치하여 전국 각지에서 방문하기 쉬운 4계절 레저문화의 중심지입니다.\r\n* 슬로프 개수 총 6개 (초급2, 중급2, 상급2)",
//     "address": "충북 충주시 수안보면 온천리 641-1",
//     "geoJSON": {
//       "type": "Point",
//       "coordinates": [127.97486485264427, 36.8486723380393]
//     },
//     "category": "PLACE",
//     "views": 0,
//     "likes": 0,
//     "createdAt": "2016-01-04T09:39:16.596Z",
//     "updatedAt": "2016-01-09T09:43:10.843Z",
//     "id": "568a3dc4e97245ef0430a90a"
//   }],
//   "more": false,
//   "total": 1
// }
