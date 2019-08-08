'use strict';
(function () {
  var STEP_COUNT = 5;
  var INITIAL_CURRENT_COMMENTS = 5;

  var body = document.querySelector('body');
  var bigPicture = document.querySelector('.big-picture');
  var listComment = bigPicture.querySelector('.social__comments');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var currentComments = INITIAL_CURRENT_COMMENTS;
  var currentCommentsCount = bigPicture.querySelector('.social__comment-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var closeBigPicture = bigPicture.querySelector('.big-picture__cancel');
  var renderComment = function (comment) {
    var commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');
    commentItem.classList.add('visually-hidden');

    var commentImage = document.createElement('img');
    commentImage.classList.add('social__picture');
    commentImage.src = comment.avatar;
    commentImage.alt = comment.name;
    commentImage.width = '35';
    commentImage.height = '35';
    commentItem.appendChild(commentImage);

    var commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = comment.message;
    commentItem.appendChild(commentText);
    return commentItem;
  };

  var renderComments = function (comments) {
    listComment.innerHTML = '';

    var fragment = document.createDocumentFragment();

    comments.forEach(function (element) {
      var comment = renderComment(element);
      fragment.appendChild(comment);
    });

    listComment.appendChild(fragment);
  };

  var showComments = function () {
    var usersComments = Array.from(listComment.querySelectorAll('.social__comment'));
    var numbers = (currentComments < usersComments.length) ? currentComments : usersComments.length;

    if (currentComments < usersComments.length) {
      for (var i = 0; i < currentComments; i++) {
        usersComments[i].classList.remove('visually-hidden');
      }
      commentsLoader.classList.remove('visually-hidden');
      currentComments = currentComments + STEP_COUNT;
    } else {
      usersComments.forEach(function (element) {
        element.classList.remove('visually-hidden');
      });
      commentsLoader.classList.add('visually-hidden');
    }
    currentCommentsCount.textContent = numbers + ' из ' + commentsCount.textContent + ' комментариев';
  };

  var onShowCommentsClick = function () {
    showComments();
  };

  window.renderBigPicture = function (photo) {
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    commentsCount.textContent = photo.comments.length;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    closeBigPicture.addEventListener('click', onClosePictureClick);
    document.addEventListener('keydown', onPopupEscPress);
    commentsLoader.addEventListener('click', onShowCommentsClick);

    renderComments(photo.comments);
    showComments();
  };
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.ESC_CODE) {
      onClosePictureClick();
    }
  };
  var onClosePictureClick = function () {
    currentComments = INITIAL_CURRENT_COMMENTS;
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    commentsLoader.removeEventListener('click', onShowCommentsClick);
    closeBigPicture.removeEventListener('click', onClosePictureClick);
    document.removeEventListener('keydown', onPopupEscPress);
  };
})();
