import { isEscapeKey } from './utils.js';


const uploadErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const uploadSuccesTemplate = document.querySelector('#success').content.querySelector('.success');


const uploadError = document.createDocumentFragment();
const uploadSucces = document.createDocumentFragment();


const onErrorMessageKeydown = function (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

const onSuccesMessageKeydown = function (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccesMessage();
  }
};

function closeErrorMessage() {
  const message = document.querySelector('.error');
  document.querySelector('body').removeChild(message);
  document.removeEventListener('keydown', onErrorMessageKeydown);


}

function closeSuccesMessage() {
  const message = document.querySelector('.success');
  document.querySelector('body').removeChild(message);
  document.removeEventListener('keydown', onSuccesMessageKeydown);

}

const showErrorMessage = function () {
  const errorMessage = uploadErrorTemplate.cloneNode(true);
  document.querySelector('body').classList.add('modal-open');
  errorMessage.style.zIndex = 100;
  document.addEventListener('keydown', onErrorMessageKeydown);

  errorMessage.querySelector('.error__button').addEventListener('click', () => { closeErrorMessage(); });
  document.querySelector('body').addEventListener('click', () => { closeErrorMessage(); });
  errorMessage.querySelector('.error__inner').addEventListener('click', (evt) => {
    evt.stopPropagation();
  });

  uploadError.appendChild(errorMessage);
  document.querySelector('body').appendChild(uploadError);
};

const showSuccesMessage = function () {
  const succesMessage = uploadSuccesTemplate.cloneNode(true);
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onSuccesMessageKeydown);
  succesMessage.querySelector('.success__button').addEventListener('click', () => { closeSuccesMessage(); });
  document.querySelector('body').addEventListener('click', () => { closeSuccesMessage(); });
  succesMessage.querySelector('.success__inner').addEventListener('click', (evt) => {
    evt.stopPropagation();
  });

  uploadSucces.appendChild(succesMessage);
  document.querySelector('body').appendChild(uploadSucces);
};

export { showErrorMessage, showSuccesMessage };
