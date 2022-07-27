import { renderThumbnailsSortDefault, renderThumbnailsSortRandom, renderThumbnailsSortDiscusse,renderThumbnails } from './thumbnails.js';
import { showFilters, setDefaultSort, setRandomSort, setDiscusstSort } from './filters.js';
import { debounce } from './utils.js';

const RERENDER_DELAY = 500;
const contentPalce = document.querySelector('.pictures');

const showServerError = function (error) {
  const fragment = document.createDocumentFragment();
  const newElement = document.createElement('div');
  newElement.classList.add('server-error');
  newElement.innerHTML = `<p>Загрузить картинки не удалось, попробуйте позднее</p><p>${error}</p>`;
  fragment.appendChild(newElement);
  contentPalce.appendChild(fragment);
};


const getData = function (onSuccess) {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((posts) => {
      onSuccess(posts);
    })
    .then(showFilters())
    .catch((error) => { showServerError(error); });

};

getData((posts) => {
  renderThumbnails(posts);
  setDefaultSort(debounce(() => renderThumbnailsSortDefault(posts), RERENDER_DELAY));
  setRandomSort(debounce(() => renderThumbnailsSortRandom(posts), RERENDER_DELAY));
  setDiscusstSort(debounce(() => renderThumbnailsSortDiscusse(posts), RERENDER_DELAY));
});

