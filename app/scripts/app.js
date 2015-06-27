'use strict';

angular
  .module('dcuttUiApp', ['ionic', 'LocalStorageModule', 'angular-promise-cache'])

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, localStorageServiceProvider) {

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/courseSelector.html',
        controller: 'CourseSelectorCtrl',
        resolve: {
          'check': function ($location, localStorageService) {
            if (localStorageService.get('COURSECODE')) {
              $location.path('/timetable/' + localStorageService.get('COURSECODE'));
            }
          }
        }
      })
      .state('timetable', {
        url: '/timetable/:coursecode',
        templateUrl: 'views/timetable.html',
        controller: 'TimetableCtrl'
      });

    $urlRouterProvider.otherwise('/');
    $ionicConfigProvider.backButton
      .text('')
      .previousTitleText(false)
      .icon('ion-arrow-left-c');

    $ionicConfigProvider.navBar
      .alignTitle('center');

    localStorageServiceProvider.setPrefix('DCUTT');

  })

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });
