import dayjs from 'dayjs';
const getRoute = (taskList) => {
  const route1 = taskList[0].city;
  const route2 = taskList[1].city;
  const route3 = taskList[2].city;
  return `${route1} &mdash; ${route2} &mdash; ${route3}`;
};

export const createSiteRouteInfoTemplate = (taskList) => {
  const dayStart = dayjs(taskList[0].dateFrom).format('MMM D');
  const dayEnd = dayjs(taskList[taskList.length - 1].endEvent).format('MMM D');
  return `<div class="trip-info__main">
  <h1 class="trip-info__title">${getRoute(taskList)}</h1>

  <p class="trip-info__dates">${dayStart}&nbsp;&mdash;&nbsp;${dayEnd}</p>
</div>`;
};
