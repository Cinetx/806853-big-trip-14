
import SiteEditingFormView from '../view/site-editing-form.js';
import SiteWaypointItemView from '../view/site-waypoint-item.js';
import { render, RenderPosition, replace, remove } from '../utils/render.js';


const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Point {
  constructor(waypointListContainer, changeData, changeMode) {
    this._pointListContainer = waypointListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormEditClick = this._handleFormEditClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(task) {
    this._task = task;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new SiteWaypointItemView(task);
    this._pointEditComponent = new SiteEditingFormView(task);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setEditClickHandler(this._handleFormEditClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this._pointListContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._pointListContainer.getElement().contains(prevPointComponent.getElement())) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._pointListContainer.getElement().contains(prevPointEditComponent.getElement())) {
      if (this._mode === Mode.DEFAULT) {
        replace(this._taskPointComponent, prevPointEditComponent);
      }
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  _replacePointToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);

    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);

    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToPoint();
    }
  }

  _handleEditClick() {
    this._replacePointToForm();
  }

  _handleFormSubmit(task) {
    this._changeData(task);
    this._replaceFormToPoint();
  }

  _handleFormEditClick() {
    this._replaceFormToPoint();
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._task,
        {
          favorite: !this._task.favorite,
        },
      ),
    );
  }

}
