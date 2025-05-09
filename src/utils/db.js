import { openDB } from "idb";

const DB_NAME = "notesDB";
const STORE_NAME = "subjects";

export async function initDB() {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
}

export async function getAllSubjects() {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
}

export async function putSubject(subject) {
  const db = await initDB();
  await db.put(STORE_NAME, subject);
}

export async function deleteSubjectById(id) {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
}
