'use strict';

angular.module('dcuttUiApp')
  .controller('TimetableCtrl', function ($scope, $stateParams, $location, localStorageService, timetable) {

    $scope.coursecode = $stateParams.coursecode.toUpperCase();

    timetable.get($stateParams.coursecode).then(
    	function (response) {
      	$scope.timetable = response.data;
    	},
    	function() {
    		$scope.courseCodes();
    		alert('Error retriving timetable');
    	}
    );

    $scope.prettyPrintDate = function (date) {
    	console.log(date);
      date = moment(Number(date));
      return date.format('YYYY-MM-DD');
    };

    $scope.dateToDayName = function (date) {
      date = moment(Number(date));
      return date.format('dddd');
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
