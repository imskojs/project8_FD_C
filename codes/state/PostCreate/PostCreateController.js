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
    .controller('PostCreateController', PostCreateController);

  PostCreateController.$inject = [
    '$scope', '$state', '$q', '$timeout',
    'PostCreateModel', 'Photo', 'Message', 'Post', 'U'
  ];

  function PostCreateController(
    $scope, $state, $q, $timeout,
    PostCreateModel, Photo, Message, Post, U
  ) {
    var PostCreate = this;
    PostCreate.Model = PostCreateModel;

    PostCreate.getPhoto = getPhoto;
    PostCreate.updatePhoto = updatePhoto;
    PostCreate.deletePhoto = deletePhoto;
    PostCreate.sendForm = sendForm;

    //====================================================
    //  Implementation
    //====================================================
    function getPhoto(sourceType, $index) {
      return Photo.get(sourceType, 600, true, 600, 'square')
        .then(function(base64) {
          $timeout(function() {
            PostCreateModel.form.files[$index] = base64;
          }, 0);
        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
          console.log("HAS TYPE: " + typeof err);
          Message.alert('사진 고르기 실패', '다시 시도해주세요.');
        });
    }


    function updatePhoto($index) {
      PostCreateModel.form.files[$index] = null;
      return Photo.get('gallery', 1000, true, 600, 'square')
        .then(function(base64) {
          $timeout(function() {
            PostCreateModel.form.files[$index] = base64;
          });
        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
          console.log("HAS TYPE: " + typeof err);
          Message.alert('사진 고릑 실패', '다시 시도해주세요.');
        });
    }

    function deletePhoto($index) {
      PostCreateModel.form.files[$index] = null;
    }

    function sendForm() {
      Message.loading();
      return Post.create({}, PostCreateModel.form).$promise
        .then(function(post) {
          console.log("---------- post ----------");
          console.log(post);
          Message.hide();
          return Message.alert('글작성 알림', '글이 성공적으로 작성 되었습니다.');
        })
        .then(function() {
          if ($state.params.from === 'PostListPopular') {

            return U.goToState('Main.MainTab.PostList.PostListPopular', null, 'back');

          } else if ($state.params.from === 'PostListRecent') {

            return U.goToState('Main.MainTab.PostList.PostListRecent', null, 'back');

          } else if (!$state.params.from) {

            return U.goToState('Main.MainTab.MyPage', {
              reset: true
            }, 'back');

          }
        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
          console.log("HAS TYPE: " + typeof err);
          Message.hide();
          Message.alert();
        })
        .finally(function() {
          reset();
        });
    }

    function reset() {
      PostCreateModel.form.files = [null, null, null, null, null];
    }

  } //end
})(angular);
