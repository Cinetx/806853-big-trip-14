import { FilterType } from '../const';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.FUTURE]: (points) => points.filter(({ startEvent }) => startEvent >= new Date()),
  [FilterType.PAST]: (points) => points.filter(({ endEvent }) => endEvent < new Date()),
};
