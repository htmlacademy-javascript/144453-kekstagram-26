function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

function debounce(callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

function compareByCommentsCount(a, b) {
  if (a.comments.length > b.comments.length) { return 1; }
  if (a.comments.length === b.comments.length) { return 0; }
  if (a.comments.length < b.comments.length) { return -1; }
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

export {  isEscapeKey, debounce, compareByCommentsCount, doShuffle };
