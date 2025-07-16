// NewsAuth.js
import { useState } from "react";

export default function NewsAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Logging in with", formData);
      // handle login API call
    } else {
      console.log("Signing up with", formData);
      // handle signup API call
    }
  };

  return (
    <div className="min-h-screen bg-card-color text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md  bg-  shadow-lg rounded-2xl bg-card-color  p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isLogin ? `Login to News Mania` : "Sign Up for News Mania"}
        </h2>

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
            className="w-full py-3 bg-[#6D54B5] hover:bg-[#574292] rounded-lg font-semibold transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="text-[#6D54B5] hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
