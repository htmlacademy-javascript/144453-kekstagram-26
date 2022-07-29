import { effectsPresets } from './effects-presets.js';

const effectLevelSliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const uploadImageContainer = document.querySelector('.img-upload__preview');
const uploadImage = uploadImageContainer.querySelector('img');
const effectLevel = document.querySelector('.effect-level__value');
let originalEffect = true;

const addSlider = function () {
  effectLevelSliderContainer.classList.remove('hidden');
  if (originalEffect) {
    noUiSlider.create(effectLevelSlider, {
      range: {
        min: 0,
        max: 100,
      },
      start: 1,
    });
    originalEffect = false;
  }
};


const getSliderOptions = function (effect) {
  let effectIndex = 0;
  effectsPresets.forEach((value, index) => {
    if (value.effect === effect) {
      effectIndex = index;
    }
  });
  return effectsPresets[effectIndex];
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

const removeEffects = function () {
  uploadImage.className = '';
  uploadImage.style.filter = '';
  effectLevel.value = '';
  if (!originalEffect) {
    effectLevelSliderContainer.classList.add('hidden');
    effectLevelSlider.noUiSlider.destroy();
  }
  originalEffect = true;
};


effectsList.addEventListener('change', (() => {
  const effectName = effectsList.querySelector(':checked').value;

  if (effectName === 'none') {
    removeEffects();
  } else {
    addSlider();
    setEffect(effectName);
    setSlider(effectName);
  }

}));

export { removeEffects };
