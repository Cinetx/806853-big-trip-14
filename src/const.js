import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { getRandomArrayItem, getRandomInt } from './utils/common';
import { generateTaskPhotos } from './view/mock/task';
export const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const TASK_INFO = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
];
export const TASK_CITY = ['Emperors dacha', 'citadel', 'City on the edge of eternity', 'Dimension C-132', 'Gravity Falls'];
export const TASK_TYPE = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

export const OFFERS = [
  {
    title: 'add luggage',
    price: 50,
  },
  {
    title: 'switch to comfort class',
    price: 100,
  },
  {
    title: 'add meal',
    price: 15,
  },
  {
    title: 'choose seats',
    price: 5,
  },
  {
    title: 'travel by train',
    price: 40,
  },
];

export const PICKER_SETTINGS = {
  dateFormat: 'd/m/y H:i',
  enableTime: true,
  time_24hr: true,
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const DEFAULT_TASK = {
  id: nanoid(),
  startEvent: dayjs().toDate(),
  endEvent: dayjs().toDate(),
  type: getRandomArrayItem(TASK_TYPE),
  city: getRandomArrayItem(TASK_CITY),
  info: getRandomArrayItem(TASK_INFO),
  photos: new Array(5).fill().map(generateTaskPhotos),
  price: getRandomInt(1, 10000),
  date: dayjs().toDate(),
  favorite: Boolean(getRandomInt(0, 1)),
  offers: [
    OFFERS[getRandomInt(0, OFFERS.length - 1)],
  ],
};

