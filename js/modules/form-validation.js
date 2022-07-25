const imageUploadForm = document.querySelector('#upload-select-image');
const inputHashtag = imageUploadForm.querySelector('.text__hashtags');
const inputDescription = imageUploadForm.querySelector('.text__description');


const pristineValidate = new Pristine(imageUploadForm);


const validateHashtagsCount = function() {
  const hashtagsArray = inputHashtag.value.split(' ');
  return hashtagsArray.length<6;
};


const validateHashtagsContent = function() {
  const hashtagsArray = inputHashtag.value.split(' ');
  const hashtagReg = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

  const check = hashtagsArray.every ((value)=>hashtagReg.test(value));

  return check;


};

const validateHashtagsRepeat = function() {
  const hashtags=inputHashtag.value.toLowerCase();
  const hashtagsArray = hashtags.split(' ');
  let result = true;

  for (let i=0; i<hashtagsArray.length;i++){
    result = false;
    const checkArray = Array.from(hashtagsArray);
    checkArray.splice(i,1);

    const check = checkArray.find((hashtag) => hashtag === hashtagsArray[i]);
    if (check !== undefined) {break;}
    result=true;
  }
  return result;
};


const validateDescriptionContent = function() {
  const description = inputDescription.value;
  return description.length <= 140;
};

pristineValidate.addValidator(inputHashtag, validateHashtagsCount);
pristineValidate.addValidator(inputHashtag, validateHashtagsContent);
pristineValidate.addValidator(inputHashtag, validateHashtagsRepeat);
pristineValidate.addValidator(inputDescription, validateDescriptionContent);

const isValid = pristineValidate.validate();

export {isValid};
