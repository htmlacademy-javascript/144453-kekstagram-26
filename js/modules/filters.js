

const filtersBlock = document.querySelector('.img-filters ');
const defaultSortButton = document.querySelector('#filter-default');
const randomSortButton = document.querySelector('#filter-random');
const discussedSortButton = document.querySelector('#filter-discussed');

const setDefaultSort = function (cb) {
  defaultSortButton.addEventListener('click', () => {
    defaultSortButton.classList.add('img-filters__button--active');
    randomSortButton.classList.remove('img-filters__button--active');
    discussedSortButton.classList.remove('img-filters__button--active');
    cb();
  });
};
const setRandomSort = function (cb) {
  randomSortButton.addEventListener('click', () => {
    defaultSortButton.classList.remove('img-filters__button--active');
    randomSortButton.classList.add('img-filters__button--active');
    discussedSortButton.classList.remove('img-filters__button--active');
    cb();
  });
};
const setDiscusstSort = function (cb) {
  discussedSortButton.addEventListener('click', () => {
    defaultSortButton.classList.remove('img-filters__button--active');
    randomSortButton.classList.remove('img-filters__button--active');
    discussedSortButton.classList.add('img-filters__button--active');
    cb();
  });
};
/*
defaultSort
randomSort
discussedSort
*/


const showFilters = function () {
  filtersBlock.classList.remove('img-filters--inactive');
};


export { showFilters, setDefaultSort, setRandomSort, setDiscusstSort };
