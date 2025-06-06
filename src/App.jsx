import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "./components/ui/Toaster.jsx";
import NotesLayout from "./layouts/NotesLayout.jsx";
import NotesPage from "./pages/NotesPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Routes>
        <Route path="/" element={<Navigate to="/notes" replace />} />
        <Route path="/notes" element={<NotesLayout />}>
          <Route index element={<NotesPage />} />
        </Route>
        <Route path="/profile" element={<NotesLayout />}>
          <Route index element={<ProfilePage />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
