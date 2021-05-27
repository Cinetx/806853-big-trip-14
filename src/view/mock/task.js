import dayjs from 'dayjs';
import { getRandomArrayItem, getRandomInt } from '../../utils/common';
import { nanoid } from 'nanoid';
import { TASK_INFO, TASK_CITY, TASK_TYPE, OFFERS } from '../../const';

export const generateTaskPhotos = () => {
  return `http://picsum.photos/248/152?r=${getRandomInt(1, 5)}`;
};

const generateDate = () => {
  const days = getRandomInt(1, 6);
  const hours = getRandomInt(0, 23);
  const minutes = getRandomInt(1, 59);
  return dayjs().add(days, 'd').add(hours, 'h').add(minutes, 'm').toDate();
};


export const generateOffers = () => {
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
    id: nanoid(),
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


