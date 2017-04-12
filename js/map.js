'use strict';
debugger;
var pinMap = document.querySelector('.tokyo__pin-map');
var offerDialog = document.querySelector('#offer-dialog');
var dialogTitle = offerDialog.querySelector('.dialog__title');
var dialogPanel = offerDialog.querySelector('.dialog__panel');
var lodgeTemplate = document.querySelector('#lodge-template');
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
  'wi-fi',
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

var singleOffer = {
  author: author,
  offer: offer,
  location: location
};
var author = {
  avatar: '',
};
var offer = {
  title: '',
  address: '',
  price: '',
  type: '',
  rooms: '',
  guests: '',
  checkin: '',
  checkout: '',
  features: [],
  description: '',
  photos: [],
};
var location = {
  x: '',
  y: ''
};

// Генерация числа [min, max], включая предельные значения
function getRandomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

// Генерация числа [min, max), не включая максимум
function getRandomIntegerWithoutMax(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Интересно, насколько сильно нагружают браузер 2 следующих функции?
// Мммм... мне кажется, что потенциально циклы for могут выполняться ооооочень долго в этих функциях.
// Но я ничего лучше не смог придумать =|.

// Генерация случайного номера аватарки без повторения
function getRandomAvatar(max) {
  var string = 'img/avatars/user0' + getRandomInteger(1, max) + '.png';
  for (var i = 0; i < allOffers.length; i++) {
    if (allOffers[i].author.avatar === string) {
      string = 'img/avatars/user0' + getRandomInteger(1, max) + '.png';
      i = -1;
      continue;
    }
  }
  return string;
}

// Выбор случайного заголовка без повторения
function getRandomTitle(max) {
  var string = OFFER_TITLE[getRandomIntegerWithoutMax(0, max)];
  for (var i = 0; i < allOffers.length; i++) {
    if (allOffers[i].offer.title === string) {
      string = OFFER_TITLE[getRandomIntegerWithoutMax(0, max)];
      i = -1;
      continue;
    }
  }
  return string;
}

// Генерация массива фич (случайной длины)
function getRandomFeatures(array) {
  var num = getRandomIntegerWithoutMax(0, OFFER_FEATURES.length); // определяем количество фич в будущем массиве
  for (var i = 0; i < num; i++) {
    var value = OFFER_FEATURES[getRandomIntegerWithoutMax(0, OFFER_FEATURES.length)];
    array.push(value);
  }
  return array;
}

// Генерация единичного объявления о сдаче жилья
function createSingleOffer() {
  singleOffer.author.avatar = getRandomAvatar(OFFERS_COUNT);
  singleOffer.offer.title = getRandomTitle(OFFERS_COUNT);
  singleOffer.location.x = getRandomInteger(300, 900);
  singleOffer.location.y = getRandomInteger(100, 500);
  singleOffer.offer.address = singleOffer.location.x + ', ' + singleOffer.location.y;
  singleOffer.offer.price = getRandomInteger(1000, 1000000);
  singleOffer.offer.type = OFFER_HOUSE_TYPE[getRandomIntegerWithoutMax(0, OFFER_HOUSE_TYPE.length)];
  singleOffer.offer.rooms = getRandomInteger(1, 5);
  singleOffer.offer.guests = getRandomInteger(1, 10);
  singleOffer.offer.checkin = OFFER_TIME[getRandomIntegerWithoutMax(0, OFFER_TIME.length)];
  singleOffer.offer.checkout = OFFER_TIME[getRandomIntegerWithoutMax(0, OFFER_TIME.length)];
  singleOffer.offer.features = getRandomFeatures(singleOffer.offer.features);
  return singleOffer;
}

// Генерация массива объявлений
function createOffersArray(array, count) {
  for (var i = 0; i < count; i++) {
    var value = createSingleOffer();
    array.push(value);
  }
  return array;
}

// Создание единичной метки объявления для карты
function createPin(count) {
  var pin = pinMap.querySelector('.pin').cloneNode(true);
  pin.style.left = allOffers[count].singleOffer.location.x + 28;
  pin.style.top = allOffers[count].singleOffer.location.y + 75;
  pin.getElementsByTagName('img').src = allOffers[count].singleOffer.author.avatar;
  pin.getElementsByTagName('img').alt = 'Pin';
  pin.getElementsByTagName('img').height = '40';
  return pin;
}

// Создание фрагмента с метками
function createDomPinsList(count) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < count; i++) {
    fragment.appendChild(createPin(i));
  }
  pinMap.appendChild(fragment);
}

// Создание фрагмента для dialog__panel
function createDomDialogPanel(number) {
  var template = lodgeTemplate.cloneNode(true);
  var currentType = allOffers[number].offer.type;
  var currentFeatures = allOffers[number].offer.features;
  var featuresForDom = '';

  template.querySelector('.lodge__title').textContent = allOffers[number].offer.title;
  template.querySelector('.lodge__address').textContent = allOffers[number].offer.address;
  template.querySelector('.lodge__price').textContent = allOffers[number].offer.price + ' ' + '&#x20bd;/ночь';

  if (currentType === 'flat') {
    template.querySelector('.lodge__type').textContent = 'Квартира';
  } else if (currentType === 'bungalo') {
    template.querySelector('.lodge__type').textContent = 'Бунгало';
  } else {
    template.querySelector('.lodge__type').textContent = 'Дом';
  }

  template.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + allOffers[number].offer.guests + ' гостей в ' + allOffers[number].offer.rooms + ' комнатах';
  template.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + allOffers[number].offer.checkin + ', выезд до' + allOffers[number].offer.checkout;

  for (var i = 0; i < currentFeatures.length; i++) {
    featuresForDom += '<span class="feature__image feature__image--' + currentFeatures[i] + '">';
  }

  template.querySelector('.lodge__features').innerHTML = featuresForDom;
  template.querySelector('.lodge__description').textContent = allOffers[number].offer.description;
  dialogTitle.getElementsByTagName('img').src = allOffers[number].author.avatar;

  offerDialog.replaceChild(template, dialogPanel);
}


createOffersArray(allOffers, OFFERS_COUNT);
createDomPinsList(OFFERS_COUNT);
createDomDialogPanel(0);
