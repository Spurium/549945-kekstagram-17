'use strict';

(function () {
  var TIME_OF_ANSWER = 10000;
  var STATUS_OK = 200;

  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';

  window.response = {};

  window.response.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {

      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Ошибка при загрузке данных с сервера');
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIME_OF_ANSWER;

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  window.response.upload = function (data, onError, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess();
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', onError);
    xhr.addEventListener('timeout', onError);

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };
})();
