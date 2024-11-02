import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [handleEmailErorr, setHandleEmailErorr] = useState(null);
  const [signupMesg, setsignupMesg] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);

    try {
      const res = await axios.post("http://localhost:5000/SignUp", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.message === "Email already exists.") {
        setHandleEmailErorr("Oops! An account with this email already exists!");
      } else if (res.data.message === "User created successfully.") {
        setsignupMesg(
          "Your account has been created successfully! , redirecting to Login..."
        );
        setHandleEmailErorr("");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-[url('../../.././wallpaper.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center h-screen">
      <div className="bg-white p-8  rounded-lg shadow-md w-96 backdrop-blur-md bg-opacity-60">
        {profilePic && (
          <img
            className="absolute top-5 right-5 w-10  h-10 z-999 rounded-full "
            src={profilePic}
            alt="ss"
          />
        )}
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create a new account
        </h2>
        <span className="block text-green-500 text-sm font-bold mb-2">
          {signupMesg}
        </span>
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
            <span className="block text-red-500 text-sm font-bold mb-2">
              {handleEmailErorr}
            </span>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Username
            </label>
            <input
              type="username"
              id="username"
              placeholder="Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
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
          <input
            className="mb-6"
            type="file"
            name="file"
            accept="image/*"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              setImage(selectedFile);
              setProfilePic(URL.createObjectURL(selectedFile));
              // console.log(selectedFile);
            }}
          />
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold focus:outline-none focus:shadow-outline rounded w-full py-2 px-3"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-gray-600 text-sm">
          Don`t have an account?
          <Link className="text-blue-500 hover:text-blue-700" to="/login">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
