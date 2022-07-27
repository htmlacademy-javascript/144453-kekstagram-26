import { pristineValidate } from './form-validation.js';
import { addScaleControl, removeScaleControl } from './upload-image-scale.js';
import { isEscapeKey } from './utils.js';
import { removEffects } from './effects.js';
import { showErrorMessage, showSuccesMessage } from './upload-messages.js';

const imageUploadForm = document.querySelector('#upload-select-image');
const imageUploadPopap = imageUploadForm.querySelector('.img-upload__overlay');
const uploadFileInput = document.querySelector('#upload-file');
const imgUploadCancel = imageUploadForm.querySelector('#upload-cancel');
const inputHashtag = imageUploadForm.querySelector('.text__hashtags');
const inputDescription = imageUploadForm.querySelector('.text__description');

const onPopupEscKeydown = function (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadPopup();
    clearUploadPopup();
  }
};


function closeUploadPopup() {
  imageUploadPopap.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

function clearUploadPopup() {
  removeScaleControl();
  removEffects();
  uploadFileInput.value = '';
  inputHashtag.value = '';
  inputDescription.value = '';
}

function showUploadPopup() {
  imageUploadPopap.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  addScaleControl();

}

inputHashtag.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

inputDescription.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});


uploadFileInput.addEventListener('change', () => {
  showUploadPopup();
});

imgUploadCancel.addEventListener('click', () => {
  closeUploadPopup();
  clearUploadPopup();
});


imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristineValidate.validate();
  if (isValid) {
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
          showSuccesMessage();
        } else {
          showErrorMessage();
        }
      })
      .catch(() => {
        showErrorMessage();
      });
  }
});
