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
    .factory('Post', Post);

  Post.$inject = [
    '$resource',
    'Photo',
    'SERVER_URL'
  ];

  function Post(
    $resource,
    Photo,
    SERVER_URL
  ) {

    var postUrl = SERVER_URL + '/post' +
      '/:find' +
      '/:findMyPosts' +
      '/:findLikedPosts' +
      '/:findOne' +
      '/:update' +
      '/:destroy' +
      '/:like' +
      '/:unlike';

    var params = {
      find: '@find',
      findMyPosts: '@findMyPosts',
      findLikedPosts: '@findLikedPosts',
      findOne: '@findOne',
      update: '@update',
      destroy: '@destroy',
      like: '@like',
      unlike: '@unlike'
    };

    var actions = {
      find: {
        method: 'GET',
        params: {
          find: 'find'
        }
      },

      findMyPosts: {
        method: 'GET',
        params: {
          findMyPosts: 'findMyPosts'
        }
      },

      findLikedPosts: {
        method: 'GET',
        params: {
          findLikedPosts: 'findLikedPosts'
        }
      },

      findOne: {
        method: 'GET',
        params: {
          findOne: 'findOne'
        }
      },

      update: {
        method: 'PUT',
        params: {
          update: 'update'
        }
      },

      destroy: {
        method: 'DELETE',
        params: {
          destroy: 'destroy'
        }
      },

      like: {
        method: 'POST',
        params: {
          like: 'like'
        }
      },

      unlike: {
        method: 'POST',
        params: {
          unlike: 'unlike'
        }
      }
    };

    var service = $resource(postUrl, params, actions);

    service.create = create;

    return service;

    //====================================================
    //  Non Resource methods
    //====================================================
    function create(params, query) {
      var promise = Photo.post('/post/create', query, 'POST')
        .then(function(postWrapper) {
          return postWrapper.data;
        });
      return {
        $promise: promise
      };
    }

  }
})(angular);
