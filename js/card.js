'use strict';

window.card = (function () {

  // Создание фрагмента для dialog__panel
  function createDomDialogPanel(object) {
    var template = window.data.lodgeTemplate.content.cloneNode(true);
    var featuresForDom = '';

    template.querySelector('.lodge__title').textContent = object.offer.title;
    template.querySelector('.lodge__address').textContent = object.offer.address;
    template.querySelector('.lodge__price').textContent = object.offer.price + ' ' + '\u20BD' + '/ночь';
    template.querySelector('.lodge__type').textContent = window.data.typeDescriptions[object.offer.type];
    template.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + object.offer.guests + ' гостей в ' + object.offer.rooms + ' комнатах';
    template.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до' + object.offer.checkout;

    for (var i = 0; i < object.offer.features.length; i++) {
      featuresForDom += '<span class="feature__image feature__image--' + object.offer.features[i] + '"></span>';
    }

    template.querySelector('.lodge__features').innerHTML = featuresForDom;
    template.querySelector('.lodge__description').textContent = object.offer.description;
    window.data.dialogTitle.getElementsByTagName('img')[0].src = object.author.avatar;

    window.data.dialogPanel = window.data.offerDialog.querySelector('.dialog__panel');
    window.showCard(template, window.data.dialogPanel);
  }

  return {
    createDomDialogPanel: createDomDialogPanel
  };

})();
