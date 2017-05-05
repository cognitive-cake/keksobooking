'use strict';

window.cardCreate = (function () {
  var offerDialog = document.querySelector('#offer-dialog');
  var dialogTitle = offerDialog.querySelector('.dialog__title');
  var dialogPanel = offerDialog.querySelector('.dialog__panel');
  var lodgeTemplate = document.querySelector('#lodge-template');
  var allOffers = [];
  var typeDescriptions = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };


  // Создание фрагмента для dialog__panel
  function createDomDialogPanel(object) {
    var template = lodgeTemplate.content.cloneNode(true);
    var featuresForDom = '';

    template.querySelector('.lodge__title').textContent = object.offer.title;
    template.querySelector('.lodge__address').textContent = object.offer.address;
    template.querySelector('.lodge__price').textContent = object.offer.price + ' ' + '\u20BD' + '/ночь';
    template.querySelector('.lodge__type').textContent = typeDescriptions[object.offer.type];
    template.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + object.offer.guests + ' гостей в ' + object.offer.rooms + ' комнатах';
    template.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до' + object.offer.checkout;

    for (var i = 0; i < object.offer.features.length; i++) {
      featuresForDom += '<span class="feature__image feature__image--' + object.offer.features[i] + '"></span>';
    }

    template.querySelector('.lodge__features').innerHTML = featuresForDom;
    template.querySelector('.lodge__description').textContent = object.offer.description;
    dialogTitle.getElementsByTagName('img')[0].src = object.author.avatar;

    dialogPanel = offerDialog.querySelector('.dialog__panel');
    offerDialog.replaceChild(template, dialogPanel);
  }

  allOffers = createOffersArray(OFFERS_COUNT);
  createDomPinsList(allOffers, OFFERS_COUNT);
  return  createDomDialogPanel(allOffers[0]);

})();
