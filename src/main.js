import SiteMenuView from './view/site-menu.js';
import SiteCostTravelView from './view/site-cost-travel';
import SiteRouteInfoView from './view/site-route-info';
import { render, RenderPosition } from './utils/render.js';
import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';
import PointsModel from './model/point.js';
import FilterModel from './model/filter-model.js';
import { generateTask } from './view/mock/task.js';

const siteMainElement = document.querySelector('.trip-main');
const siteMenuElement = siteMainElement.querySelector('.trip-controls__navigation');
const siteEventsElement = document.querySelector('.trip-events');
const sitefilterElement = siteMainElement.querySelector('.trip-controls__filters');


const TASK_COUNT = 15;
const taskList = new Array(TASK_COUNT).fill().map(generateTask);

const filterModel = new FilterModel();
const pointsModel = new PointsModel();
pointsModel.setPoints(taskList);

const tripPresenter = new TripPresenter(siteEventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(sitefilterElement, filterModel, pointsModel);

filterPresenter.init();
tripPresenter.init();

render(siteMenuElement, new SiteMenuView(), RenderPosition.BEFOREEND);
if (taskList.length > 0) {
  render(siteMainElement, new SiteCostTravelView(taskList), RenderPosition.AFTERBEGIN);
  render(siteMainElement, new SiteRouteInfoView(taskList), RenderPosition.AFTERBEGIN);
}

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();

});
