import { getRoute } from '../utils/util.js';
import AbstractView from './abstract';
import { getDayStartAndEnd } from '../utils/time';

const createSiteRouteInfo = (taskList) => {
  const [dayStart, dayEnd] = getDayStartAndEnd(taskList);

  return (
    `<div class="trip-info__main">
  <h1 class="trip-info__title">${getRoute(taskList)}</h1>

  <p class="trip-info__dates">${dayStart}&nbsp;&mdash;&nbsp;${dayEnd}</p>
</div>`
  );
};

export default class SiteRouteInfo extends AbstractView {
  constructor(point) {
    super();
    this._point = point;
  }

  getTemplate() {
    return createSiteRouteInfo(this._point);
  }
}

