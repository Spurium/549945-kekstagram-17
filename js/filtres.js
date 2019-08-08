'use strict';

(function () {
  var FIRST_IMAGE = 0;
  var LAST_IMAGE = 10;

  var rank = function (first, second) {
    var firstCommentsLength = first.comments.length;
    var secondCommentsLength = second.comments.length;

    if (firstCommentsLength < secondCommentsLength) {
      return 1;
    }
    if (firstCommentsLength > secondCommentsLength) {
      return -1;
    }
    return 0;
  };

  var sortPictures = function (pictures) {
    return pictures.slice().sort(rank);
  };

  var getRandomArbitrary = function () {
    return Math.random() - 0.5;
  };

  var getRandomPictures = function (pictures) {
    return pictures.slice().sort(getRandomArbitrary).slice(FIRST_IMAGE, LAST_IMAGE);
  };

  var getFilterPictures = function (pictures) {
    var picturesList = document.querySelectorAll('.picture');
    picturesList.forEach(function (element) {
      element.remove();
    });
    window.renderPictures(pictures);
  };

  window.initFilter = function (pictures) {

    var filter = document.querySelector('.img-filters');
    filter.classList.remove('img-filters--inactive');

    var renderFilter = function (evt) {
      var button = evt.target;

      if (evt.target.tagName === 'BUTTON') {
        var filterButtonActive = document.querySelector('.img-filters__button--active');
        filterButtonActive.classList.remove('img-filters__button--active');
        button.classList.add('img-filters__button--active');
      }

      if (evt.target.id === 'filter-popular') {
        getFilterPictures(pictures);
      } else if (evt.target.id === 'filter-new') {
        var newPictures = getRandomPictures(pictures);
        getFilterPictures(newPictures);
      } else if (evt.target.id === 'filter-discussed') {
        var discussedPictures = sortPictures(pictures);
        getFilterPictures(discussedPictures);
      }
    };

    var onFilterClick = window.debounce(renderFilter);

    filter.addEventListener('click', onFilterClick);
  };
})();
