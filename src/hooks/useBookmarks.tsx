import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export const useBookmarks = () => {
  const checkBookmark = (eventId: string) => {
    const event = storage.getString(eventId);
    if (!event) {
      return false;
    } else {
      return true;
    }
  };

  const saveToBookmarks = (event: ArticEvent) => {
    storage.set(event.id.toString(), JSON.stringify(event));
  };

  const removeFromBookmarks = (eventId: string) => {
    storage.delete(eventId);
  };

  const getBookmarks = () => {
    const keys = storage.getAllKeys();

    return keys.map(key => {
      const eventString = storage.getString(key);
      return JSON.parse(eventString as string) as ArticEvent;
    });
  };

  return {
    checkBookmark,
    removeFromBookmarks,
    saveToBookmarks,
    getBookmarks,
  };
};
