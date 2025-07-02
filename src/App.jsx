import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ColorPaletteProvider } from "./context/ColorPaletteContext";
import { NotesProvider } from "./context/NotesContext";
import { UserPreferencesProvider } from "./context/UserPreferencesContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import NotesPage from "./pages/NotesPage";
import ProfilePage from "./pages/ProfilePage";
import AppearancePage from "./pages/profile/AppearancePage";
import DataManagementPage from "./pages/profile/DataManagementPage";
import GeneralSettingsPage from "./pages/profile/GeneralSettingsPage";
import "./style/global.css";

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <ColorPaletteProvider>
          <UserPreferencesProvider>
            <NotesProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/notes" replace />} />
                    <Route path="notes" element={<NotesPage />} />
                    <Route path="profile" element={<ProfilePage />}>
                      <Route
                        index
                        element={<Navigate to="/profile/appearance" replace />}
                      />
                      <Route path="appearance" element={<AppearancePage />} />
                      <Route path="data" element={<DataManagementPage />} />
                      <Route path="general" element={<GeneralSettingsPage />} />
                    </Route>
                  </Route>
                </Routes>
              </Router>
            </NotesProvider>
          </UserPreferencesProvider>
        </ColorPaletteProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
