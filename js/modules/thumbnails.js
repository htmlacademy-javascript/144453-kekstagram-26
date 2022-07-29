
import { openImageFullView } from './full-image-view.js';
import { compareByCommentsCount, doShuffle } from './utils.js';

const RANDOM_SORT_THUMBNAILS_COUNT = 10;

const contentPlace = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnails = document.createDocumentFragment();


function clearContentPlace() {
  const elements = document.querySelectorAll('.picture');
  elements.forEach((element) => {
    contentPlace.removeChild(element);
  });
}

const renderThumbnails = function (content) {
  content.forEach((element) => {
    const thumbnail = thumbnailTemplate.cloneNode(true);
    thumbnail.querySelector('.picture__img').src = element.url;
    thumbnail.href = element.url;
    thumbnail.querySelector('.picture__comments').textContent = element.comments.length;
    thumbnail.querySelector('.picture__likes').textContent = element.likes;
    openImageFullView(thumbnail, element);
    thumbnails.appendChild(thumbnail);
  });
  contentPlace.appendChild(thumbnails);
};

const renderThumbnailsSortDefault = function (data) {
  const content = data.slice();
  clearContentPlace();
  renderThumbnails(content);
};


const renderThumbnailsSortRandom = function (data) {
  let content = data.slice();
  doShuffle(content);
  content = content.slice(0, RANDOM_SORT_THUMBNAILS_COUNT);
  clearContentPlace();
  renderThumbnails(content);
};

const renderThumbnailsSortDiscusse = function (data) {
  const content = data.slice().sort(compareByCommentsCount);
  clearContentPlace();
  renderThumbnails(content);
};


export { renderThumbnailsSortDiscusse, renderThumbnailsSortRandom, renderThumbnailsSortDefault, renderThumbnails };
