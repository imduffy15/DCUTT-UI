'use strict';

angular.module('dcuttUiApp')
  .factory('timetable', function ($http, promiseCache, ENV) {
    return {
      get: function (courseCode) {
        return promiseCache({
          promise: function () {
            return $http.get(ENV.apiEndpoint + '/timetable/' + courseCode);
          },
          ttl: 259200000,
          localStorageEnabled: true,
          localStorageKey: 'DCUTT.' + courseCode.toUpperCase(),
          key: courseCode,
          expireOnFailure: function (request) {
            return request.status !== 200;
          }
        });
      }
    };
  });
