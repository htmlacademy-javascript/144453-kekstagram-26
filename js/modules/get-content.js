import {renderThumbnails} from './thumbnails.js';

const contentPalce = document.querySelector('.pictures');

fetch('https://26.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response;
    }

    throw new Error(`${response.status} — ${response.statusText}`);
  })
  .then((response) => response.json())
  .then((posts) =>  {
    renderThumbnails(posts);
    console.log(posts);
  }
  )
  .catch((error) => {showServerError(error);});

const showServerError = function (error){
  const fragment = document.createDocumentFragment();
  const newElement = document.createElement('div');
  newElement.classList.add('server-error');
  newElement.innerHTML = `<p>Загрузить картинки не удалось, попробуйте позднее</p><p>${error}</p>`;
  fragment.appendChild(newElement);
  contentPalce.appendChild(fragment);
};

