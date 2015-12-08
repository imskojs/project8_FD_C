(function() {
  'use strict';

  angular.module('app')
    .factory('PlaceListModel', PlaceListModel);

  PlaceListModel.$inject = [];

  function PlaceListModel() {

    var model = {
      places: [{
        id: 1,
        name: '대구시민 운동장 야구장',
        address: '대구 북구 고성로191',
        photos: [{
          url: 'http://placehold.it/200x100'
        }, {
          url: 'http://placehold.it/200x100'
        }],
        geoJSON: {
          type: 'Point',
          coordinates: [150, 33]
        }
      }, {
        id: 2,
        name: '대구시민 운동장 축구장',
        address: '대구 북구 고성로191',
        photos: [{
          url: 'http://placehold.it/200x100'
        }, {
          url: 'http://placehold.it/200x100'
        }],
        geoJSON: {
          type: 'Point',
          coordinates: [150, 33]
        }
      }, {
        id: 3,
        name: '대구시민 체육관',
        address: '대구 북구 고성로191',
        photos: [{
          url: 'http://placehold.it/200x100'
        }, {
          url: 'http://placehold.it/200x100'
        }],
        geoJSON: {
          type: 'Point',
          coordinates: [150, 33]
        }
      }]
    };
    return model;
  }
})();
