(function(){

  var FAN_SPEEDS = {
    '?': {name: "Invalid", code: "INVALID"},
    X: {name: "Off", code: "OFF"},
    L: {name: "Low", code: "FAN_LOW"},
    M: {name: "Medium", code: "FAN_MEDIUM"},
    H: {name: "High", code: "FAN_HIGH"},
    A: {name: "Auto", code: "FAN_AUTO"}
  }

  var AC_MODES = {
    '?': {name: "Invalid", code: "INVALID"},
    X: {name: "Off", code: "OFF"},
    F: {name: "Fan", code: "MODE_FAN"},
    E: {name: "Eco", code: "MODE_ECO"},
    C: {name: "Cool", code: "MODE_COOL"}
  }

  angular
       .module('acController')
       .directive('acCard', function() {
        return {
          scope: {
            device: '=device'
          },
          restrict: 'E',
          templateUrl: 'src/AcCard/AcCardTemplate.html',
          replace: true,
          controller: 'AcCardController',
          controllerAs: 'ctrl'
        };
      })
       .controller('AcCardController', [
          '$scope', '$log', '$interval', 'particleService',
          AcCardController
       ]);

  function AcCardController($scope, $log, $interval, $particleService) {
    var self = this;

    // State variables
    self.state = "offline";
    self.temp = -1;
    self.fan = FAN_SPEEDS['?'];
    self.mode = AC_MODES['?'];

    /*
    TODO 
    for connected setup poller for status
      if status poll fails poll device
    for !connected setup poller for device
    */

    // If the device is connected try to fetch the status
    if ($scope.device.connected) {
      loadStatus();
    }

    self.powerToggle = function() {
      self.loading = true;
      if (self.state == "off") {
        $particleService.doUpdate($scope.device.id, 'ON')['finally'](function() {
          loadStatus();
        });
        $log.debug("on");
      } else {
        $particleService.doUpdate($scope.device.id, 'OFF')['finally'](function() {
          loadStatus();
        });
        $log.debug("off");
      }
    };

    self.tempRange = function() {
      // TODO filter by AC version
      var temps = [];
      for (var t = 60; t < 90; t++) {
        temps.push(t);
      }
      return temps;
    }

    self.fanSpeeds = function() {
      // TODO filter by AC version
      return [FAN_SPEEDS.L, FAN_SPEEDS.H, FAN_SPEEDS.A];
    }

    self.acModes = function() {
      // TODO filter by AC version
      return [AC_MODES.F, AC_MODES.E, AC_MODES.C];
    }

    var timeoutID = null;
    self.update = function() {
      var state = "";
      var changed = false;

      if (self.temp != self.newTemp) {
        changed = true;
        state += self.newTemp;
      } else {
        state += self.temp;
      }

      state += ",";
      if (self.mode.code != self.newMode) {
        changed = true;
        state += self.newMode;
      } else {
        state += self.mode.code;
      }

      state += ",";
      if (self.fan.code != self.newFan) {
        changed = true;
        state += self.newFan;
      } else {
        state += self.fan.code;
      }

      if (timeoutID != null) {
        window.clearTimeout(timeoutID);
        if (!changed) {
          self.loading = false;
        }
      }

      if (changed) {
        timeoutID = window.setTimeout(function() {
          doUpdate(state);
        }, 2000);
        self.loading = true;
      }
    }

    function doUpdate(state) {
      timeoutID = null;
      $particleService.doUpdate($scope.device.id, state)['finally'](function() {
        loadStatus();
      });
    }

    function loadStatus() {
        self.loading = true;

        //Gets the device details
        $particleService.loadDeviceVariable($scope.device.id, 'status').then( function( response ) {
          $log.debug(response);

          // No longer loading, parse out the status
          self.lastHeard = new Date(response.data.coreInfo.last_heard);

          // Parse out the state
          var acStatus;
          try {
            acStatus = JSON.parse(response.data.result);
          } catch (e) {
            // TODO unknown state
            acStatus = {temp: -1, fan: '?', mode: '?'};
          }

          self.temp = acStatus.temp;
          self.fan = FAN_SPEEDS[acStatus.fan];
          self.mode = AC_MODES[acStatus.mode];

          self.newTemp = self.temp;
          self.newFan = self.fan.code;
          self.newMode = self.mode.code;

          if (self.fan.code == "INVALID" || self.mode.code == "INVALID") {
            self.state = "unknown";
          } else if (self.fan.code == "OFF" || self.mode.code == "OFF") {
            self.state = "off";
          } else {
            self.state = "on";
          }
        })['finally'](function() {
          self.loading = false;
        });
    }
  }
})();