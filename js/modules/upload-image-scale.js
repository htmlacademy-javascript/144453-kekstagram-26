const SCALE_STEP_VALUE = 25;
const SCALE_MAX_VALUE = 100;
const SCALE_MIN_VALUE = 25;

const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlValue = document.querySelector('.scale__control--value');
const uploadImageContainer = document.querySelector('.img-upload__preview');
const uploadImage = uploadImageContainer.querySelector('img');
let currentScale = SCALE_MAX_VALUE;

const resetScale = function () {
  currentScale = SCALE_MAX_VALUE;
  scaleControlValue.value = `${currentScale}%`;
  uploadImage.style.transform = `scale(${currentScale / 100})`;
};

const changeScale = function (step) {
  currentScale = currentScale + step;
  if (currentScale > SCALE_MAX_VALUE) { currentScale = SCALE_MAX_VALUE; }
  if (currentScale < SCALE_MIN_VALUE) { currentScale = SCALE_MIN_VALUE; }
  scaleControlValue.value = `${currentScale}%`;
  uploadImage.style.transform = `scale(${currentScale / 100})`;
};

const onScaleUpButtonClick = function () {
  changeScale(SCALE_STEP_VALUE);
};

const onScaleDownButtonClick = function () {
  changeScale(SCALE_STEP_VALUE*(-1));
};

const addScaleControl = function () {
  resetScale();
  scaleControlBigger.addEventListener('click', onScaleUpButtonClick);
  scaleControlSmaller.addEventListener('click', onScaleDownButtonClick);
};

const removeScaleControl = function () {
  resetScale();
  scaleControlBigger.removeEventListener('click', onScaleUpButtonClick);
  scaleControlSmaller.removeEventListener('click', onScaleDownButtonClick);
};


export { addScaleControl, removeScaleControl };
