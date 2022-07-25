import {isValid} from './form-validation.js';

const imageUploadForm = document.querySelector('#upload-select-image');
const imageUploadPopap = imageUploadForm.querySelector('.img-upload__overlay');
const uploadFileInput = document.querySelector('#upload-file');
const imgUploadCancel = imageUploadForm.querySelector('#upload-cancel');
const inputHashtag = imageUploadForm.querySelector('.text__hashtags');
const inputDescription = imageUploadForm.querySelector('.text__description');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorPopup = document.createDocumentFragment();

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
  uploadFileInput.value ='';
  inputHashtag.value='';
  inputDescription.value='';

}

function showImageLoader(){
  imageUploadPopap.classList.remove ('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
}

inputHashtag.addEventListener ('keydown', (evt) => {
  evt.stopPropagation();
});

inputDescription.addEventListener ('keydown', (evt) => {
  evt.stopPropagation();
});


uploadFileInput.addEventListener ('change', () => {
  showImageLoader();
});

imgUploadCancel.addEventListener ('click', () => {
  closeUploadPopup ();
});


imageUploadForm.addEventListener ('submit', (evt) => {

  evt.preventDefault();

  if (isValid) {
    closeUploadPopup ();
  }else{
    const errorMessage = errorTemplate.cloneNode(true);
    errorPopup.appendChild(errorMessage);
    document.querySelector('body').appendChild(errorPopup);
  }
});
