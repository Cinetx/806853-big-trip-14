import { createSiteMenuTemplate } from './view/site-menu.js';
import { createSiteRouteInfoTemplate } from './view/site-route-info.js';
import { createSiteCostTravelTemplate } from './view/site-cost-travel.js';
import { createSiteFilterTemplate } from './view/site-filter.js';
import { createSiteSortingTemplate } from './view/site-sorting.js';
import { createSiteCreateFormTemplate } from './view/site-create-form.js';
import { createSiteEditingFormTemplate } from './view/site-editing-form.js';
import { createSiteWaypointListTemplate } from './view/site-waypoint-list.js';
import { createSiteWaypointItemTemplate } from './view/site-waypoint-item.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const siteMainElement = document.querySelector('.trip-main');
const siteMenuElement = siteMainElement.querySelector('.trip-controls__navigation');
const siteFiltersElement = siteMainElement.querySelector('.trip-controls__filters');
const siteEventsElement = document.querySelector('.trip-events');

render(siteMenuElement, createSiteMenuTemplate(), 'beforeend');
render(siteMainElement, createSiteCostTravelTemplate(), 'afterbegin');
render(siteMainElement, createSiteRouteInfoTemplate(), 'afterbegin');

render(siteFiltersElement, createSiteFilterTemplate(), 'beforeend');
render(siteEventsElement, createSiteSortingTemplate(), 'beforeend');
render(siteEventsElement, createSiteCreateFormTemplate(), 'beforeend');

render(siteEventsElement, createSiteWaypointListTemplate(), 'beforeend');
const siteTripEventList = siteEventsElement.querySelector('.trip-events__list');

for (let i = 0; i < 3; i++) {
  render(siteTripEventList, createSiteWaypointItemTemplate(), 'beforeend');
}

const siteTripEventItem = siteTripEventList.querySelectorAll('.trip-events__item')[0];
render(siteTripEventItem, createSiteEditingFormTemplate(), 'beforeend');
