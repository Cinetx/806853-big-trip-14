const getTotalPrice = (taskList) => {
  let totalPrice = 0;
  taskList.forEach((task) => {
    totalPrice += task.price
  })
  return totalPrice
};

export const createSiteCostTravelTemplate = (taskList) => {
  return `<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice(taskList)}</span>
</p>`;
};
