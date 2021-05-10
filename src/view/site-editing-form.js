import { TASK_INFO } from '../const';
import { getRandomArrayItem } from '../utils/common';
import { renderPhoto } from '../utils/render';
import { getFormatDate } from '../utils/time';
import { createOffersMarkup } from '../utils/util';
import { generateOffers, generateTaskPhotos } from './mock/task';
import SmartView from './smart';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createSiteEditingForm = (task) => {

  const { type, city, price, startEvent, endEvent, info, offers, photos } = task;
  const [dateStart, dateEnd] = getFormatDate(startEvent, endEvent);

  return (
    `<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

          <div class="event__type-item">
            <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi"
            ${type.toLowerCase() === 'Taxi' ? 'checked' : ''}>
            <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus"
            ${type.toLowerCase() === 'bus' ? 'checked' : ''}
            >
            <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train"
            ${type.toLowerCase() === 'train' ? 'checked' : ''}
            >
            <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship"
            ${type.toLowerCase() === 'ship' ? 'checked' : ''}
            >
            <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport"
            ${type.toLowerCase() === 'transport' ? 'checked' : ''}
            >
            <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive"
            ${type.toLowerCase() === 'drive' ? 'checked' : ''}
            >
            <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight"
            ${type.toLowerCase() === 'flight' ? 'checked' : ''}
            >
            <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in"
            ${type.toLowerCase() === 'check-in' ? 'checked' : ''}
            >
            <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing"
            ${type.toLowerCase() === 'sightseeing' ? 'checked' : ''}
            >
            <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant"
            ${type.toLowerCase() === 'restaurant' ? 'checked' : ''}
            >
            <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
          </div>
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
      <datalist id="destination-list-1">
        <option value="Amsterdam"></option>
        <option value="Geneva"></option>
        <option value="Chamonix"></option>
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateStart}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
      ${createOffersMarkup(offers)}
      </div>
    </section>

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${info}</p>
    </section>

    <div class="event__photos-container">
        <div class="event__photos-tape">
        ${renderPhoto(photos)}
        </div>
      </div>

  </section>
</form>`
  );
};

export default class SiteEditingForm extends SmartView {
  constructor(point) {
    super();
    this._data = SiteEditingForm.parsePointToData(point);
    this._datepicker = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._routeTypeChangeHandler = this._routeTypeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
    this._dateStartChangeHandler = this._dateStartChangeHandler.bind(this);
    this._dateEndChangeHandler = this._dateEndChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepickerStart();
    this._setDatepickerEnd();
  }

  _setDatepickerStart() {
    if (this._startPicker) {
      this._startPicker.destroy();
      this._startPicker = null;
    }


    this._startPicker = flatpickr(this.getElement().querySelector('#event-start-time-1'), {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      time_24hr: true,
      onChange: this._dateStartChangeHandler,
      minDate: this._data.startEvent,
    });


  }

  _setDatepickerEnd() {
    if (this._endPicker) {
      this._endPicker.destroy();
      this._endPicker = null;
    }

    this._dateState = this._data.endEvent;

    this._endPicker = flatpickr(this.getElement().querySelector('#event-end-time-1'), {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      time_24hr: true,
      minDate: this._data.endEvent,
      onChange: this._dateEndChangeHandler,
    });
  }

  _dateStartChangeHandler([userDate]) {
    this.updateData(
      {
        endEvent: userDate,
      },
      true,
    );

    this._endPicker.set('minDate', userDate);
    this._endPicker.set('minTime', userDate);

    if (this._dateState <= userDate) {
      this._endPicker.setDate(userDate);
      this._dateState = userDate;
    }
  }

  _dateEndChangeHandler([userDate]) {
    this._dateState = userDate;

    this.updateData(
      {
        startEvent: userDate,
      },
      true,
    );
  }

  _priceChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({ price: evt.target.value });
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      city: evt.target.value,
      info: getRandomArrayItem(TASK_INFO),
      photos: new Array(5).fill().map(generateTaskPhotos),
    });
  }

  _routeTypeChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
      offers: generateOffers() });
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._destinationChangeHandler);

    this.getElement().querySelector('.event__input--price').addEventListener('change', this._priceChangeHandler);
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._routeTypeChangeHandler);
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  reset(point) {
    this.updateData(SiteEditingForm.parsePointToData(point));
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this._setDatepickerStart();
    this._setDatepickerEnd();
  }

  getTemplate() {
    return createSiteEditingForm(this._data);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(SiteEditingForm.parseDataToPoint(this._data));
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener('submit', this._formSubmitHandler);
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  static parsePointToData(data) {
    return Object.assign({}, data);
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);
    return;
  }
}
