import {NativeModules} from 'react-native';

const {CalendarManager} = NativeModules;

interface CalendarManagerInterface {
  addEvent(
    title: string,
    location: string,
    startDate: number,
    endDate: number,
  ): Promise<string>;
}

export default CalendarManager as CalendarManagerInterface;
