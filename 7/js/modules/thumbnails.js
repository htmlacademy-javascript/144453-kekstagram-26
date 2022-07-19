import {getRandomComtent} from './random-content.js';
import {showBigPicture} from './full-image-view.js';

const content = getRandomComtent();
const contentPalce = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnails = document.createDocumentFragment();

for (let i=0; i<content.length; i++) {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src=content[i].url;
  thumbnail.href=content[i].url;
  thumbnail.querySelector('.picture__comments').textContent=content[i].comments.length;
  thumbnail.querySelector('.picture__likes').textContent=content[i].likes;
  showBigPicture(thumbnail, content[i]);
  thumbnails.appendChild(thumbnail);
}

contentPalce.appendChild(thumbnails);


