'use strict';

window.map = (function () {
  var allOffers = [];

  allOffers = window.data.createOffersArray(window.data.OFFERS_COUNT);
  window.pin.createDomPinsList(allOffers, window.data.OFFERS_COUNT);
  window.data.offerPins = window.data.pinMap.querySelectorAll('.pin:not(.pin__main)');
  window.pin.addEventsForPins();
  window.card.createDomDialogPanel(allOffers[0]);

  return {
    allOffers: allOffers
  };

})();
