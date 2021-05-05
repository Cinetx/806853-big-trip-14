import SiteMenuView from './view/site-menu.js';
import SiteFilterView from './view/site-filter.js';
import SiteCostTravelView from './view/site-cost-travel';
import SiteRouteInfoView from './view/site-route-info';
import { generateTask } from './view/mock/task.js';
import { render, RenderPosition } from './utils/render.js';
import TripPresenter from './presenter/trip';

const TASK_COUNT = 15;

const taskList = new Array(TASK_COUNT).fill().map(generateTask);

const siteMainElement = document.querySelector('.trip-main');
const siteMenuElement = siteMainElement.querySelector('.trip-controls__navigation');
const siteFiltersElement = siteMainElement.querySelector('.trip-controls__filters');
const siteEventsElement = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter(siteEventsElement);
tripPresenter.init(taskList);


render(siteMenuElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(siteFiltersElement, new SiteFilterView(), RenderPosition.BEFOREEND);
if (taskList.length > 0) {
  render(siteMainElement, new SiteCostTravelView(taskList), RenderPosition.AFTERBEGIN);
  render(siteMainElement, new SiteRouteInfoView(taskList), RenderPosition.AFTERBEGIN);
}
