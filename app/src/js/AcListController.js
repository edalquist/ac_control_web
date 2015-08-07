(function(){

  angular
       .module('acController')
       .controller('AcListController', [
          'particleService', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$scope',
          AcListController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function AcListController( particleService
    , $mdSidenav, $mdBottomSheet, $log, $q, $scope) {
    var self = this;

    self.devices        = [ ];
    self.toggleMenu     = toggleMenuList;

    // self.acOff = true;
    // self.userAcOff = true;

    // $scope.$watch(function() { return self.userAcOff; }, update);
    // $scope.$watch(function() { return self.userTemp; }, update);
    // $scope.$watch(function() { return self.userMode; }, update);
    // $scope.$watch(function() { return self.userSpeed; }, update);

    // Load all registered devices

    particleService
          .loadAllDevices()
          .then( function( devices ) {
            devices = devices.data;
            self.devices    = [].concat(devices);
            console.log("loadAll", self.devices);
            // for (var i = 0; i < devices.length; i++) {
            //   if (devices[i].connected) {
            //     selectPhoton(devices[i]);
            //     break;
            //   }
            // }
          });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * First hide the bottomsheet IF visible, then
     * hide or Show the 'left' sideNav area
     */
    function toggleMenuList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    }

    // var timeoutID = null;
    // function update() {

    //   if (self.userTemp != undefined && self.userSpeed != undefined && self.userMode != undefined) {
    //     var state;
    //     if (self.userSpeed == "OFF" || self.userMode == "OFF") {
    //       self.userSpeed == "OFF";
    //       self.userMode == "OFF";
    //       state = "OFF";
    //     } else if (self.temp != self.userTemp || self.speed != self.userSpeed || self.mode != self.userMode) {
    //       state = self.userTemp + "," + self.userMode + "," + self.userSpeed;
    //     }

    //     if (timeoutID != null) {
    //       window.clearTimeout(timeoutID);
    //     }
    //     timeoutID = window.setTimeout(function() {
    //       doUpdate(self.selected, state);
    //     }, 2000);
    //     self.updating = true;
    //   }
    // }

    // function doUpdate(photon, state) {
    //   timeoutID = null;
    //   particleService.doUpdate(photon.id, state).then(function() {
    //     self.updating = false;
    //     selectPhoton(self.selected);
    //   });
    // }

    // /**
    //  * Select the current avatars
    //  * @param menuId
    //  */
    // function selectPhoton ( photon ) {
    //   self.selected = angular.isNumber(photon) ? $scope.devices[photon] : photon;
    //   particleService.loadPhotonStatus(photon.id).then(function (status) {
    //     var acStatus = JSON.parse(status.data.result);
    //     if (acStatus.temp == 0 && acStatus.fan == 'X' && acStatus.mode == 'X') {
    //       self.acOff = true;
    //     } else {
    //       self.acOff = false;
    //       self.temp = acStatus.temp;

    //       switch (acStatus.fan) {
    //         case "L":
    //           self.fan = "Low";
    //           break;
    //         case "M":
    //           self.fan = "Medium";
    //           break;
    //         case "H":
    //           self.fan = "High";
    //           break;
    //         case "A":
    //           self.fan = "Auto";
    //           break;
    //         default:
    //           self.fan = "Unknown";
    //           break;
    //       }

    //       switch (acStatus.mode) {
    //         case "F":
    //           self.mode = "Fan";
    //           break;
    //         case "E":
    //           self.mode = "Eco";
    //           break;
    //         case "C":
    //           self.mode = "Cool";
    //           break;
    //         default:
    //           self.mode = "Unknown";
    //           break;
    //       }

    //       if (self.userTemp != undefined || self.userSpeed != undefined || self.userMode != undefined) {
    //         self.userTemp = self.temp;
    //         self.userMode = self.mode;
    //         self.userSpeed = self.speed;
    //       }
    //     }
    //   });
    //   self.toggleUsersList();
    // }

    // /**
    //  * Show the bottom sheet
    //  */
    // function showContactOptions($event) {
    //     var photon = self.selected;

    //     return $mdBottomSheet.show({
    //       parent: angular.element(document.getElementById('content')),
    //       templateUrl: './src/devices/view/contactSheet.html',
    //       controller: [ '$mdBottomSheet', ContactPanelController],
    //       controllerAs: "cp",
    //       bindToController : true,
    //       targetEvent: $event
    //     }).then(function(clickedItem) {
    //       clickedItem && $log.debug( clickedItem.name + ' clicked!');
    //     });

    //     /**
    //      * Bottom Sheet controller for the Avatar Actions
    //      */
    //     function ContactPanelController( $mdBottomSheet ) {
    //       this.photon = photon;
    //       this.actions = [
    //         { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
    //         { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
    //         { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
    //         { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
    //       ];
    //       this.submitContact = function(action) {
    //         $mdBottomSheet.hide(action);
    //       };
    //     }
    // }

  }

})();
