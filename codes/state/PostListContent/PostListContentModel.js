(function() {
  'use strict';

  angular.module('app')
    .factory('PostListContentModel', PostListContentModel);

  PostListContentModel.$inject = [];

  function PostListContentModel() {

    var Model = {
      posts: [{
        name: '운동할때, 먹으면 좋은 음식들',
        content: '요즘 날씨가 좋아져서 슬슬 라이딩을 하고 싶은데요, 착년에 자전거를 잃어 버려서요..ㅜㅜ 여자가 탈 휴대하기 편한 자전거 추천해 주세요~!!, 대하대하기 편한 자전거 추천해 주세요~!!기 편한 자전거 추천해 주세요~!!대하기 편한 자전거 추천해 주세요~!!',
        likes: 3,
        commentsCount: 5,
        createdAt: '2시간 전',
        createdBy: {
          name: '관리자',
          nickname: '쇼플레 관리자',
          photos: [{
            url: 'http://placehold.it/100x100'
          }],
          address: '대구사는 자전거 여신'
        },
        photos: [{
          id: 0,
          url: 'http://placehold.it/400x400'
        }, {
          id: 1,
          url: 'http://placehold.it/400x400'
        }, {
          id: 2,
          url: 'http://placehold.it/400x400'
        }]
      }, {
        name: '운동할때, 먹으면 좋은 음식들',
        content: '요즘 날씨가 좋아져서 슬슬 라이딩을 하고 싶은데요, 착년에 자전거를 잃어 버려서요..ㅜㅜ 여자가 탈 휴대하기 편한 자전거 추천해 주세요~!!, 대하대하기 편한 자전거 추천해 주세요~!!기 편한 자전거 추천해 주세요~!!대하기 편한 자전거 추천해 주세요~!!',
        likes: 3,
        commentsCount: 5,
        createdAt: '2시간 전',
        createdBy: {
          name: '관리자',
          nickname: '쇼플레 관리자',
          photos: [{
            url: 'http://placehold.it/100x100'
          }],
          address: '대구사는 자전거 여신'
        },
        photos: [{
          id: 0,
          url: 'http://placehold.it/400x400'
        }, {
          id: 1,
          url: 'http://placehold.it/400x400'
        }, {
          id: 2,
          url: 'http://placehold.it/400x400'
        }]

      }]
    };

    return Model;
  }
})();
