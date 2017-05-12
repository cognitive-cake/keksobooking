'use strict';

window.map = (function () {
  var allOffers = [];
  var newOfferPin = window.data.pinMap.querySelector('.pin__main');

  // Перетаскивание пина текущего заполняемого объявления
  newOfferPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clienY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      newOfferPin.style.top = (newOfferPin.offsetTop - shift.y) + 'px';
      newOfferPin.style.left = (newOfferPin.offsetLeft - shift.x) + 'px';
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  allOffers = window.data.createOffersArray(window.data.OFFERS_COUNT);
  window.pin.createDomPinsList(allOffers, window.data.OFFERS_COUNT);
  window.data.offerPins = window.data.pinMap.querySelectorAll('.pin:not(.pin__main)');
  window.pin.addEventsForPins();
  window.card.createDomDialogPanel(allOffers[0]);

  return {
    allOffers: allOffers,
    newOfferPin: newOfferPin
  };

})();
