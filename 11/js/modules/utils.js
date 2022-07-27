function getRandomNumber(min, max) {
  if (0 <= min && 0 <= max) {
    return Math.round(Math.random() * (max - min) + min);
  } else {
    return 'введите чило больше нуля';
  }
}


function checkMessageLength(message, maxDuration) {
  if (message.length <= maxDuration) {
    return true;
  } else {
    return false;
  }
}


function getRandomArrayElement(element) {
  return element[getRandomNumber(0, element.length - 1)];
}


const idArray = [];
const numbersArray = [];

const getRandomUniqueId = function () {
  let currentId = getRandomNumber(0, 999999);
  let validate = true;
  while (validate) {
    validate = false;
    idArray.forEach((value, index) => {
      if (currentId === idArray[index]) {
        currentId = getRandomNumber(0, 999999);
        validate = true;
      }
    });
  }
  idArray.push(currentId);
  return currentId;
};

function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

const getRandomUniqueNumber = function (min, max) {
  let currentNumber = getRandomNumber(min, max);
  let validate = true;
  while (validate) {
    validate = false;
    numbersArray.forEach((value, index) => {
      if (currentNumber === numbersArray[index]) {
        currentNumber = getRandomNumber(min, max);
        validate = true;
      }
    });
  }
  numbersArray.push(currentNumber);
  return currentNumber;
};

function getRandomArray() {
  return Array(10).fill().map(() => (
    getRandomUniqueNumber(0, 24)
  ));
}

function debounce(callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export { getRandomNumber, checkMessageLength, getRandomArray, getRandomArrayElement, getRandomUniqueId, isEscapeKey, debounce };
