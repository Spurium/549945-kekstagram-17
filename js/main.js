'use strict';

var init = function (pictures) {
  window.renderPictures(pictures);
  window.initFilter(pictures);
};

window.response.load(init, window.renderMessageError);
