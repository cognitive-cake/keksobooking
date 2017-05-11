'use strict';

window.map = (function () {
  var allOffers = [];
  var newOfferPin = window.data.pinMap.querySelector('.pin__main');

  newOfferPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clienY
    };
  });

  allOffers = window.data.createOffersArray(window.data.OFFERS_COUNT);
  window.pin.createDomPinsList(allOffers, window.data.OFFERS_COUNT);
  window.data.offerPins = window.data.pinMap.querySelectorAll('.pin:not(.pin__main)');
  window.pin.addEventsForPins();
  window.card.createDomDialogPanel(allOffers[0]);

  return {
    allOffers: allOffers
  };

})();
