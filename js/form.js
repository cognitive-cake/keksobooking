'use strict';

window.formLogic = (function () {
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
  var roomCapacityValues = ['не для гостей', 'для 3 гостей', 'для 3 гостей'];

  // Установка зависимости минимальной цены от типа жилья
  function changePrice(evt) {
    var currentSelect = evt.currentTarget;
    for (var i = 0; i < houseTypeValues.length; i++) {
      if (currentSelect.value === houseTypeValues[i]) {
        price.min = priceMinValues[i];
      }
    }
  }

  // Установка зависимости кол-ва гостей от кол-ва комнат
  function changeCapacity(evt) {
    var currentSelect = evt.currentTarget;
    for (var i = 0; i < roomNumberValues.length; i++) {
      if (currentSelect.value === roomNumberValues[i]) {
        capacity.value = roomCapacityValues[i];
      }
    }
  }

  // Установка зависимости кол-ва комнат от кол-ва гостей
  function changeRooms(evt) {
    var currentSelect = evt.currentTarget;
    for (var i = 0; i < roomCapacityValues.length; i++) {
      if (currentSelect.value === roomCapacityValues[i]) {
        roomNumber.value = roomNumberValues[i];
      }
    }
  }

  // Установка одинакового времени заезда и выезда
  function changeTime(evt, anotherSelect) {
    var currentSelect = evt.currentTarget;
    for (var i = 0; i < currentSelect.options.length; i++) {
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

  return {
    returnDefaultValues: returnDefaultValues
  };

})();
