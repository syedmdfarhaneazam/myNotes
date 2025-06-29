import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { ColorPaletteProvider } from "./context/ColorPaletteContext";
import { NotesProvider } from "./context/NotesContext";
import Layout from "./components/Layout";
import NotesPage from "./pages/NotesPage";
import ProfilePage from "./pages/ProfilePage";
import "./style/global.css";

function App() {
  return (
    <ThemeProvider>
      <ColorPaletteProvider>
        <NotesProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/notes" replace />} />
                <Route path="notes" element={<NotesPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </Router>
        </NotesProvider>
      </ColorPaletteProvider>
    </ThemeProvider>
  );
}

export default App;
