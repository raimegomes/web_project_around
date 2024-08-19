import Popup from "./popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._formElement = this._popupElement.querySelector("form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(this._formElement.querySelectorAll("input"));
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  getFormElement() {
    return this._formElement;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
