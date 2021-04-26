import SiteMenuView from './view/site-menu.js';
import SiteRouteInfoView from './view/site-route-info.js';
import SiteCostTravelView from './view/site-cost-travel.js';
import SiteFilterView from './view/site-filter.js';
import SiteSortingView from './view/site-sorting.js';
import SiteCreateFormView from './view/site-create-form.js';
import SiteEditingFormView from './view/site-editing-form.js';

import SiteWaypointListView from './view/site-waypoint-list.js';
import SiteWaypointItemView from './view/site-waypoint-item.js';
import { generateTask } from './view/mock/task.js';
import { renderElement, RenderPosition } from './utils/util.js';

const TASK_COUNT = 15;
const taskList = new Array(TASK_COUNT).fill().map(generateTask);

const siteMainElement = document.querySelector('.trip-main');
const siteMenuElement = siteMainElement.querySelector('.trip-controls__navigation');
const siteFiltersElement = siteMainElement.querySelector('.trip-controls__filters');
const siteEventsElement = document.querySelector('.trip-events');

const pointListComponent = new SiteWaypointListView()

renderElement(siteMenuElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SiteCostTravelView(taskList).getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteMainElement, new SiteRouteInfoView(taskList).getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteFiltersElement, new SiteFilterView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteEventsElement, new SiteSortingView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteEventsElement, new SiteCreateFormView(taskList[0]).getElement(), RenderPosition.BEFOREEND);
renderElement(siteEventsElement, pointListComponent.getElement(), RenderPosition.BEFOREEND);

const renderPoint = (taskListElement, task) => {
  const pointComponent = new SiteWaypointItemView(task);
  const pointEditComponent = new SiteEditingFormView(task);


  const replacePointToForm = () => {
    taskListElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToPoint = () => {
    taskListElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToForm();
  });

  pointEditComponent.getElement().addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
  });

  renderElement(taskListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

for (let i = 0; i < TASK_COUNT; i++) {
  renderPoint(pointListComponent.getElement(), taskList[i]);
}
