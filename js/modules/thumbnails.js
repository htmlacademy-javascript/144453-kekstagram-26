
import { showBigPicture } from './full-image-view.js';
import {compareByCommentsCount, doShuffle } from './utils.js';

const contentPalce = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnails = document.createDocumentFragment();


function clearContentPlace(){
  const elements = document.querySelectorAll('.picture');
  for (let i=0; i<elements.length; i++){
    contentPalce.removeChild(elements[i]);
  }
}

const renderThumbnails = function (content) {
  for (let i = 0; i < content.length; i++) {
    const thumbnail = thumbnailTemplate.cloneNode(true);
    thumbnail.querySelector('.picture__img').src = content[i].url;
    thumbnail.href = content[i].url;
    thumbnail.querySelector('.picture__comments').textContent = content[i].comments.length;
    thumbnail.querySelector('.picture__likes').textContent = content[i].likes;
    showBigPicture(thumbnail, content[i]);
    thumbnails.appendChild(thumbnail);
  }
  contentPalce.appendChild(thumbnails);
};

const renderThumbnailsSortDefault = function (data) {
  const content = data.slice();
  clearContentPlace();
  renderThumbnails(content);
};


const renderThumbnailsSortRandom = function (data) {
  let content = data.slice();
  doShuffle(content);
  content = content.slice(0, 10);
  clearContentPlace();
  renderThumbnails(content);
};

const renderThumbnailsSortDiscusse = function (data) {
  const content = data.slice().sort(compareByCommentsCount);
  clearContentPlace();
  renderThumbnails(content);
};


export { renderThumbnailsSortDiscusse, renderThumbnailsSortRandom, renderThumbnailsSortDefault,renderThumbnails };
