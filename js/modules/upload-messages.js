import { isEscapeKey } from './utils.js';


const uploadErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const uploadSuccesTemplate = document.querySelector('#success').content.querySelector('.success');
const body = document.querySelector('body');


const uploadError = document.createDocumentFragment();
const uploadSucces = document.createDocumentFragment();


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
  errorMessage.style.zIndex = 100;
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

const showSuccesMessage = function () {
  const succesMessage = uploadSuccesTemplate.cloneNode(true);
  body.classList.add('modal-open');
  uploadSucces.appendChild(succesMessage);
  body.appendChild(uploadSucces);

  document.addEventListener('keydown', onSuccessMessageKeydown);
  succesMessage.querySelector('.success__button').addEventListener('click', onSuccessMessageClick);

  body.addEventListener('click', onSuccessMessageClick);
  succesMessage.querySelector('.success__inner').addEventListener('click', (evt) => { evt.stopPropagation(); });
};

export { showErrorMessage, showSuccesMessage };
