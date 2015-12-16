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
    '$scope', '$state', '$q',
    'PostCreateModel', 'Post', 'Message', 'U', 'Preload'
  ];

  function PostCreateController(
    $scope, $state, $q,
    PostCreateModel, Post, Message, U, Preload
  ) {
    var PostCreate = this;
    PostCreate.Model = PostCreateModel;

    PostCreate.refresh = refresh;

    // $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    // $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Initial Loading of a state;
    //====================================================
    // function onBeforeEnter() {
    //   PostCreateModel.loading = true;
    // }

    // function onAfterEnter() {
    //   return findOne()
    //     .then(function(post) {
    //       console.log(post);
    //       U.bindData(post, PostCreateModel, 'post');
    //     })
    //     .catch(U.error);
    // }

    function refresh() {
      return findOne()
        .then(function(post) {
          console.log(post);
          U.bindData(post, PostCreateModel, 'post');
        })
        .catch(U.error)
        .finally(function() {
          U.broadcast($scope);
        });
    }

    //====================================================
    //  Implementations
    //====================================================
    function findOne(extraQuery) {
      var query = {
        id: $state.params.id
      };
      angular.extend(query, extraQuery);
      return Post.findOne(query).$promise
        .then(function(post) {
          var photosPromise = Preload.photos(post, 'Cloudinary200', false);
          return $q.all([post, photosPromise]);
        })
        .then(function(array) {
          var post = array[0];
          return post;
        });
    }

  } //end
})(angular);
