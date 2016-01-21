/**
 * Created by Seunghoon Ko on 10/10/2015
 * As part of applicat platform
 *
 * Copyright (C) Applicat (www.applicat.co.kr) & Seunghoon Ko - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Seunghoon Ko <imskojs@gmail.com>, 10/10/2015
 *
 */
(function(angular) {
  'use strict';

  angular.module('app')
    .factory('Favorite', Favorite);

  Favorite.$inject = [
    '$timeout',
    'AppStorage', 'Post', 'Message', 'Place', 'Event'
  ];

  function Favorite(
    $timeout,
    AppStorage, Post, Message, Place, Event
  ) {

    var service = {
      toggleSaveToFavorite: toggleSaveToFavorite,
      isFavorite: isFavorite,

      likePost: likePost,
      likePlace: likePlace,
      unlikePlace: unlikePlace,
      likeEvent: likeEvent
    };

    return service;
    //====================================================
    //  Favorite.toggleSaveToFavorite
    //====================================================
    // Usage;
    //Favorite.toggleFavorite('1asf31sf1adf31')
    // Output(localStorage favorites array);
    //AppStorage.favorites.
    function toggleSaveToFavorite(id) {
      if (!Array.isArray(AppStorage.favorites)) {
        AppStorage.favorites = [];
      }
      if (isFavorite(id)) { //delte favorite
        var index = AppStorage.favorites.indexOf(id);
        AppStorage.favorites.splice(index, 1);
      } else if (!isFavorite(id)) { // add favorite
        AppStorage.favorites.push(id);
      }
      return AppStorage.favorites;
    }

    //====================================================
    //  Favorite.isFavorite
    //====================================================
    // Usage;
    //Favorite.isFavorite('1asf31sf1adf31')
    // Output(boolean if id exists in AppStorage.favorites);
    //true || false
    function isFavorite(id) {
      if (!Array.isArray(AppStorage.favorites)) {
        AppStorage.favorites = [];
      }
      for (var i = 0; i < AppStorage.favorites.length; i++) {
        if (String(id) === String(AppStorage.favorites[i])) {
          return true;
        }
      }
      return false;
    }

    function likePost(postObj) {
      Message.loading();
      Post.like({}, {
          post: postObj.id
        }).$promise
        .then(function(post) {
          if (post.message) {
            Message.alert('좋아요 알림', post.message);
          } else {
            $timeout(function() {
              postObj.likes = post.likes;
              Message.alert('좋아요 알림', '좋아요 성공!');
            }, 0);
          }
          console.log("---------- post ----------");
          console.log(post);
        })
        .catch(function(err) {
          Message.hide();
          Message.alert();
          console.log("---------- err ----------");
          console.log(err);
        });
    }

    function likePlace(placeObj) {
      Message.loading();
      Place.like({}, {
          place: placeObj.id
        }).$promise
        .then(function(place) {
          if (place.message) {
            Message.alert('좋아요 알림', place.message); // already liked
            toggleSaveToFavorite(place.id);
          } else {
            $timeout(function() {
              placeObj.likes = place.likes;
              Message.alert('좋아요 알림', '좋아요 성공!');
              toggleSaveToFavorite(place.id);
            }, 0);
          }
          console.log("---------- place ----------");
          console.log(place);
        })
        .catch(function(err) {
          Message.hide();
          Message.alert();
          console.log("---------- err ----------");
          console.log(err);
        });
    }

    function unlikePlace(placeObj) {
      Message.loading();
      Place.unlike({}, {
          place: placeObj.id
        }).$promise
        .then(function(place) {
          if (place.message) {
            Message.alert('좋아요 알림', place.message); // 좋아요 안한거 안좋아요 했음.
            toggleSaveToFavorite(place.id);
          } else {
            $timeout(function() {
              placeObj.likes = place.likes;
              Message.alert('좋아요 알림', '좋아요를 취소하였습니다.');
              toggleSaveToFavorite(place.id);
            }, 0);
          }
          console.log("---------- place ----------");
          console.log(place);
        })
        .catch(function(err) {
          Message.hide();
          Message.alert();
          console.log("---------- err ----------");
          console.log(err);
        });

    }

    function likeEvent(eventObj) {
      Message.loading();
      Event.like({}, {
          event: eventObj.id
        }).$promise
        .then(function(event) {
          if (event.message) {
            Message.alert('좋아요 알림', event.message);
          } else {
            $timeout(function() {
              eventObj.likes = event.likes;
              Message.alert('좋아요 알림', '좋아요 성공!');
            }, 0);
          }
          console.log("---------- event ----------");
          console.log(event);
        })
        .catch(function(err) {
          Message.hide();
          if (err.data.message) {
            Message.alert('좋아요 알림', err.data.message);
          } else {
            Message.alert();
          }
          console.log("---------- err ----------");
          console.log(err);
        });
    }

  } // Service END
})(angular);
