
/*
. Наложение эффекта на изображение:

По умолчанию должен быть выбран эффект «Оригинал».
На изображение может накладываться только один эффект.
При смене эффекта, выбором одного из значений среди радиокнопок .effects__radio, добавить картинке внутри .img-upload__preview CSS-класс, соответствующий эффекту.
Например, если выбран эффект .effect-chrome, изображению нужно добавить класс effects__preview--chrome.

Интенсивность эффекта регулируется перемещением ползунка в слайдере. Слайдер реализуется сторонней библиотекой для реализации слайдеров noUiSlider.
Уровень эффекта записывается в поле .effect-level__value. При изменении уровня интенсивности эффекта (предоставляется API слайдера),
CSS-стили картинки внутри .img-upload__preview обновляются следующим образом:
Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
Для эффекта «Оригинал» CSS-стили filter удаляются.
При выборе эффекта «Оригинал» слайдер скрывается.
При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%): слайдер, CSS-стиль изображения и значение поля должны обновляться.
*/
import {effectsPreset,effectsPreset2} from './effects-preset.js';

const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const uploadImageContainer = document.querySelector('.img-upload__preview');
const uploadImage =uploadImageContainer.querySelector('img');
const effectLevel = document.querySelector('.effect-level__value');
let original = true;

const addSlider = function(){
if (original){
  noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 1,
})
original = false;
};

};




const getSliderOptions = function(effect){
  let effectIndex = 0;
  effectsPreset.forEach((value,index)=>{
    if (value.effect === effect){
      effectIndex = index;
    }
  });
return effectsPreset[effectIndex];

}


const setSlider = function (effect){

const sliderOptions = getSliderOptions(effect);

  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: sliderOptions.min,
      max: sliderOptions.max
    },
    start: sliderOptions.max,
    step: sliderOptions.step,
  format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
  }

  });

  effectLevelSlider.noUiSlider.on('update', () => {
    let filterName = sliderOptions.filter;
    let filterScale = effectLevelSlider.noUiSlider.get();

    uploadImage.style.filter=filterName+'('+filterScale+sliderOptions.format+')';
    effectLevel.value = filterScale;
    console.log(effectLevel.value);
  });
}

const setEffect = function(effect){
  uploadImage.className = '';
  uploadImage.classList.add('effects__preview--' + effect);
}

const removEffects = function(){
  uploadImage.className = '';
  effectLevelSlider.noUiSlider.destroy();
  original = true;
  uploadImage.style.filter='';
}




effectsList.addEventListener('change', ()=>{
  const effectName = effectsList.querySelector(':checked').value;

if (effectName === 'none'){
  removEffects();
}else{
  addSlider();
    setEffect(effectName);
  setSlider(effectName);
}

})
