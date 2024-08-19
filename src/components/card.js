import likeImg from "../images/like.svg";
import likedImg from "../images/like-activated.svg";

export class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  // Método para criar o card
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._link, this._name);
      });
    this._element
      .querySelector(".element__trash-icon")
      .addEventListener("click", () => this._handleDeleteCard());

    //função de like
    const likeButton = this._element.querySelector(".element__like");
    likeButton.src = likeImg;
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => this._handleLikeIcon());
  }
  // Método para remover o card de img
  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  // Método para lidar com o like
  _handleLikeIcon() {
    const likeBtn = this._element.querySelector(".element__like");
    // Alterna entre as imagens de like e liked
    if (likeBtn.src.includes(likeImg)) {
      likeBtn.src = likedImg;
    } else {
      likeBtn.src = likeImg;
    }
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
