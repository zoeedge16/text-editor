import { openDB } from 'idb';

const initdb = async () =>
  openDB('jateDB', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB('jateDB', 1);
  const text = db.transaction('jate', 'readwrite');
  const store = text.objectStore('jate');
  const request = store.put({ value: content });
  const result = await request;
  console.log('item added to database', result)
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('jateDB', 1);
  const text = db.transaction('jate', 'readonly');
  const store = text.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('all items retrieved from database', result);
  return result.value
};

initdb();
