import { createElement } from '../utils/util.js';
const createSiteWaypointList = () => {
  return (
    `<ul class="trip-events__list">
    </ul>`
  );
}


export default class SiteWaypointList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSiteWaypointList();
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
