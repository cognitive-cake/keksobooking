'use strict';

window.dataGeneration = (function () {

  // Генерация числа [min, max], включая предельные значения
  function getRandomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  return {
    getRandomInteger: getRandomInteger
  };

})();
