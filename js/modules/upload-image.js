import {pristineValidate} from './form-validation.js';
import {addScaleControl, removeScaleControl} from './upload-image-scale.js';

const imageUploadForm = document.querySelector('#upload-select-image');
const imageUploadPopap = imageUploadForm.querySelector('.img-upload__overlay');
const uploadFileInput = document.querySelector('#upload-file');
const imgUploadCancel = imageUploadForm.querySelector('#upload-cancel');
const inputHashtag = imageUploadForm.querySelector('.text__hashtags');
const inputDescription = imageUploadForm.querySelector('.text__description');

const onPopupEscKeydown = function(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadPopup();
  }
};

function isEscapeKey (evt) {
  return evt.key === 'Escape';
}

function closeUploadPopup () {
  imageUploadPopap.classList.add ('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  removeScaleControl();
  uploadFileInput.value ='';
  inputHashtag.value='';
  inputDescription.value='';

}

function showUploadPopup(){
  imageUploadPopap.classList.remove ('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  addScaleControl();

}

inputHashtag.addEventListener ('keydown', (evt) => {
  evt.stopPropagation();
});

inputDescription.addEventListener ('keydown', (evt) => {
  evt.stopPropagation();
});


uploadFileInput.addEventListener ('change', () => {
  showUploadPopup();
});

imgUploadCancel.addEventListener ('click', () => {
  closeUploadPopup ();
});


imageUploadForm.addEventListener ('submit', (evt) => {
  evt.preventDefault();
  pristineValidate.validate();
});
