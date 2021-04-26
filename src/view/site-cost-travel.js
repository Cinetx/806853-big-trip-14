import { getTotalPrice, createElement } from '../utils/util.js';

const createCostTravel = (taskList) => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice(taskList)}</span>
    </p>`
  );
};

export default class SiteCostTravel {
  constructor(cost) {
    this._cost = cost;
    this._element = null;
  }

  getTemplate() {
    return createCostTravel(this._cost);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    };

    return this._element;
  };

  removeElement() {
    this._element = null;
  };
}
