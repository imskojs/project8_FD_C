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
    'AppStorage', 'Post', 'Message', 'Place'
  ];

  function Favorite(
    $timeout,
    AppStorage, Post, Message, Place
  ) {

    var service = {
      toggleSaveToFavorite: toggleSaveToFavorite,
      isFavorite: isFavorite,

      likePost: likePost,
      likePlace: likePlace
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
            Message.alert('좋아요 알림', place.message);
          } else {
            $timeout(function() {
              placeObj.likes = place.likes;
              Message.alert('좋아요 알림', '좋아요 성공!');
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

  } // Service END
})(angular);
