'use strict';

(function () {
  var listPictures = document.querySelector('.pictures');

  var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

  var renderPicture = function (photo) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;

    var onPictureElementClick = function () {
      window.renderBigPicture(photo);
    };

    pictureElement.addEventListener('click', onPictureElementClick);

    return pictureElement;
  };

  window.renderPictures = function (pictures) {
    var fragment = document.createDocumentFragment();
    pictures.forEach(function (element) {
      fragment.appendChild(renderPicture(element));
    });
    listPictures.appendChild(fragment);
  };
})();
