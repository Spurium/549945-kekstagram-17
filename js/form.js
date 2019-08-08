'use strict';
(function () {

  var main = document.querySelector('main');
  var form = document.querySelector('.img-upload__form');
  var uploadFile = form.querySelector('#upload-file');
  var closeForm = form.querySelector('.img-upload__cancel');
  var textDescription = form.querySelector('.text__description');
  var hashtag = form.querySelector('.text__hashtags');
  var submit = form.querySelector('.img-upload__submit');

  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');

  var successButton = successMessage.querySelector('.success__button');
  var errorButtons = errorMessage.querySelectorAll('.error__button');

  var onCloseSuccessClick = function () {
    successMessage.remove();
    removeListenersPopup();
  };

  var onCloseErrorClick = function () {
    errorMessage.remove();
    removeListenersPopup();
  };

  var onDocumentClick = function (evt) {
    var parent = evt.target.classList.contains('.success__inner');
    if (!parent) {
      onCloseSuccessClick();
    }
  };

  var onDocumentErrorClick = function (evt) {
    var parent = evt.target.classList.contains('.error__inner');
    if (!parent) {
      onCloseErrorClick();
    }
  };

  var onSuccessEscPress = function (evt) {
    if (evt.keyCode === window.ESC_CODE) {
      onCloseSuccessClick();
    }
  };

  var onErrorEscPress = function (evt) {
    if (evt.keyCode === window.ESC_CODE) {
      onCloseErrorClick();
    }
  };

  var removeListenersPopup = function () {
    errorButtons.forEach(function (element) {
      element.removeEventListener('click', onCloseErrorClick);
    });
    successButton.removeEventListener('click', onCloseSuccessClick);
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onSuccessEscPress);
  };
  var openSuccessPopup = function () {
    main.appendChild(successMessage);
    closeForm.click();
    successButton.addEventListener('click', onCloseSuccessClick);
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onSuccessEscPress);
  };

  var openErrorPopup = function () {
    main.appendChild(errorMessage);
    closeForm.click();

    errorButtons.forEach(function (element) {
      element.addEventListener('click', onCloseErrorClick);
    });

    document.addEventListener('click', onDocumentErrorClick);
    document.addEventListener('keydown', onErrorEscPress);
  };

  var onSubmitClick = function (evt) {
    var errorText = window.getTextError(hashtag.value);

    if (errorText) {
      hashtag.style = 'border: 2px solid red';
      hashtag.setCustomValidity(errorText);
    } else {
      evt.preventDefault();
      evt.stopPropagation();
      hashtag.style = 'border: 2px inset initial';
      window.response.upload(new FormData(form), openErrorPopup, openSuccessPopup);
    }
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.ESC_CODE && document.activeElement !== textDescription && document.activeElement !== hashtag) {
      onCloseFormClick();
    }
  };
  var onUploadFileChange = function () {
    window.getUserPhoto();
    window.changeEffect.addListenersForm();
    submit.addEventListener('click', onSubmitClick);
    closeForm.addEventListener('click', onCloseFormClick);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onCloseFormClick = function () {
    form.reset();
    window.changeEffect.removeListenersForm();
    closeForm.removeEventListener('click', onCloseFormClick);
    document.removeEventListener('keydown', onPopupEscPress);
  };
  uploadFile.addEventListener('change', onUploadFileChange);

})();
