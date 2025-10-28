// NewsAuth.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function NewsAuth() {
  const [responseDataFromServer, setResponseDataFromServer] = useState(null); // ✅ state to store backend response

  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data;
    if (!isLogin) {
      const response = await fetch(
        "https://newsmania-2.onrender.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      data = await response.json();
      setResponseDataFromServer(data); // ✅ store the response data in state
    } else {
      const response = await fetch(
        "https://newsmania-2.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      data = await response.json();
    }
    if (data.token) {
      localStorage.setItem("token", data.token); // Store token in localStorage
      navigate("/home");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-card-color text-white flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md  bg-  shadow-lg rounded-2xl bg-card-color  p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isLogin ? `Login to News Mania` : "Sign Up for News Mania"}
        </h2>
        {responseDataFromServer && (
          <h3 className=" ml-16 mb-5 text-theme-color">
            {responseDataFromServer.error}
          </h3>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-[#3C364C] text-white focus:outline-none focus:ring-2 focus:ring-[#887EA3]"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-[#3C364C] text-white focus:outline-none focus:ring-2 focus:ring-[#887EA3]"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-[#3C364C] text-white focus:outline-none focus:ring-2 focus:ring-[#887EA3]"
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-theme-color hover:bg-[#d86e6e] rounded-lg font-semibold transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="text-theme-color hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </motion.div>
  );
}

const response = await fetch("", {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: {},
});
