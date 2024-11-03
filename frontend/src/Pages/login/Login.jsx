import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { UserContext } from "../../components/useContexts/UserProvider.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [handleError, setHandleError] = useState(null);
  const [msgColor, setMsgColor] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
      } else {
        navigate("/home");
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);

      if (res.data === "InvalidEmail" || res.data === "InvalidPassword") {
        setMsgColor(false);
        setHandleError(
          "Invalid login credentials. Please check your username and password and try again."
        );
      } else if (res.data.token) {
        const token = res.data.token;
        const user = res.data.user;
        localStorage.setItem("token", token);

        setUser(user);
        setMsgColor(true);
        setHandleError("Logged in successfully! Redirecting...");

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-[url('../../.././wallpaper.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 backdrop-blur-md bg-opacity-60">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              autoComplete="current-email"
              type="email"
              id="email"
              placeholder="you@example.com"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span
              className={`block ${
                msgColor ? "text-green-500" : "text-red-500"
              } text-sm font-bold mb-2`}
            >
              {handleError}
            </span>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              autoComplete="current-password"
              type="password"
              id="password"
              placeholder="********"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold focus:outline-none focus:shadow-outline rounded w-full py-2 px-3"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <Link className="text-blue-500 hover:text-blue-700" to="/signUp">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
