(function(){
  'use strict';

  angular.module('photons')
         .service('photonService', ['$q', '$resource', '$http', PhotonService]);
   
  /**
   * Photons DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function PhotonService($q, $resource, $http){
    var Devices = $resource('https://api.particle.io/v1/devices/:deviceId/:variableOrFunction?access_token=ebfcf478455634155e16294005ccc47e349e2f63');

    // Promise-based API
    return {
      loadAllPhotons : function() {
        return Devices.query().$promise;
      },
      loadPhotonStatus : function(deviceId) {
        return Devices.get({deviceId:deviceId, variableOrFunction:'status'}).$promise;
      },
      doUpdate : function(deviceId, state) {
        return $http({
          url: 'https://api.particle.io/v1/devices/' + deviceId + '/setState?access_token=ebfcf478455634155e16294005ccc47e349e2f63',
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
