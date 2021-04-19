import { createSiteMenuTemplate } from './view/site-menu.js';
import { createSiteRouteInfoTemplate } from './view/site-route-info.js';
import { createSiteCostTravelTemplate } from './view/site-cost-travel.js';
import { createSiteFilterTemplate } from './view/site-filter.js';
import { createSiteSortingTemplate } from './view/site-sorting.js';
import { createSiteCreateFormTemplate } from './view/site-create-form.js';
import { createSiteEditingFormTemplate } from './view/site-editing-form.js';
import { createSiteWaypointListTemplate } from './view/site-waypoint-list.js';
import { createSiteWaypointItemTemplate } from './view/site-waypoint-item.js';

import { generateTask } from './view/mock/task.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const TASK_COUNT = 15;
const taskList = new Array(TASK_COUNT).fill().map(generateTask);

const siteMainElement = document.querySelector('.trip-main');
const siteMenuElement = siteMainElement.querySelector('.trip-controls__navigation');
const siteFiltersElement = siteMainElement.querySelector('.trip-controls__filters');
const siteEventsElement = document.querySelector('.trip-events');

render(siteMenuElement, createSiteMenuTemplate(), 'beforeend');
render(siteMainElement, createSiteCostTravelTemplate(taskList), 'afterbegin');
render(siteMainElement, createSiteRouteInfoTemplate(taskList), 'afterbegin');

render(siteFiltersElement, createSiteFilterTemplate(), 'beforeend');
render(siteEventsElement, createSiteSortingTemplate(), 'beforeend');
render(siteEventsElement, createSiteCreateFormTemplate(taskList[0]), 'beforeend');
render(siteEventsElement, createSiteWaypointListTemplate(), 'beforeend');

const siteTripEventList = siteEventsElement.querySelector('.trip-events__list');

for (let i = 0; i < TASK_COUNT; i++) {
  render(siteTripEventList, createSiteWaypointItemTemplate(taskList[i]), 'beforeend');
}
const siteTripEventItem = siteTripEventList.querySelectorAll('.trip-events__item')[0];
render(siteTripEventItem, createSiteEditingFormTemplate(taskList[0]), 'beforeend');
