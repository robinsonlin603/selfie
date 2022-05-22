import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { usePostContext } from "./hooks/usePostContext";

// styles
import "./App.css";

// pages and components
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import Navbar from "./components/Navbar";
import Profile from "./pages/profile/Profile";
import Post from "./components/Post";
import Chat from "./pages/chat/Chat";
import Conversation from "./pages/chat/Conversation";

function App() {
  const { authIsReady, user } = useAuthContext();
  const { data } = usePostContext();

  return (
    <div className="App">
      {authIsReady && (
        <Router>
          <div className="container">
            {user && <Navbar />}
            {data && <Post postInfo={data} />}
            <Routes>
              <Route
                path="/"
                element={user ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/profile/:id"
                element={user ? <Profile /> : <Navigate to="/login" />}
              />
              <Route
                path="/chat"
                element={user ? <Chat /> : <Navigate to="/login" />}
              >
                <Route path=":id" element={<Conversation />} />
              </Route>
              <Route
                path="/login"
                element={user ? <Navigate to="/" /> : <Login />}
              />
              <Route
                path="/signup"
                element={user ? <Navigate to="/" /> : <Signup />}
              />
            </Routes>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
