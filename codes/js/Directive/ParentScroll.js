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
// Fixes the case where parent veritcal scrolling(eg ion-content scroll) is disabled on area where ion-scroll is located.

// Usage
// ion-scroll[direction="x" parent-scroll]
(function(angular) {
  'use strict';

  angular.module('app')
    .directive('parentScroll', parentScroll);

  parentScroll.$inject = ['$ionicScrollDelegate', '$timeout', '$window', '$document'];

  function parentScroll($ionicScrollDelegate, $timeout, $window, $document) {
    return {
      scope: true,
      restrict: 'A',
      compile: compile
    };

    function compile(element, attr) {

      if (!$window.horizontalIonScrollCount) {
        $window.horizontalIonScrollCount = 0;
      }

      $window.horizontalIonScrollCount++;
      attr.delegateHandle = "horizontal" + $window.horizontalIonScrollCount;

      return function(scope, element, attr) {
        $timeout(function() {
          var horizontal = attr.delegateHandle;
          var sv = $ionicScrollDelegate.$getByHandle(horizontal).getScrollView();

          var container = sv.__container;

          var originaltouchStart = sv.touchStart;
          var originalmouseDown = sv.mouseDown;
          var originaltouchMove = sv.touchMove;
          var originalmouseMove = sv.mouseMove;

          container.removeEventListener('touchstart', sv.touchStart);
          container.removeEventListener('mousedown', sv.mouseDown);
          $document.removeEventListener('touchmove', sv.touchMove);
          $document.removeEventListener('mousemove', sv.mousemove);


          sv.touchStart = function(e) {
            e.preventDefault = function() {};
            originaltouchStart.apply(sv, [e]);
          };

          sv.touchMove = function(e) {
            e.preventDefault = function() {};
            originaltouchMove.apply(sv, [e]);
          };

          sv.mouseDown = function(e) {
            e.preventDefault = function() {};

            if (originalmouseDown) {
              originalmouseDown.apply(sv, [e]);
            }

          };


          sv.mouseMove = function(e) {
            e.preventDefault = function() {};

            if (originalmouseMove) {
              originalmouseMove.apply(sv, [e]);
            }

          };

          container.addEventListener("touchstart", sv.touchStart, false);
          container.addEventListener("mousedown", sv.mouseDown, false);
          $document.addEventListener("touchmove", sv.touchMove, false);
          $document.addEventListener("mousemove", sv.mouseMove, false);
        });

      };
    }
  }
})(angular);
