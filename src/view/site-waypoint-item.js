import dayjs from 'dayjs';

const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

const createOffer = (offer) => {
  return `<li class="event__offer">
  <span class="event__offer-title">${offer.title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${offer.price}</span>
</li>`;
};

const showDurationTime = (duration) => {
  const day = Math.floor(+duration / MINUTES_IN_HOUR / HOURS_IN_DAY);
  const hour = Math.floor((+duration - day * HOURS_IN_DAY * MINUTES_IN_HOUR) / MINUTES_IN_HOUR);
  const minute = +duration % MINUTES_IN_HOUR;

  if (day) {
    return `${day}D ${hour ? hour : '00'}H ${minute ? minute : '00'}M`;
  }

  if (hour) {
    return `${hour}H ${minute ? minute : '00'}M`;
  }

  if (minute) {
    return `${minute}M`;
  }
};
export const createSiteWaypointItemTemplate = (task) => {
  const { type, city, favorite, price, startEvent, endEvent, offers } = task;

  const dateStart = dayjs(startEvent).format('YYYY-MM-DDTHH:mm');
  const dateEnd = dayjs(endEvent).format('YYYY-MM-DDTHH:mm');

  const dayStart = dayjs(startEvent).format('MMM DD');
  const dateDayStart = dayjs(startEvent).format('YYYY-MM-DD');
  const dateTimeStart = dayjs(startEvent).format('HH:mm');
  const dateTimeEnd =   dayjs(endEvent).format('HH:mm');

  const duration = Math.abs(dayjs(startEvent).diff(dayjs(endEvent), 'm'));
  const addOffersToMarkup = offers.map((item)=>
     createOffer(item)
  ).join(' ');

  const favoriteClassName = favorite ? 'event__favorite-btn event__favorite-btn--active' : 'event__favorite-btn';
  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateDayStart}">${dayStart}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${city}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateStart}">${dateTimeStart}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateEnd}">${dateTimeEnd}</time>
        </p>
        <p class="event__duration">${showDurationTime(duration)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
       ${addOffersToMarkup}
      </ul>
      <button class="${favoriteClassName}" type="button">
  <span class="visually-hidden"> Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z" />
    </svg>
      </button >
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
    </div >
  </li >
  `;
};
