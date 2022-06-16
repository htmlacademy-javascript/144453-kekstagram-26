/* eslint-disable no-console */
function getRandomNumber(min, max) {
  if (0 <= min && 0 <= max) {
    return Math.round(Math.random() * (max - min) + min);
  } else {
    return 'введите чило больше нуля';
  }
}

getRandomNumber(0, 5);

function checkMessageLength(message, maxDuration) {
  if (message.length <= maxDuration) {
    return true;
  } else {
    return false;
  }
}

checkMessageLength('152', 5);

const USERS_NAMES = [
  'Слава',
  'Коля',
  'Петя',
  'Даша',
  'Глаша',
  'Та самая',
  'BMW_1988',
  'Artem_superman_92',
  'Д.Жуан',
  'Жора',
  'ТВОЯ',
  'Не твоя',
  'БМВова',
  '',
];

const PHOTO__DESCRIPTION = [
  'Мечта интроверта - пустой пляж. А кто спасать будет, если начнешь тонуть',
  'Go to thr bitch',
  'Я тут! Завидуете?',
  'Дай подержать камеру и сфоткай меня на телефон',
  'Суп с котом',
  'Мои понты!',
  'Мои завтраки в предверии пляжного сезона',
  'Жду когда перебродит',
  'Эй,забери меня домой, я уже обгорела',
  'Как научить домочадцев ставить обувь на место? Подробности в по ссылке в профиле',
  'Услуги по монтажу заборов - +7 495 45 45 45',
  'Фото до прозда лежачего полицейского',
  'Угадайте, это рыба или арбуз?',
  'домкдлоикмдшг - по японски суши с котом (значит то же самое что у нас суп с котом',
  'Если отключили отопление и выбило окно - тапочки для дома с подогревом - самое то',
  'лети лети лепесток....',
  'ОЙ, как я тут оказалась?!',
  'ВСе потратил на машину, на ремонт денег не осталось',
  'для ночных бдений',
  'Лысые пальмы - свидетельствуют о том, что район ветренный',
  'Бурда с лемоном',
  'Хочу сюда!',
  'Сегодня видела такого - ненавижу пауков',
  'Я наконец попала на концерт мистера Кастрюля! Завидуйте!',
  'Мой бегемотик и не мой бегемотик',
];

const MESSAGE_CONTENT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

function getRandomArrayElement(element) {
  return element[getRandomNumber(0, element.length - 1)];
}

//функция для создания экземпляра комментария
const getSingleComment = () => ({
  id: getRandomNumber(0, 999999),
  avatar: `img/avatar-${  getRandomNumber(0, 5)  }.svg`,
  message: getRandomArrayElement(MESSAGE_CONTENT),
  name: getRandomArrayElement(USERS_NAMES),
});

//функция собирающая массив случайной длины из комментариев
const getCommentArray = function () {
  return Array.from({ length: getRandomNumber(1, 9) }, getSingleComment);
};

//функция для создания экземпляра поста
const getSinglePost = function (index) {
  return {
    id: index,
    url: `photos/${  index  }.jpg`,
    description: PHOTO__DESCRIPTION[index - 1],
    likes: getRandomNumber(0, 1000),
    comments: getCommentArray(),
  };
};

//функция собирающая массив заданной длины из постов
const getPostArray = function (length) {
  const array = [];
  for (let i = 1; i <= length; i++) {
    array.push(getSinglePost(i));
  }
  return array;
};

//функция для проверки ID комментариев на совпадение
function verifyCommentsId() {
  let commetsIdArray = [];
  let verify = true;

  while (verify) {
    verify = false;
    commetsIdArray = [];
    content.forEach((post, postId) => {
      post.comments.forEach((comment, commentId) => {
        const idAdress = {
          id: content[postId].comments[commentId].id,
          commentIndex: commentId,
          postIndex: postId,
        };
        commetsIdArray.push(idAdress);
      });
    });

    commetsIdArray.forEach((valueFirst, indexFirst) => {
      commetsIdArray.forEach((valueSecond, indexSecond) => {
        if (valueFirst.id === valueSecond.id) {
          if (indexFirst !== indexSecond) {
            content[valueFirst.postIndex].comments[valueFirst.commentIndex].id = getRandomNumber(0, 999999);
            verify = true;
          }
        }
      });
    });
  }

  return commetsIdArray;
}

//собираем массив из 25 постов
const content = getPostArray(25);
//проверяем массив на одинаковые ID комментариев
verifyCommentsId();

console.log(content);
