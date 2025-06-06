import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar.jsx";

export default function NotesLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div className="pt-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
