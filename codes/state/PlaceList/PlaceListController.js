(function() {
  'use strict';
  angular.module('app')
    .controller('PlaceListController', PlaceListController);

  PlaceListController.$inject = [
    '$scope', '$q',
    'PlaceListModel', 'Preload', 'Place', 'Message', 'U'
  ];

  function PlaceListController(
    $scope, $q,
    PlaceListModel, Preload, Place, Message, U
  ) {

    var PlaceList = this;
    PlaceList.Model = PlaceListModel;
    var noLoadingStates = ['']


    //------------------------
    //  IMPLEMENTATIONS
    //------------------------
    function find(extraQuery) {
      var query = {
        category: 'notification',
        limit: 20,
        sort: 'id DESC'
      };
      angular.extend(query, extraQuery);
      return Place.within(query).$promise
        .then(function(postsWrapper) {
          var photosPromise = Preload.photos(postsWrapper.posts, 'Cloudinary200', true);
          return $q.all([postsWrapper, photosPromise]);
        })
        .then(function(array) {
          var postsWrapper = array[0];
          return postsWrapper;
        });
    }
  }
})();
