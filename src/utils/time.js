import dayjs from 'dayjs';
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

export const getDayStartAndEnd = (taskList) => {
  const dayStart = dayjs(taskList[0].dateFrom).format('MMM D');
  const dayEnd = dayjs(taskList[taskList.length - 1].endEvent).format('MMM D');
  return [dayStart, dayEnd];
};

export const getFormatDate = (startEvent, endEvent) => {
  const dateStart = dayjs(startEvent).format('YYYY-MM-DDTHH:mm');
  const dateEnd = dayjs(endEvent).format('YYYY-MM-DDTHH:mm');

  const dayMonthStart = dayjs(startEvent).format('MMM DD');
  const dateDayMonthYearStart = dayjs(startEvent).format('YYYY-MM-DD');
  const dateTimeStart = dayjs(startEvent).format('HH:mm');
  const dateTimeEnd = dayjs(endEvent).format('HH:mm');

  const duration = Math.abs(dayjs(startEvent).diff(dayjs(endEvent), 'm'));

  return [dateStart, dateEnd, dayMonthStart, dateDayMonthYearStart, dateTimeStart, dateTimeEnd, duration];
};

export const showDurationTime = (duration) => {
  const day = Math.floor(+duration / MINUTES_IN_HOUR / HOURS_IN_DAY);
  const hour = Math.floor((+duration - day * HOURS_IN_DAY * MINUTES_IN_HOUR) / MINUTES_IN_HOUR);
  const minute = +duration % MINUTES_IN_HOUR;

  return day ? `${day}D ${hour}H ${minute}M` :
    hour ? `${hour}H ${minute}M` : `${minute}M`;
};
