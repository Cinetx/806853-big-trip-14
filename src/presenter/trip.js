import SiteSortingView from '../view/site-sorting.js';
import SiteWaypointListView from '../view/site-waypoint-list.js';
import SiteWaypointItemView from '../view/site-waypoint-item.js';
import SiteNoPointView from '../view/site-no-point.js';
import PointPresenter from './point.js';
import PointNewPresenter from './point-new';


import { render, RenderPosition, remove } from '../utils/render.js';

import { SortType, UpdateType, UserAction } from '../const.js';
import { sortTaskTime, sortTaskPrice } from '../utils/util.js';
import { filter } from '../utils/filter';
import { FilterType } from '../const';

const TASK_COUNT = 15;

export default class Trip {

  constructor(tripContainer, pointsModel, filterModel) {
    this._tripContainer = tripContainer;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._renderTaskCount = TASK_COUNT;
    this._pointPresenter = {};

    this._currentSortType = SortType.DAY;

    this._sortComponent = null;

    this._siteWaypointListComponent = new SiteWaypointListView();
    this._siteWaypointItemComponent = new SiteWaypointItemView();
    this._siteNoPointComponent = new SiteNoPointView();
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._pointNewPresenter = new PointNewPresenter(this._siteWaypointListComponent, this._handleViewAction);
  }

  init() {
    this._renderBoard();
    render(this._tripContainer, this._siteWaypointListComponent, RenderPosition.BEFOREEND);

  }

  createPoint() {
    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init();
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortTaskTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortTaskPrice);
    }

    return filteredPoints;
  }

  _handleViewAction(actionType, updateType, update) {

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;

      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;

      case UpdateType.MAJOR:
        this._clearBoard({
          resetSortType: true,
        });
        this._renderBoard();
        break;
    }
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _sortTasks() {
    switch (this._currentSortType) {
      case SortType.TIME:
        return this._pointsModel.getPoints().slice().sort(sortTaskTime);
      case SortType.PRICE:
        return this._pointsModel.getPoints().slice().sort(sortTaskPrice);
    }

    return this._tasksModel.getPoints();
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard();
    this._renderBoard();
  }

  _renderNoPoint() {
    render(this._tripContainer, this._siteNoPointComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(task) {
    const pointPresenter = new PointPresenter(
      this._siteWaypointListComponent,
      this._handleViewAction,
      this._handleModeChange,
    );
    pointPresenter.init(task);
    this._pointPresenter[task.id] = pointPresenter;
  }

  _renderPoints(tasks) {
    tasks.forEach((task) => this._renderPoint(task));
  }

  _renderSorting() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SiteSortingView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _clearBoard({ resetSortType = false } = {}) {

    Object.values(this._pointPresenter).forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._sortComponent);
    remove(this._siteNoPointComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _renderBoard() {
    const pointCount = this._getPoints().length;
    const points = this._getPoints().slice(0, Math.min(pointCount, TASK_COUNT));
    this._renderSorting();
    this._renderPoints(points);
  }
}
