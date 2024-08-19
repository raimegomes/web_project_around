export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Método para renderizar as imagens
  renderItems() {
    this._items.forEach((item) => {
      const cardElement = this._renderer(item);
      this._container.prepend(cardElement);
    });
  }

  // Método para add um novo item ao card
  addItem(element) {
    this._container.prepend(element);
  }
}
