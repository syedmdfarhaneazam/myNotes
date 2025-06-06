import { openDB } from "idb";

class NotesStorage {
  constructor() {
    this.db = null;
  }

  async initDB() {
    if (this.db) return this.db;

    this.db = await openDB("MyNotesDB", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("subjects")) {
          db.createObjectStore("subjects");
        }
        if (!db.objectStoreNames.contains("profile")) {
          db.createObjectStore("profile");
        }
      },
    });

    return this.db;
  }

  async saveSubjects(subjects) {
    const db = await this.initDB();
    await db.put("subjects", subjects, "data");
  }

  async getSubjects() {
    const db = await this.initDB();
    return (await db.get("subjects", "data")) || null;
  }

  async saveProfile(profile) {
    const db = await this.initDB();
    await db.put("profile", profile, "data");
  }

  async getProfile() {
    const db = await this.initDB();
    return (await db.get("profile", "data")) || null;
  }
}

export const notesStorage = new NotesStorage();
