'use strict';

var pinMap = document.querySelector('.tokyo__pin-map');
var offerDialog = document.querySelector('#offer-dialog');
var dialogTitle = offerDialog.querySelector('.dialog__title');
var dialogPanel = offerDialog.querySelector('.dialog__panel');
var dialogClose = offerDialog.querySelector('.dialog__close');
var lodgeTemplate = document.querySelector('#lodge-template');
var allOffers = [];
var typeDescriptions = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом'
};

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

// Генерация числа [min, max], включая предельные значения
function getRandomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

// Генерация массива фич (случайной длины)
function getRandomFeatures() {
  var randomFeatures = [];
  var num = getRandomInteger(0, OFFER_FEATURES.length - 1); // определяем количество фич в будущем массиве
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
    var locationX = getRandomInteger(300, 900);
    var locationY = getRandomInteger(100, 500);
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
        price: getRandomInteger(1000, 1000000),
        type: OFFER_HOUSE_TYPE[getRandomInteger(0, OFFER_HOUSE_TYPE.length - 1)],
        rooms: getRandomInteger(1, 5),
        guests: getRandomInteger(1, 10),
        checkin: OFFER_TIME[getRandomInteger(0, OFFER_TIME.length - 1)],
        checkout: OFFER_TIME[getRandomInteger(0, OFFER_TIME.length - 1)],
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
createDomDialogPanel(allOffers[0]);

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

// --------------------------------------- Form -----------------------------------------

var form = document.querySelector('.notice__form');
var title = form.querySelector('#title');
var type = form.querySelector('#type');
var price = form.querySelector('#price');
var roomNumber = form.querySelector('#room_number');
var capacity = form.querySelector('#capacity');
var description = form.querySelector('#description');
var newNoticeAddress = form.querySelector('#address');
var time = form.querySelector('#time');
var timeout = form.querySelector('#timeout');

var houseTypeValues = ['Квартира', 'Лачуга', 'Дворец'];
var priceMinValues = ['1000', '0', '10000'];
var roomNumberValues = ['1 комната', '2 комнаты', '100 комнат'];
var roomCapacityValues = ['не для гостей', 'для 3 гостей', 'для 3 гостей']; // Пришло в голову такое решение. С повторением значений. Это допустимое решение? Или костыль? =)

// Установка зависимости минимальной цены от типа жилья
function changePrice(evt) {
  var currentSelect = evt.currentTarget;
  for (i = 0; i < houseTypeValues.length; i++) {
    if (currentSelect.value === houseTypeValues[i]) {
      price.min = priceMinValues[i];
    }
  }
}

// Установка зависимости кол-ва гостей от кол-ва комнат
function changeCapacity(evt) {
  var currentSelect = evt.currentTarget;
  for (i = 0; i < roomNumberValues.length; i++) {
    if (currentSelect.value === roomNumberValues[i]) {
      capacity.value = roomCapacityValues[i];
    }
  }
}

// Установка зависимости кол-ва комнат от кол-ва гостей
function changeRooms(evt) {
  var currentSelect = evt.currentTarget;
  for (i = 0; i < roomCapacityValues.length; i++) {
    if (currentSelect.value === roomCapacityValues[i]) { // Здесь не получилось придумать ничего лучше. Если выбрать "для 3 гостей", то if выполнится 2 раза: сначала поставит '2 комнаты', а затем '100 комнат'. Не знаю, насколько допустимо такое поведение.
      roomNumber.value = roomNumberValues[i];
    }
  }
}

// Установка одинакового времени заезда и выезда
function changeTime(evt, anotherSelect) {
  var currentSelect = evt.currentTarget;
  for (i = 0; i < currentSelect.options.length; i++) {
    if (currentSelect.options[i].selected) {
      anotherSelect.selectedIndex = i;
    }
  }
}

// Подсветка invalid-полей
function markInvalidField(evt) {
  var invalidField = evt.currentTarget;
  if (invalidField.validity.valid) {
    invalidField.classList.remove('error');
  } else {
    invalidField.classList.add('error');
  }
}

// Проверка валидности цены после изменения типа жилья
function checkPriceValidity() {
  if (price.checkValidity()) {
    price.classList.remove('error');
  } else {
    price.classList.add('error');
  }
}

// Возврат полям значений по-умолчанию
function returnDefaultValues() {
  title.value = '';
  type.value = houseTypeValues[0];
  price.value = '';
  roomNumber.value = roomCapacityValues[0];
  capacity.value = roomCapacityValues[0];
  description.value = '';
  newNoticeAddress.value = '';
  time.selectedIndex = 0;
  timeout.selectedIndex = 0;
}

form.addEventListener('submit', function () {
  returnDefaultValues();
});
title.addEventListener('input', function (evt) {
  markInvalidField(evt);
});
type.addEventListener('change', function (evt) {
  changePrice(evt);
  checkPriceValidity();
});
price.addEventListener('input', function (evt) {
  markInvalidField(evt);
});
roomNumber.addEventListener('change', function (evt) {
  changeCapacity(evt);
});
capacity.addEventListener('change', function (evt) {
  changeRooms(evt);
});
time.addEventListener('change', function (evt) {
  changeTime(evt, timeout);
});
timeout.addEventListener('change', function (evt) {
  changeTime(evt, time);
});

// ------------------------------------- Form end ---------------------------------------
