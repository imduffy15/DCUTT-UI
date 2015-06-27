'use strict';

angular.module('dcuttUiApp')
  .controller('TimetableCtrl', function ($scope, $stateParams, $location, localStorageService, timetable) {

    var handler = function (e) {
      if (e.keyCode === 37) {
        $scope.onSwipeRight();
        $scope.$apply();
      }
      if (e.keyCode === 39) {
        $scope.onSwipeLeft();
        $scope.$apply();
      }
    };

    var $doc = angular.element(document);

    $doc.on('keydown', handler);
    $scope.$on('$destroy', function () {
      $doc.off('keydown', handler);
    });


    var timetableData = {};

    $scope.coursecode = $stateParams.coursecode.toUpperCase();

    timetable.get($stateParams.coursecode).then(
    	function (response) {
      	timetableData = response.data;
      	init(moment());
    	},
    	function() {
    		$scope.courseCodes();
    		alert("Error retriving timetable");
    	}
    );

    $scope.onSwipeLeft = function () {
      init(moment($scope.date, 'YYYY-MM-DD').add('d', 1));
    };

    $scope.onSwipeRight = function () {
      init(moment($scope.date, 'YYYY-MM-DD').subtract('d', 1));
    };

    var init = function (date) {
      $scope.date = date.format('YYYY-MM-DD');
      $scope.dayName = date.format('dddd');
      $scope.timetable = timetableData[date.valueOf()];
    };

    $scope.dateToTime = function (date) {
      date = moment(date);
      return date.format('hh:mm a');
    };

    $scope.courseCodes = function () {
      localStorageService.remove('COURSECODE');
      $location.path('/');
    };

  });
