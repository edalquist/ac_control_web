(function(){
  'use strict';

  angular.module('photons')
         .service('photonService', ['$q', '$http', PhotonService]);
   
  /**
   * Photons DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function PhotonService($q, $http){
    // var Devices = $resource('https://api.particle.io/v1/devices/:deviceId/:variableOrFunction?access_token=' + at);

    // Promise-based API
    return {
      loadAllPhotons : function() {
        return $http.get('https://api.particle.io/v1/devices?access_token=' + at);
      },
      loadPhotonStatus : function(deviceId) {
        return $http.get('https://api.particle.io/v1/devices/' + deviceId + '/status?access_token=' + at);
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
