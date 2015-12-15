(function(angular) {
  'use strict';

  angular.module('app')
    .factory('PlaceReviewModel', PlaceReviewModel);

  PlaceReviewModel.$inject = [];

  function PlaceReviewModel() {

    var model = {
      loading: false,
      reviews: [{
        stars: 4,
        content: '확실히 구장이 오래되엇 시설이 낡긴해요. ㅋㅋㅋ 그래도 멍멍 냐옹냐옹 찍찍 확실히 구장이 오래되엇 시설이 낡긴해요. ㅋㅋㅋ 그래도 멍멍 냐옹냐옹 찍찍 확실히 구장이 오래되엇 시설이 낡긴해요. ㅋㅋㅋ 그래도 멍멍 냐옹냐옹 찍찍 확실히 구장이 오래되엇 시설이 낡긴해요. ㅋㅋㅋ 그래도 멍멍 냐옹냐옹 찍찍 확실히 구장이 오래되엇 시설이 낡긴해요. ㅋㅋㅋ 그래도 멍멍 냐옹냐옹 찍찍 ',
        createdBy: {
          name: '이진호',
          profile_picture: 'http://placehold.it/300x300'
        },
        createdAt: new Date()
      }, {
        stars: 3,
        content: '확실히 구장이 오래되엇 시설이 낡긴해요. ㅋㅋㅋ 그래도 멍멍 냐옹냐옹 찍찍 확실히 구장이 오래되엇 시설이 낡긴해요. ㅋㅋㅋ 그래도 멍멍 냐옹냐옹 찍찍 확실히 구장이 오래되엇 시설이 낡긴해요. ㅋㅋㅋ 그래도 멍멍 냐옹냐옹 찍찍 확실히 구장이 오래되엇 시설이 낡긴해요. ㅋㅋㅋ 그래도 멍멍 냐옹냐옹 찍찍 확실히 구장이 오래되엇 시설이 낡긴해요. ㅋㅋㅋ 그래도 멍멍 냐옹냐옹 찍찍 ',
        createdBy: {
          name: '이진호',
          profile_picture: 'http://placehold.it/300x300'
        },
        createdAt: new Date()
      }, {
        stars: 2,
        content: '확실히 구장이 오래되엇 시설이 낡긴해요. ㅋㅋㅋ 그래도 멍멍 냐옹냐옹 찍찍 확실히 구장이 오래되엇 시설이 낡긴해요. ㅋㅋㅋ 그래도 멍멍 냐옹냐옹 찍찍 확실히 구장이 오래되엇 시설이 낡긴해요. ㅋㅋㅋ 그래도 멍멍 냐옹냐옹 찍찍 확실히 구장이 오래되엇 시설이 낡긴해요. ㅋㅋㅋ 그래도 멍멍 냐옹냐옹 찍찍 확실히 구장이 오래되엇 시설이 낡긴해요. ㅋㅋㅋ 그래도 멍멍 냐옹냐옹 찍찍 ',
        createdBy: {
          name: '이진호',
          profile_picture: 'http://placehold.it/300x300'
        },
        createdAt: new Date()
      }],
      more: false
    };
    return model;
  }
})(angular);
