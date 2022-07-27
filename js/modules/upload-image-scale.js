const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlValue = document.querySelector('.scale__control--value');
const uploadImageContainer = document.querySelector('.img-upload__preview');
const uploadImage = uploadImageContainer.querySelector('img');
let currentScale = 100;

const scaleReset = function () {
  currentScale = 100;
  scaleControlValue.value = `${currentScale}%`;
  uploadImage.style.transform = `scale(${currentScale / 100})`;
};

const scaleChange = function (step) {
  if (currentScale <= 100 && 0 <= currentScale) {
    currentScale = currentScale + step;
    if (currentScale > 100) { currentScale = 100; }
    if (currentScale < 20) { currentScale = 25; }
    scaleControlValue.value = `${currentScale}%`;
    uploadImage.style.transform = `scale(${currentScale / 100})`;
  }
};

const scaleUp = function () {
  scaleChange(25);
};

const scaleDown = function () {
  scaleChange(-25);
};

const addScaleControl = function () {
  scaleReset();
  scaleControlBigger.addEventListener('click', scaleUp);
  scaleControlSmaller.addEventListener('click', scaleDown);
};

const removeScaleControl = function () {
  scaleReset();
  scaleControlBigger.removeEventListener('click', scaleUp);
  scaleControlSmaller.removeEventListener('click', scaleDown);
};


export { addScaleControl, removeScaleControl };
