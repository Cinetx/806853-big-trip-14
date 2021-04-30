import { getTotalPrice } from '../utils/util.js';
import AbstractView from './abstract';
const createCostTravel = (taskList) => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice(taskList)}</span>
    </p>`
  );
};

export default class SiteCostTravel extends AbstractView {
  constructor(cost) {
    super();
    this._cost = cost;
  }

  getTemplate() {
    return createCostTravel(this._cost);
  }
}
