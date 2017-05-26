'use strict';
// Задача: написать универсальный модуль для синхронизации любых полей
window.synchronizeFields = function (firstField, secondField, firstArrayOfValues, secondArrayOfValues, syncMethod) {
  firstField.addEventListener('change', function (evt) {
    currentField = evt.currentTarget;
  });
};
