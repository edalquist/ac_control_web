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

    self.toggleMenu     = toggleMenuList;
    self.devices        = [ ];

    // Load all registered devices
    particleService
          .loadAllDevices()
          .then( function( devices ) {
            devices = devices.data;
            self.devices    = [].concat(devices);
            self.toggleMenu     = toggleMenuList;
            console.log("loadAll", self.devices);
          });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * First hide the bottomsheet IF visible, then
     * hide or Show the 'left' sideNav area
     */
    function toggleMenuList() {
        $log.debug("toggle menu");
      // var pending = $mdBottomSheet.hide() || $q.when(true);

      // pending.then(function(){
        $mdSidenav('left').toggle();
      // });
    }

    

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
