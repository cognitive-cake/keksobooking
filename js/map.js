'use strict';

var pinMap = document.querySelector('.tokyo__pin-map');
var offerDialog = document.querySelector('#offer-dialog');
var dialogTitle = offerDialog.querySelector('.dialog__title');
var dialogPanel = offerDialog.querySelector('.dialog__panel');
var dialogClose = offerDialog.querySelector('.dialog__close');
var allOffers = [];


var OFFERS_COUNT = 8;
var OFFER_TITLE = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var OFFER_HOUSE_TYPE = [
  'flat',
  'house',
  'bungalo'
];
var OFFER_TIME = [
  '12:00',
  '13:00',
  '14:00'
];
var KEY_CODE_ENTER = 13;
var KEY_CODE_ESC = 27;

// Генерация массива фич (случайной длины)
function getRandomFeatures() {
  var randomFeatures = [];
  var num = dataGeneration.getRandomInteger(0, OFFER_FEATURES.length - 1); // определяем количество фич в будущем массиве
  for (var i = 0; i < num; i++) {
    var value = OFFER_FEATURES[i];
    randomFeatures.push(value);
  }
  return randomFeatures;
}

// Генерация массива объявлений
function createOffersArray(count) {
  var offers = [];
  for (var i = 0; i < count; i++) {
    var locationX = dataGeneration.getRandomInteger(300, 900);
    var locationY = dataGeneration.getRandomInteger(100, 500);
    offers.push({
      location: {
        x: locationX,
        y: locationY
      },
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: OFFER_TITLE[i],
        address: locationX + ', ' + locationY,
        price: dataGeneration.getRandomInteger(1000, 1000000),
        type: OFFER_HOUSE_TYPE[dataGeneration.getRandomInteger(0, OFFER_HOUSE_TYPE.length - 1)],
        rooms: dataGeneration.getRandomInteger(1, 5),
        guests: dataGeneration.getRandomInteger(1, 10),
        checkin: OFFER_TIME[dataGeneration.getRandomInteger(0, OFFER_TIME.length - 1)],
        checkout: OFFER_TIME[dataGeneration.getRandomInteger(0, OFFER_TIME.length - 1)],
        features: getRandomFeatures(),
        description: '',
        photos: [],
      }
    });
  }
  return offers;
}

// Создание единичной метки объявления для карты
function createPin(object, count) {
  var pin = pinMap.querySelector('.pin').cloneNode(true);
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
  pinMap.appendChild(fragment);
}



// ------------------------------------ Pin events --------------------------------------

var offerPins = pinMap.querySelectorAll('.pin:not(.pin__main)');

// Подсветка пина и показ диалога
function activatePin(evt) {
  var clickedPin = evt.currentTarget;
  var activePin = pinMap.querySelector('.pin--active');
  var clickedPinIndex = clickedPin.dataset.index;
  offerDialog.classList.remove('hidden');
  if (activePin) {
    activePin.classList.remove('pin--active');
  }
  createDomDialogPanel(allOffers[clickedPinIndex]);
  clickedPin.classList.add('pin--active');
}


// Закрытие диалога и снятие подсветки с пина
function diactivatePin() {
  offerDialog.classList.add('hidden');
  var currentPin = pinMap.querySelector('.pin--active');
  currentPin.classList.remove('pin--active');
  document.removeEventListener('keydown', onDocumentKeydown);
  dialogClose.removeEventListener('click', onDialogCloseClick);
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
  return evt.keyCode === KEY_CODE_ENTER;
}

// Проверка клавиши Esc
function isEscPressed(evt) {
  return evt.keyCode === KEY_CODE_ESC;
}

for (var i = 0; i < offerPins.length; i++) {
  offerPins[i].addEventListener('click', function (evt) {
    activatePin(evt);
    document.addEventListener('keydown', onDocumentKeydown);
    dialogClose.addEventListener('click', onDialogCloseClick);
  });
  offerPins[i].addEventListener('keydown', function (evt) {
    if (isEnterPressed(evt)) {
      activatePin(evt);
      document.addEventListener('keydown', onDocumentKeydown);
      dialogClose.addEventListener('click', onDialogCloseClick);
    }
  });
}

// ---------------------------------- Pin events end ------------------------------------
