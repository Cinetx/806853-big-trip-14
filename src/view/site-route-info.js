import dayjs from 'dayjs';
import { getRoute, createElement } from '../utils/util.js';

const createSiteRouteInfo = (taskList) => {
  const dayStart = dayjs(taskList[0].dateFrom).format('MMM D');
  const dayEnd = dayjs(taskList[taskList.length - 1].endEvent).format('MMM D');
  return (
    `<div class="trip-info__main">
  <h1 class="trip-info__title">${getRoute(taskList)}</h1>

  <p class="trip-info__dates">${dayStart}&nbsp;&mdash;&nbsp;${dayEnd}</p>
</div>`
  );
};

export default class SiteRouteInfo {
  constructor(point) {
    this._point = point;
    this._element = null;
  }

  getTemplate() {
    return createSiteRouteInfo(this._point);
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

