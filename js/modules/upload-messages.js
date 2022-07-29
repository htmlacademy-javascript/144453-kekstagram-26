import { isEscapeKey } from './utils.js';

const Z_INDEX_ERROR_MESSAGE = 100;

const uploadErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const uploadSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const body = document.querySelector('body');


const uploadError = document.createDocumentFragment();
const uploadSuccess = document.createDocumentFragment();


const onErrorMessageKeydown = function (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

const onErrorMessageClick = function () {
  closeErrorMessage();
};

function closeErrorMessage() {
  const message = document.querySelector('.error');
  body.removeChild(message);
  document.removeEventListener('keydown', onErrorMessageKeydown);
  body.removeEventListener('click', onErrorMessageClick);

}

function showErrorMessage() {
  const errorMessage = uploadErrorTemplate.cloneNode(true);
  body.classList.add('modal-open');
  errorMessage.style.zIndex = Z_INDEX_ERROR_MESSAGE;
  uploadError.appendChild(errorMessage);
  body.appendChild(uploadError);

  document.addEventListener('keydown', onErrorMessageKeydown);
  errorMessage.querySelector('.error__button').addEventListener('click', onErrorMessageClick);

  body.addEventListener('click', onErrorMessageClick);
  errorMessage.querySelector('.error__inner').addEventListener('click', (evt) => { evt.stopPropagation(); });
}


const onSuccessMessageKeydown = function (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
};

const onSuccessMessageClick = function () {
  closeSuccessMessage();
};

function closeSuccessMessage() {
  const message = document.querySelector('.success');
  body.removeChild(message);
  document.removeEventListener('keydown', onSuccessMessageKeydown);
  body.removeEventListener('click', onSuccessMessageClick);
}

const showSuccessMessage = function () {
  const successMessage = uploadSuccessTemplate.cloneNode(true);
  body.classList.add('modal-open');
  uploadSuccess.appendChild(successMessage);
  body.appendChild(uploadSuccess);

  document.addEventListener('keydown', onSuccessMessageKeydown);
  successMessage.querySelector('.success__button').addEventListener('click', onSuccessMessageClick);

  body.addEventListener('click', onSuccessMessageClick);
  successMessage.querySelector('.success__inner').addEventListener('click', (evt) => { evt.stopPropagation(); });
};

export { showErrorMessage, showSuccessMessage };
