/*
При нажатии на кнопки .scale__control--smaller и .scale__control--bigger должно изменяться значение поля .scale__control--value;

Значение должно изменяться с шагом в 25. Например, если значение поля установлено в 50%, после нажатия на «+», значение должно стать равным 75%.
Максимальное значение — 100%, минимальное — 25%. Значение по умолчанию — 100%;

При изменении значения поля .scale__control--value изображению внутри .img-upload__preview должен добавляться соответствующий стиль CSS,
который с помощью трансформации scale задаёт масштаб. Например, если в поле стоит значение 75%, то в стиле изображения должно быть написано transform: scale(0.75).
*/

const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlValue = document.querySelector('.scale__control--value');
const uploadImageContainer = document.querySelector('.img-upload__preview');
const uploadImage = uploadImageContainer.querySelector('img');
let currentScale = 100;

const scaleReset = function(){
currentScale = 100;
scaleControlValue.value = currentScale + '%';
uploadImage.style.transform='scale('+currentScale/100+')';
}

const scaleChange = function (step) {
if (currentScale<=100 && 0<=currentScale){
  currentScale=currentScale+step;
  if (currentScale>100){currentScale=100};
  if (currentScale<20){currentScale=25}
  scaleControlValue.value = currentScale + '%';
  uploadImage.style.transform='scale('+currentScale/100+')';
}
};

const scaleUp = function (){
  scaleChange(25);
}

const scaleDown = function (){
  scaleChange(-25);
}

const addScaleControl = function (){
  scaleReset();
scaleControlBigger.addEventListener('click',scaleUp);
scaleControlSmaller.addEventListener('click',scaleDown);
};

const removeScaleControl = function (){
  scaleReset();
  scaleControlBigger.removeEventListener('click',scaleUp);
  scaleControlSmaller.removeEventListener('click',scaleDown);
  };


export {addScaleControl, removeScaleControl};
