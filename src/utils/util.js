const CITIES_MORE_THEN = 3;

const getTotalPrice = (taskList) => {
  let totalPrice = 0;
  taskList.forEach((task) => {
    totalPrice += task.price;
  });
  return totalPrice;
};

const getRoute = (taskList) => {
  const route1 = taskList[0].city;
  const route2 = taskList[1].city;
  const route3 = taskList[taskList.length - 1].city;
  if (taskList.length > CITIES_MORE_THEN) {
    return `${route1} &mdash; ... &mdash; ${route3}`;
  }
  return `${route1} &mdash; ${route2} &mdash; ${route3}`;
};


const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};


const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export { getTotalPrice, getRoute, createElement, renderElement, RenderPosition};
