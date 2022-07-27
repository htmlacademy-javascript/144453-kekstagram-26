import { effectsPreset } from './effects-preset.js';

const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const uploadImageContainer = document.querySelector('.img-upload__preview');
const uploadImage = uploadImageContainer.querySelector('img');
const effectLevel = document.querySelector('.effect-level__value');
let original = true;

const addSlider = function () {
  if (original) {
    noUiSlider.create(effectLevelSlider, {
      range: {
        min: 0,
        max: 100,
      },
      start: 1,
    });
    original = false;
  }
};


const getSliderOptions = function (effect) {
  let effectIndex = 0;
  effectsPreset.forEach((value, index) => {
    if (value.effect === effect) {
      effectIndex = index;
    }
  });
  return effectsPreset[effectIndex];
};


const setSlider = function (effect) {
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
    const filterName = sliderOptions.filter;
    const filterScale = effectLevelSlider.noUiSlider.get();
    uploadImage.style.filter = `${filterName}(${filterScale}${sliderOptions.format})`;
    effectLevel.value = filterScale;
  });
};

const setEffect = function (effect) {
  uploadImage.className = '';
  uploadImage.classList.add(`effects__preview--${effect}`);
};

const removEffects = function () {
  uploadImage.className = '';
  uploadImage.style.filter = '';
  effectLevel.value = '';
  if (!original) {
    effectLevelSlider.noUiSlider.destroy();
  }
  original = true;
};


effectsList.addEventListener('change', () => {
  const effectName = effectsList.querySelector(':checked').value;

  if (effectName === 'none') {
    removEffects();
  } else {
    addSlider();
    setEffect(effectName);
    setSlider(effectName);
  }

});

export { removEffects };
