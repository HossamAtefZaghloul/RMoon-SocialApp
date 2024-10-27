import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/signUp/SignUp.jsx";
import Login from "./Pages/login/Login.jsx";
import Home from "./Pages/home/Home.jsx";
import "./app.css";
import ProtectedRoute from "./components/ProtectedRoute.js";
import { UserProvider } from "./components/useContexts/UserProvider.jsx";
import { PostsProvider } from "./components/useContexts/PostProvider.jsx";

import ProfilePage from "./Pages/profilePage/ProfilePage.jsx";
function App() {
  return (
    <PostsProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profilepage"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </PostsProvider>
  );
}

export default App;
