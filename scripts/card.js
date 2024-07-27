export class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._element
      .querySelector(".element__trash-icon")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleImageClick();
      });
  }

  _handleLikeIcon() {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleImageClick() {
    const imagePopup = document.querySelector("#image-popup");
    const imagePopupImage = imagePopup.querySelector(".elements__window-image");
    const imagePopupCaption = imagePopup.querySelector(
      ".elements__window-name"
    );

    imagePopupImage.src = this._link;
    imagePopupCaption.textContent = this._name;
    imagePopup.classList.add("image-popup_opened");
  }

  getCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    this._element.querySelector(".element__name").textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
