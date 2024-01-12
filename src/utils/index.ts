import {DateTime} from 'luxon';

export const createDate = (ISODate: string, time: string) => {
  let date = DateTime.fromISO(ISODate);
  const timeArr = time.split(':');
  date = date.set({
    hour: parseInt(timeArr[0]),
    minute: parseInt(timeArr[1]),
  });

  return date;
};
