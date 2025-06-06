import { useState, useEffect } from "react";
import { notesStorage } from "../lib/storage.jsx";

export function useProfile() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const profile = await notesStorage.getProfile();
      if (profile?.userName) {
        setUserName(profile.userName);
      }
    };
    loadProfile();
  }, []);

  useEffect(() => {
    if (userName) {
      notesStorage.saveProfile({ userName });
    }
  }, [userName]);

  const exportData = async () => {
    const subjects = await notesStorage.getSubjects();
    const profile = await notesStorage.getProfile();

    const exportData = {
      subjects: subjects || [],
      profile: profile || {},
      exportDate: new Date().toISOString(),
      version: "1.0",
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `my-notes-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importData = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          const content = e.target?.result;
          const data = JSON.parse(content);

          if (data.subjects && Array.isArray(data.subjects)) {
            await notesStorage.saveSubjects(data.subjects);
          }

          if (data.profile) {
            await notesStorage.saveProfile(data.profile);
            if (data.profile.userName) {
              setUserName(data.profile.userName);
            }
          }

          window.location.reload();
          resolve();
        } catch (error) {
          reject(new Error("Invalid file format"));
        }
      };

      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  };

  return {
    userName,
    setUserName,
    exportData,
    importData,
  };
}
