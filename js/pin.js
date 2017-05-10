'use strict';

window.pin = (function () {

  // Создание единичной метки объявления для карты
  function createPin(object, count) {
    var pin = window.data.pinMap.querySelector('.pin').cloneNode(true);
    pin.classList.remove('pin__main');
    pin.style.left = (object.location.x + 28) + 'px'; // Добавление размеров метки для точного отображения. 28px - половина ширины pin.png
    pin.style.top = (object.location.y + 75) + 'px'; // 75px - высота pin.png
    pin.tabIndex = '0';
    pin.dataset.index = count;
    pin.getElementsByTagName('img')[0].src = object.author.avatar;
    pin.getElementsByTagName('img')[0].alt = 'Pin';
    pin.getElementsByTagName('img')[0].height = '40';
    return pin;
  }

  // Создание фрагмента с метками
  function createDomPinsList(array, count) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < count; i++) {
      fragment.appendChild(createPin(array[i], i));
    }
    window.data.pinMap.appendChild(fragment);
  }

// События, относящиеся к пинам
  function addEventsForPins() {

      // Подсветка пина и показ диалога
    function activatePin(evt) {
      var clickedPin = evt.currentTarget;
      var activePin = window.data.pinMap.querySelector('.pin--active');
      var clickedPinIndex = clickedPin.dataset.index;
      window.data.offerDialog.classList.remove('hidden');
      if (activePin) {
        activePin.classList.remove('pin--active');
      }
      window.card.createDomDialogPanel(window.map.allOffers[clickedPinIndex]);
      clickedPin.classList.add('pin--active');
    }


      // Закрытие диалога и снятие подсветки с пина
    function diactivatePin() {
      window.data.offerDialog.classList.add('hidden');
      var currentPin = window.data.pinMap.querySelector('.pin--active');
      currentPin.classList.remove('pin--active');
      document.removeEventListener('keydown', onDocumentKeydown);
      window.data.dialogClose.removeEventListener('click', onDialogCloseClick);
    }

      // Обработчик для Esc
    function onDocumentKeydown(evt) {
      if (isEscPressed(evt)) {
        diactivatePin();
      }
    }

      // Обработчик для крестика у диалога
    function onDialogCloseClick() {
      diactivatePin();
    }

      // Проверка клавиши Enter
    function isEnterPressed(evt) {
      return evt.keyCode === window.data.KEY_CODE_ENTER;
    }

      // Проверка клавиши Esc
    function isEscPressed(evt) {
      return evt.keyCode === window.data.KEY_CODE_ESC;
    }

    for (var i = 0; i < window.data.offerPins.length; i++) {
      window.data.offerPins[i].addEventListener('click', function (evt) {
        activatePin(evt);
        document.addEventListener('keydown', onDocumentKeydown);
        window.data.dialogClose.addEventListener('click', onDialogCloseClick);
      });
      window.data.offerPins[i].addEventListener('keydown', function (evt) {
        if (isEnterPressed(evt)) {
          activatePin(evt);
          document.addEventListener('keydown', onDocumentKeydown);
          window.data.dialogClose.addEventListener('click', onDialogCloseClick);
        }
      });
    }
  }

  return {
    createPin: createPin,
    createDomPinsList: createDomPinsList,
    addEventsForPins: addEventsForPins
  };

})();
