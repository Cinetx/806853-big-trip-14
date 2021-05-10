import dayjs from 'dayjs';

const CITIES_MORE_THEN = 3;

export const getTotalPrice = (taskList) => {
  let totalPrice = 0;
  taskList.forEach((task) => {
    totalPrice += task.price;
  });
  return totalPrice;
};

export const getRoute = (taskList) => {
  const route1 = taskList[0].city;
  const route2 = taskList[1].city;
  const route3 = taskList[taskList.length - 1].city;
  if (taskList.length > CITIES_MORE_THEN) {
    return `${route1} &mdash; ... &mdash; ${route3}`;
  }
  return `${route1} &mdash; ${route2} &mdash; ${route3}`;
};

export const sortTaskTime = (taskA, taskB) => {
  return dayjs(taskB.startEvent).diff(dayjs(taskA.startEvent)) - dayjs(taskB.endEvent).diff(dayjs(taskA.endEvent));
};

export const sortTaskPrice = (taskA, taskB) => {
  return taskB.price - taskA.price;
};


export const createOffersMarkup = (offers) => {
  let offerId = 1;
  return offers
    .map((item) => {
      return `
      <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerId}" type="checkbox"
        name="event-offer-${item.title}">
        <label class="event__offer-label" for="event-offer-${offerId++}">
          <span class="event__offer-title">${item.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${item.price}</span>
        </label>
      </div>
      `;
    })
    .join(' ');
};
