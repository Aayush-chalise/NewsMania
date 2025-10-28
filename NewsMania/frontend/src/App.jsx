// App.jsx
import "./index.css";
import Notes from "./components/Notes";
import { Routes, Route, useLocation } from "react-router-dom";
import NewsListProvider from "./context/NewsListProvider";
import NewsAuth from "./components/NewsAuth";
import Home from "./components/Home";
import { AnimatePresence } from "framer-motion";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const location = useLocation();
  return (
    <NewsListProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<NewsAuth />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>
    </NewsListProvider>
  );
}

export default App;
