'use strict';

window.data = (function () {

  var OFFER_FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
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

  // Генерация числа [min, max], включая предельные значения
  function getRandomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  // Генерация массива фич (случайной длины)
  function getRandomFeatures() {
    var randomFeatures = [];
    var num = window.data.getRandomInteger(0, OFFER_FEATURES.length - 1); // определяем количество фич в будущем массиве
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
      var locationX = window.data.getRandomInteger(300, 900);
      var locationY = window.data.getRandomInteger(100, 500);
      offers.push({
        location: {
          x: locationX,
          y: locationY
        },
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: window.data.OFFER_TITLE[i],
          address: locationX + ', ' + locationY,
          price: window.data.getRandomInteger(1000, 1000000),
          type: window.data.OFFER_HOUSE_TYPE[window.data.getRandomInteger(0, window.data.OFFER_HOUSE_TYPE.length - 1)],
          rooms: window.data.getRandomInteger(1, 5),
          guests: window.data.getRandomInteger(1, 10),
          checkin: window.data.OFFER_TIME[window.data.getRandomInteger(0, window.data.OFFER_TIME.length - 1)],
          checkout: window.data.OFFER_TIME[window.data.getRandomInteger(0, window.data.OFFER_TIME.length - 1)],
          features: window.data.getRandomFeatures(),
          description: '',
          photos: [],
        }
      });
    }
    return offers;
  }

  return {
    getRandomInteger: getRandomInteger,
    getRandomFeatures: getRandomFeatures,
    createOffersArray: createOffersArray,
    KEY_CODE_ENTER: 13,
    KEY_CODE_ESC: 27,
    OFFERS_COUNT: 8,
    OFFER_FEATURES: OFFER_FEATURES,
    OFFER_TITLE: OFFER_TITLE,
    OFFER_HOUSE_TYPE: OFFER_HOUSE_TYPE,
    OFFER_TIME: OFFER_TIME
  };

})();
