'use strict';

angular.module('dcuttUiApp')
  .controller('CourseSelectorCtrl', function ($scope, $location, courseCode, localStorageService) {
    courseCode.get().then(function (response) {
      $scope.courseCodes = response.data;
    });

    $scope.selectCourse = function (courseCode) {
      localStorageService.set('COURSECODE', courseCode);
      $location.path('timetable/' + courseCode);
    };
  });
