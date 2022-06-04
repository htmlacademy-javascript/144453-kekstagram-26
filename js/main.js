function getRandomNumber (min, max) {
  if (0 <= min && 0 <= max) {
    return Math.round(Math.random() * (max - min) + min);
  } else {
    return 'введите чило больше нуля';
  }
}

getRandomNumber(0,5);

function checkMessageLength (message, maxDuration) {
  if (message.length <= maxDuration) {
    return true;
  } else {
    return false;
  }
}

checkMessageLength ('152',5);
