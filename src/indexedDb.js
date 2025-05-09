import { openDB } from "idb";

const DB_NAME = "MyNotesDB";
const STORE_NAME = "subjects";

export const initDB = async () => {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

export const saveSubjects = async (subjects) => {
  const db = await initDB();
  await db.put(STORE_NAME, subjects, "data");
};

export const getSubjects = async () => {
  const db = await initDB();
  return (await db.get(STORE_NAME, "data")) || null;
};
