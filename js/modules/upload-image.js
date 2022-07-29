import { pristineValidate } from './form-validation.js';
import { addScaleControl, removeScaleControl } from './upload-image-scale.js';
import { isEscapeKey } from './utils.js';
import { removeEffects } from './effects.js';
import { showErrorMessage, showSuccessMessage } from './upload-messages.js';


const FILES_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const imageUploadForm = document.querySelector('#upload-select-image');
const imageUploadPopup = imageUploadForm.querySelector('.img-upload__overlay');
const uploadFileInput = document.querySelector('#upload-file');
const imageUploadCancel = imageUploadForm.querySelector('#upload-cancel');
const inputHashtags = imageUploadForm.querySelector('.text__hashtags');
const inputDescription = imageUploadForm.querySelector('.text__description');
const uploadImageContainer = document.querySelector('.img-upload__preview');
const uploadImage = uploadImageContainer.querySelector('img');
const formSubmitButton = imageUploadForm.querySelector('.img-upload__submit');
const originalImageEffect = imageUploadForm.querySelector('#effect-none');


const onPopupEscKeydown = function (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadPopup();
    clearUploadPopup();
  }
};

const disableSubmitButton = function () {
  formSubmitButton.classList.add('.img-upload__submit--disabled');
  formSubmitButton.disabled = true;
};
const enableSubmitButton = function () {
  formSubmitButton.classList.remove('.img-upload__submit--disabled');
  formSubmitButton.disabled = false;
};

function closeUploadPopup() {
  imageUploadPopup.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

function clearUploadPopup() {
  removeScaleControl();
  removeEffects();
  originalImageEffect.checked=true;
  uploadFileInput.value = '';
  inputHashtags.value = '';
  inputDescription.value = '';
}

function showUploadPopup() {
  imageUploadPopup.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  addScaleControl();

}

inputHashtags.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

inputDescription.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});


uploadFileInput.addEventListener('change', () => {
  showUploadPopup();
  const imageFile = uploadFileInput.files[0];
  const imageFileName = imageFile.name.toLowerCase();
  const checkType = FILES_TYPES.some((it) => imageFileName.endsWith(it));
  if (checkType) {
    uploadImage.src = URL.createObjectURL(imageFile);
  }
});

imageUploadCancel.addEventListener('click', () => {
  closeUploadPopup();
  clearUploadPopup();
});


imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristineValidate.validate();

  if (isValid) {
    disableSubmitButton();
    const formData = new FormData(evt.target);
    fetch(
      'https://26.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          clearUploadPopup();
          closeUploadPopup();
          showSuccessMessage();
        } else {
          showErrorMessage();
        }
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(enableSubmitButton());
  }
});
