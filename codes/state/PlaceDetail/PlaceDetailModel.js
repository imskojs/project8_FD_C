(function() {
  'use strict';

  angular.module('app')
    .factory('PlaceDetailModel', PlaceDetailModel);

  PlaceDetailModel.$inject = [];

  function PlaceDetailModel() {

    var model = {
      place: {
        photos: [{
          url: 'http://placehold.it/600x400'
        }, {
          url: 'http://placehold.it/600x400'
        }, {
          url: 'http://placehold.it/600x400'
        }],
        name: '대구 시민운동장 야구장',
        averageStars: 4.5,
        likes: 120,
        description: '대구시민 대구시민 대구시민 대구시민 대구시민 대구시민 대구시민 대구시민 대구시민 대구시민 대구시민',
        categories: [{text: '야구'}, {text: '스타디움'}],
        placeType: '야구장',
        openingHours: '09:00 - 21:00',
        price: '2천원 - 10만원',
        usage: '홈페이지 또는 전화 문의 후 이용',
        address: '대구광역시 북구 고성로35길 12-112',
        phone: '02-831-2755',
        homepage: 'http://singil.org',
        utilities: '화장실, 매점, 등등등',
        canPark: true,
        etc: '주차시설이 가득 찰 경우 주차 불가합니다.'
      }
    };

    return model;
  }
})();