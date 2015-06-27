'use strict';

angular.module('dcuttUiApp')
  .factory('courseCode', function ($http, promiseCache, ENV) {
    return {
      get: function () {
        return promiseCache({
          promise: function () {
            return $http.get(ENV.apiEndpoint + '/coursecode');
          },
          ttl: 259200000,
          localStorageEnabled: true,
          localStorageKey: 'DCUTT.COURSECODES',
          expireOnFailure: function (request) {
            return request.status !== 200;
          }
        });
      }
    };
  });
