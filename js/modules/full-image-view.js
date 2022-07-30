import { isEscapeKey } from './utils.js';

const MORE_COMMENTS_COUNT = 5;
const LOAD_COMMENTS_COUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img');
const bigPictureCloseButton = document.querySelector('#picture-cancel');
const commentsBlock = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsBlock.querySelector('.social__comment');
const comments = document.createDocumentFragment();
const commentsLoadButton = bigPicture.querySelector('.social__comments-loader');
const commentsCountLable = bigPicture.querySelector('.social__comment-count');
let commentsCount = LOAD_COMMENTS_COUNT;
let onMoreCommentsClick;


const onBigPctureEscKeydown = function (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPcturePopup();
  }
};

function closeBigPcturePopup() {
  document.removeEventListener('keydown', onBigPctureEscKeydown);
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  commentsCount = LOAD_COMMENTS_COUNT;
  commentsLoadButton.removeEventListener('click', onMoreCommentsClick);
}

bigPictureCloseButton.addEventListener('click', () => {
  closeBigPcturePopup();
});

const showMoreComments = function (commentsArray) {
  commentsCount += MORE_COMMENTS_COUNT;
  showComments(commentsArray, commentsCount);
};

function showComments(commentsArray, count) {
  let commentsListLength = count;
  if (commentsArray.length < count) {
    commentsListLength = commentsArray.length;
    commentsLoadButton.classList.add('hidden');
  }
  commentsCountLable.textContent = `${commentsListLength} из ${commentsArray.length} комментариев`;
  commentsArray.slice(0, commentsListLength).forEach((element) => {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('img').src = element.avatar;
    comment.querySelector('img').alt = element.name;
    comment.querySelector('p').textContent = element.message;
    comments.appendChild(comment);
  });
  commentsBlock.innerHTML = '';
  commentsBlock.appendChild(comments);
}

const showBigImage = function (data) {
  bigPictureImage.querySelector('img').src = data.url;
  bigPicture.querySelector('.social__caption').textContent = data.description;
  bigPicture.querySelector('.likes-count').textContent = data.likes;
  bigPicture.classList.remove('hidden');
  commentsLoadButton.classList.remove('hidden');
};


const openImageFullView = function (element, elementContent) {
  const commentsArray = elementContent.comments;
  element.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigImage(elementContent);
    showComments(commentsArray, LOAD_COMMENTS_COUNT);
    onMoreCommentsClick = (() => showMoreComments(commentsArray));
    commentsLoadButton.addEventListener('click', onMoreCommentsClick);
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onBigPctureEscKeydown);
  });
};


export { openImageFullView };
