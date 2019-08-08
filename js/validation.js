'use strict';

(function () {
  var MAX_LENGTH = 20;
  var MAX_TAGS = 5;

  window.getTextError = function (hashtag) {
    var tags = hashtag.split(' ');
    var tagsCopy = tags.map(function (hash) {
      return hash.toLowerCase();
    });

    if (hashtag.trim() !== '') {
      if (tags.length > MAX_TAGS) {
        return 'Хештегов должно быть не больше 5';
      }

      for (var i = 0; i < tags.length; i++) {
        var hash = tags[i];

        if (hash.length > MAX_LENGTH) {
          return 'Длина хештега должна быть не больше 20 символов';
        }

        if (hash === '#') {
          return 'Хештег не может состоять только из #';
        }
        if (hash[0] !== '#') {
          return 'Хештег должен начинаться с #';
        }
        if (tagsCopy.indexOf(hash.toLowerCase(), i + 1) !== -1) {
          return 'Хештеги не должны повторяться';
        }
        return '';
      }
    }
    return '';
  };
})();
