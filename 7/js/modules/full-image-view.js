const bigPicture = document.querySelector('.big-picture');
const bigPictuleImage = bigPicture.querySelector('.big-picture__img');
const bigPictureCloseButton = document.querySelector('#picture-cancel');
const commentsBlock = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsBlock.querySelector('.social__comment');
const comments = document.createDocumentFragment();


bigPictureCloseButton.addEventListener ('click', ()=> {
  bigPicture.classList.add ('hidden');
  document.querySelector('body').classList.remove('modal-open');
});


const showBigPicture = function (element, elementContent){
  element.addEventListener('click', (evt)=> {
    evt.preventDefault();

    bigPictuleImage.querySelector('img').src = elementContent.url;
    bigPicture.querySelector('.social__caption').textContent = elementContent.description;
    bigPicture.querySelector('.likes-count').textContent = elementContent.likes;

    for (let i=0;i<elementContent.comments.length;i++){
      const comment = commentTemplate.cloneNode(true);
      comment.querySelector('img').src = elementContent.comments[i].avatar;
      comment.querySelector('img').alt = elementContent.comments[i].name;
      comment.querySelector('p').textContent = elementContent.comments[i].message;
      comments.appendChild(comment);
    }
    commentsBlock.innerHTML='';
    commentsBlock.appendChild(comments);

    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
    document.querySelector('body').classList.add('modal-open');
  });
};

export {showBigPicture};
