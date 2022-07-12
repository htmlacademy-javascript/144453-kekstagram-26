import {getRandomComtent} from './random-content.js';

const content = getRandomComtent();
const contentPalce = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnails = document.createDocumentFragment();


for (let i=0; i<content.length; i++) {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src=content[i].url;
  thumbnail.querySelector('.picture__comments').textContent=content[i].comments.length;
  thumbnail.querySelector('.picture__likes').textContent=content[i].likes;
  thumbnails.appendChild(thumbnail);
}

contentPalce.appendChild(thumbnails);
