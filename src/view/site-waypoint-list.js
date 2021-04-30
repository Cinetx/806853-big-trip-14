import AbstractView from './abstract';
const createSiteWaypointList = () => {
  return (
    `<ul class="trip-events__list">
    </ul>`
  );
};


export default class SiteWaypointList extends AbstractView {
  getTemplate() {
    return createSiteWaypointList();
  }
}
