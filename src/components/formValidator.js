export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement);
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  }

  _showInputError(inputElement, errorElement) {
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
  }

  _toggleButtonState() {
    if (this._submitButton) {
      if (this._hasInvalidInput()) {
        this._submitButton.disabled = true;
      } else {
        this._submitButton.disabled = false;
      }
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(
        `#${inputElement.id}-error`
      );
      this._hideInputError(inputElement, errorElement);
    });
    this._toggleButtonState();
  }
}
