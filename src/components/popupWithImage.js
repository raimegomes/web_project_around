import Popup from "./popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector(
      ".elements__window-image"
    );
    this._popupTitle = this._popupElement.querySelector(
      ".elements__window-name"
    );
  }

  open(imageSrc, imageAlt, imageTitle) {
    if (this._popupImage && this._popupTitle) {
      this._popupImage.src = imageSrc;
      this._popupImage.alt = imageAlt;
      this._popupTitle.textContent = imageTitle;
    } else {
      console.error("Elementos de imagem ou título não encontrados.");
    }
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    const closeButton = this._popupElement.querySelector(
      "#window-close-button"
    );
    if (closeButton) {
      closeButton.addEventListener("click", () => this.close());
    } else {
      console.error("Botão de fechar não encontrado.");
    }
  }
}
