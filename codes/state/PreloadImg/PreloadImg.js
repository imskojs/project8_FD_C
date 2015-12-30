/**
 * Created by andy on 11/12/15
 * As part of ktownclient
 *
 * Copyright (C) Applicat (www.applicat.co.kr) & Andy Yoon Yong Shin - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Andy Yoon Yong Shin <andy.shin@applicat.co.kr>, 11/12/15
 *
 */

(function (angular) {
  "use strict";
  angular.module('preloadImg', [])
    .directive('preloadImg', preloadImgDirective);

  preloadImgDirective.$inject = ['$compile', 'preloader', '$timeout'];

  function preloadImgDirective($compile, preloader, $timeout) {
    return {
      restrict: 'A',
      scope: {
        //android, ios, ios-small, bubbles, circles, crescent, dots, lines, ripple, spiral
        imgSrc: '='
      },
      link: link
    };

    function link(scope, element, attribute) {

      /***********************************
       *           Initialisation
       ***********************************/

      var loadingStyle = attribute.loadStyle || 'android';
      element.append($compile("<div class='preload-spinner'><ion-spinner  icon='" + loadingStyle + "'></ion-spinner></div><")(scope));

      scope.$watch('imgSrc', function (newValue) {
        console.log(newValue);
        if (newValue) {
          preloader.preloadImages([newValue]).then(
            function handleResolve(imageLocations) {
              //$timeout(function () {
              setStyle(newValue);
              //}, 1000);
            },
            function handleReject(imageLocation) {
            },
            function handleNotify(event) {
            });
        }
      });

      /***********************************
       *           Declaration
       ***********************************/


      /***********************************
       *           Implementation
       ***********************************/

      function setStyle(imgSrc) {

        var style = '';

        style += ";background-image: url('" + imgSrc + "?" + new Date().getTime() + "')";
        style += "; background-repeat: no-repeat";
        style += "; background-position: center";
        style += "; background-size: 100%;";

        element.attr('style', style);

        $timeout(function () {
          var loader = element.find('div');
          loader.addClass('load-done');
        }, 500);
      }
    }
  }

})(angular);