import dayjs from 'dayjs';
import { getRandomArrayItem, getRandomInt } from '../../utils/common';

const TASK_INFO = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
];
const TASK_CITY = ['Emperors dacha', 'citadel', 'City on the edge of eternity', 'Dimension C-132', 'Gravity Falls'];
const TASK_TYPE = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const OFFERS = [
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

const generateTaskPhotos = () => {
  return `http://picsum.photos/248/152?r=${getRandomInt(1, 5)}`;
};

const generateDate = () => {
  const days = getRandomInt(1, 6);
  const hours = getRandomInt(0, 23);
  const minutes = getRandomInt(1, 59);
  return dayjs().add(days, 'd').add(hours, 'h').add(minutes, 'm').toDate();
};

const generateOffers = () => {
  return Array.from(
    new Set(
      new Array(getRandomInt(1, 5))
        .fill()
        .map(() => OFFERS[getRandomInt(0, OFFERS.length - 1)]),
    ),
  );
};

export const generateTask = () => {
  return {
    startEvent: generateDate(),
    endEvent: generateDate(),
    type: getRandomArrayItem(TASK_TYPE),
    city: getRandomArrayItem(TASK_CITY),
    info: getRandomArrayItem(TASK_INFO),
    photos: new Array(5).fill().map(generateTaskPhotos),
    price: getRandomInt(1, 10000),
    date: generateDate(),
    favorite: Boolean(getRandomInt(0, 1)),
    offers: generateOffers(),
  };
};
