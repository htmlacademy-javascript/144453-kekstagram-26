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

const getRandomUniqueId = function () {
  let currentId = getRandomNumber(0, 999999);
  let validate =true;
  while (validate) {
    validate=false;
    idArray.forEach ((value,index) => {
      if (currentId === idArray[index]) {
        currentId = getRandomNumber(0, 999999);
        validate =true;
      }});}
  idArray.push(currentId);
  return currentId;
};

function isEscapeKey (evt) {
  return evt.key === 'Escape';
}

export {getRandomNumber, checkMessageLength, getRandomArrayElement, getRandomUniqueId,isEscapeKey};
