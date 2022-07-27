
import { showBigPicture } from './full-image-view.js';


const contentPalce = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnails = document.createDocumentFragment();
const initialSate = contentPalce.innerHTML;


const renderThumbnailsSortDefault = function (data) {
  const content = data.slice();
  for (let i = 0; i < content.length; i++) {
    const thumbnail = thumbnailTemplate.cloneNode(true);
    thumbnail.querySelector('.picture__img').src = content[i].url;
    thumbnail.href = content[i].url;
    thumbnail.querySelector('.picture__comments').textContent = content[i].comments.length;
    thumbnail.querySelector('.picture__likes').textContent = content[i].likes;
    showBigPicture(thumbnail, content[i]);
    thumbnails.appendChild(thumbnail);
  }
  contentPalce.innerHTML = initialSate;
  contentPalce.appendChild(thumbnails);
};


const renderThumbnailsSortRandom = function (data) {
  let content = data.slice();
  doShuffle(content);
  content = content.slice(0, 10);
  for (let i = 0; i < content.length; i++) {
    const thumbnail = thumbnailTemplate.cloneNode(true);
    thumbnail.querySelector('.picture__img').src = content[i].url;
    thumbnail.href = content[i].url;
    thumbnail.querySelector('.picture__comments').textContent = content[i].comments.length;
    thumbnail.querySelector('.picture__likes').textContent = content[i].likes;
    showBigPicture(thumbnail, content[i]);
    thumbnails.appendChild(thumbnail);
  }
  contentPalce.innerHTML = initialSate;
  contentPalce.appendChild(thumbnails);
};

const renderThumbnailsSortDiscusse = function (data) {
  const content = data.slice().sort(compareByCommentsCount);
  for (let i = 0; i < content.length; i++) {
    const thumbnail = thumbnailTemplate.cloneNode(true);
    thumbnail.querySelector('.picture__img').src = content[i].url;
    thumbnail.href = content[i].url;
    thumbnail.querySelector('.picture__comments').textContent = content[i].comments.length;
    thumbnail.querySelector('.picture__likes').textContent = content[i].likes;
    showBigPicture(thumbnail, content[i]);
    thumbnails.appendChild(thumbnail);
  }
  contentPalce.innerHTML = initialSate;
  contentPalce.appendChild(thumbnails);
};

function compareByCommentsCount(a, b) {
  if (a.comments.length > b.comments.length) {return 1;}
  if (a.comments.length === b.comments.length) {return 0;}
  if (a.comments.length < b.comments.length) {return -1;}
}
function doShuffle(array) {
  let currentIndex = array.length;
  let randomIndex = 0;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}


export { renderThumbnailsSortDiscusse, renderThumbnailsSortRandom, renderThumbnailsSortDefault };
