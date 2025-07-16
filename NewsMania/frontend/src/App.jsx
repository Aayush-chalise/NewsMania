// App.jsx
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import NewsContainer from "./components/NewsContainer";
import NewsListProvider from "./context/NewsListProvider";
import NewsCard from "./components/NewsCard";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

function App() {
  const [isLoginPage, setIsLoginPage] = useState(true);
  return (
    <NewsListProvider>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<h2 className="p-4"> </h2>} />
          <Route path="/about" element={<h2 className="p-4">About Page</h2>} />
          <Route path="/news" element={<h2 className="p-4">News</h2>} />
        </Routes>
        <NewsContainer />
        <NewsCard />
      </Router>
    </NewsListProvider>
  );
}

export default App;
