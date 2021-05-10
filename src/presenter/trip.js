import SiteSortingView from '../view/site-sorting.js';
import SiteWaypointListView from '../view/site-waypoint-list.js';
import SiteWaypointItemView from '../view/site-waypoint-item.js';
import SiteNoPointView from '../view/site-no-point.js';
import PointPresenter from './point.js';
import { render, RenderPosition } from '../utils/render.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';
import { sortTaskTime, sortTaskPrice } from '../utils/util.js';

const TASK_COUNT = 15;

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._renderTaskCount = TASK_COUNT;
    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;

    this._handleTaskChange = this._handleTaskChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._SiteSortingComponent = new SiteSortingView();
    this._SiteWaypointListComponent = new SiteWaypointListView();
    this._SiteWaypointItemComponent = new SiteWaypointItemView();
    this._SiteNoPointComponent = new SiteNoPointView();
  }


  init(tripTasks) {
    this._tripTasks = tripTasks.slice();
    this._sourcedTripTasks = tripTasks.slice();
    this._renderTrip();
  }

  _handleTaskChange(updatedTask) {
    this._tripTasks = updateItem(this._tripTasks, updatedTask);
    this._sourcedTripTasks = updateItem(this._sourcedTripTasks, updatedTask);
    this._pointPresenter[updatedTask.id].init(updatedTask);
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _sortTasks(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._tripTasks.sort(sortTaskTime);
        break;
      case SortType.PRICE:
        this._tripTasks.sort(sortTaskPrice);
        break;
      default:
        this._tripTasks = this._sourcedTripTasks.slice();
    }

    this._currentSortType = sortType;


  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortTasks(sortType);
    this._clearWaypointList();
    this._renderWaypointItem();
  }

  _renderNoPoint() {
    render(this._tripContainer, this._SiteNoPointComponent, RenderPosition.BEFOREEND);
  }


  _renderPoint(task) {

    const pointPresenter = new PointPresenter(
      this._SiteWaypointListComponent,
      this._handleTaskChange,
      this._handleModeChange,
    );
    pointPresenter.init(task);
    this._pointPresenter[task.id] = pointPresenter;
  }

  _renderSorting() {
    render(this._tripContainer, this._SiteSortingComponent, RenderPosition.BEFOREEND);

    this._SiteSortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _clearWaypointList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
    this._renderedTaskCount = TASK_COUNT;
  }

  _renderWaypointList() {
    render(this._tripContainer, this._SiteWaypointListComponent, RenderPosition.BEFOREEND);
  }

  _renderWaypointItem() {
    for (let i = 0; i < this._renderTaskCount; i++) {
      this._renderPoint(this._tripTasks[i]);
    }
  }
  _renderTrip() {
    if (this._tripTasks.length <= 0) {
      this._renderNoPoint();
    }

    this._renderSorting();
    this._renderWaypointList();
    this._renderWaypointItem();
  }
}
