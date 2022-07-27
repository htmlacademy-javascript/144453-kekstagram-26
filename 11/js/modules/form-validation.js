const imageUploadForm = document.querySelector('#upload-select-image');
const inputHashtag = imageUploadForm.querySelector('.text__hashtags');
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
  const hashtagsArray = inputHashtag.value.split(' ');
  return hashtagsArray.length < 6;
};


const validateHashtagsContent = function () {
  const hashtagsArray = inputHashtag.value.split(' ');
  const hashtagReg = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  if (inputHashtag.value !== '') {
    const check = hashtagsArray.every((value) => hashtagReg.test(value));
    return check;
  } else {
    return true;
  }
};

const validateHashtagsRepeat = function () {
  const hashtags = inputHashtag.value.toLowerCase();
  const hashtagsArray = hashtags.split(' ');
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
  return description.length <= 140;
};


pristineValidate.addValidator(inputHashtag, validateHashtagsCount, 'нельзя указать больше пяти хэш-тегов');
pristineValidate.addValidator(inputHashtag, validateHashtagsContent, 'хэш-тэг может содержать только буквы и цифры, и должен начинаться с #');
pristineValidate.addValidator(inputHashtag, validateHashtagsRepeat, 'один и тот же хэш-тег не может быть использован дважды');
pristineValidate.addValidator(inputDescription, validateDescriptionContent, 'максимальная длина комментария 140 символов');


export { pristineValidate };
