(function(){
  'use strict';

  angular.module('acController')
         .service('particleService', ['$q', '$http', ParticleService]);
   
  /**
   * Photons DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function ParticleService($q, $http){
    // var Devices = $resource('https://api.particle.io/v1/devices/:deviceId/:variableOrFunction?access_token=' + at);

    // Promise-based API
    return {
      loadAllDevices : function() {
        return $http.get('https://api.particle.io/v1/devices?access_token=' + at);
      },
      loadDeviceDetails : function(deviceId) {
        return $http.get('https://api.particle.io/v1/devices/' + deviceId + '/status?access_token=' + at);
      },
      loadDeviceVariable : function(deviceId, variable) {
        return $http.get('https://api.particle.io/v1/devices/' + deviceId + '/' + variable + '?access_token=' + at);
      },
      doUpdate : function(deviceId, state) {
        return $http({
          url: 'https://api.particle.io/v1/devices/' + deviceId + '/setState?access_token=' + at,
          method: "POST",
          data: "message=" + state,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      },
    };
  }

})();
