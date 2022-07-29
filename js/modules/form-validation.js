const HASHTAGS_MAX_COUNT = 6;
const HASHTAGS_MIX_LENGTH = 2;
const HASHTAGS_MAX_LENGTH = 20;
const DESCRIPTION_MAX_LENGTH = 140;

const HASHTAGS_COUNT_ERROR = 'нельзя указать больше пяти хэш-тегов';
const HASHTAGS_CONTENT_ERROR = 'хэш-тэг может содержать только буквы и цифры, и должен начинаться с #';
const HASHTAGS_REPEAT_ERROR = 'один и тот же хэш-тег не может быть использован дважды';
const DESCRIPTION_LENGTH_ERROR = 'максимальная длина комментария 140 символов';

const imageUploadForm = document.querySelector('#upload-select-image');
const inputHashtags = imageUploadForm.querySelector('.text__hashtags');
const inputDescription = imageUploadForm.querySelector('.text__description');


const pristineValidate = new Pristine(imageUploadForm, {
  classTo: 'img-upload__element',
  errorClass: 'img-upload--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__element',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error'
}, false);


const validateHashtagsCount = function () {
  const hashtagsArray = inputHashtags.value.split(' ');
  return hashtagsArray.length < HASHTAGS_MAX_COUNT;
};


const validateHashtagsContent = function () {
  const hashtagsArray = inputHashtags.value.split(' ');
  const hashtagReg = new RegExp(`^#[A-Za-zА-Яа-яЁё0-9]{${  HASHTAGS_MIX_LENGTH - 1  },${  HASHTAGS_MAX_LENGTH - 1  }}$`);
  if (inputHashtags.value !== '') {
    const check = hashtagsArray.every((value) => hashtagReg.test(value));
    return check;
  }
  return true;
};

const validateHashtagsRepeat = function () {
  const hashtagsArray = inputHashtags.value.toLowerCase().split(' ');
  let result = true;
  for (let i = 0; i < hashtagsArray.length; i++) {
    result = false;
    const checkArray = Array.from(hashtagsArray);
    checkArray.splice(i, 1);

    const check = checkArray.find((hashtag) => hashtag === hashtagsArray[i]);
    if (check !== undefined) { break; }
    result = true;
  }
  return result;
};


const validateDescriptionContent = function () {
  const description = inputDescription.value;
  return description.length <= DESCRIPTION_MAX_LENGTH;
};


pristineValidate.addValidator(inputHashtags, validateHashtagsCount, HASHTAGS_COUNT_ERROR);
pristineValidate.addValidator(inputHashtags, validateHashtagsContent, HASHTAGS_CONTENT_ERROR);
pristineValidate.addValidator(inputHashtags, validateHashtagsRepeat, HASHTAGS_REPEAT_ERROR);
pristineValidate.addValidator(inputDescription, validateDescriptionContent, DESCRIPTION_LENGTH_ERROR);


export { pristineValidate };
