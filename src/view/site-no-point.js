import AbstractView from './abstract';

const createSiteNoPoint = () => {
  return (
    '<p class="trip-events__msg">Click New Event to create your first point</p>'
  );
};

export default class SiteNoPoint extends AbstractView {
  getTemplate() {
    return createSiteNoPoint();
  }
}
