import SiteMenuView from './view/site-menu.js';
import SiteRouteInfoView from './view/site-route-info.js';
import SiteCostTravelView from './view/site-cost-travel.js';
import SiteFilterView from './view/site-filter.js';
import SiteSortingView from './view/site-sorting.js';
import SiteCreateFormView from './view/site-create-form.js';
import SiteEditingFormView from './view/site-editing-form.js';
import SiteWaypointListView from './view/site-waypoint-list.js';
import SiteWaypointItemView from './view/site-waypoint-item.js';
import SiteNoPointView from './view/site-no-point.js';
import { generateTask } from './view/mock/task.js';
import { render, RenderPosition, replace } from './utils/render.js';

const TASK_COUNT = 15;
const taskList = new Array(TASK_COUNT).fill().map(generateTask);

const siteMainElement = document.querySelector('.trip-main');
const siteMenuElement = siteMainElement.querySelector('.trip-controls__navigation');
const siteFiltersElement = siteMainElement.querySelector('.trip-controls__filters');
const siteEventsElement = document.querySelector('.trip-events');

const pointListComponent = new SiteWaypointListView();

render(siteMenuElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(siteFiltersElement, new SiteFilterView(), RenderPosition.BEFOREEND);

const renderPoint = (taskListElement, task) => {
  const pointComponent = new SiteWaypointItemView(task);
  const pointEditComponent = new SiteEditingFormView(task);

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  const replacePointToForm = () => {
    replace(pointEditComponent, pointComponent);
    // taskListElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToPoint = () => {
    replace(pointComponent, pointEditComponent);
    // taskListElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  pointComponent.setEditClickHandler(() => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setEditClickHandler(() => {
    replaceFormToPoint();
    document.addEventListener('keydown', onEscKeyDown);
  });
  render(taskListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

if (taskList.length <= 0) {
  render(siteEventsElement, new SiteNoPointView(), RenderPosition.BEFOREEND);
} else {
  render(siteMainElement, new SiteCostTravelView(taskList), RenderPosition.AFTERBEGIN);
  render(siteMainElement, new SiteRouteInfoView(taskList), RenderPosition.AFTERBEGIN);
  render(siteEventsElement, new SiteSortingView(), RenderPosition.BEFOREEND);
  render(siteEventsElement, new SiteCreateFormView(taskList[0]), RenderPosition.BEFOREEND);
  render(siteEventsElement, pointListComponent, RenderPosition.BEFOREEND);
  for (let i = 0; i < TASK_COUNT; i++) {
    renderPoint(pointListComponent.getElement(), taskList[i]);
  }
}
