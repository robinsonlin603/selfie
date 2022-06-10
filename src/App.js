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
import Login from "./pages/login/js/Login";
import Signup from "./pages/signup/js/Signup";
import Home from "./pages/home/js/Home";
import Navbar from "./components/js/Navbar";
import Profile from "./pages/profile/js/Profile";
import Post from "./components/js/Post";
import Chat from "./pages/chat/js/Chat";
import Conversation from "./pages/chat/js/Conversation";
import Friendlist from "./pages/friendlist/js/Friendlist";
import Introduce from "./pages/introduce/js/Introduce";

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
              <Route path="/" element={user ? <Home /> : <Introduce />} />
              <Route
                path="/profile/:id"
                element={user ? <Profile /> : <Navigate to="/login" />}
              />
              <Route
                path="/friendlist"
                element={user ? <Friendlist /> : <Navigate to="/login" />}
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
