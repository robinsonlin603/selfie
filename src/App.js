import { BrowserRouter as Router , Routes , Route , Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// styles
import './App.css';

// pages and components
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import Navbar from './components/Navbar';
import NewPosts from "./pages/posts/NewPosts";

function App() {
  const { authIsReady , user } = useAuthContext();

  return (
    <div className="App">
      { authIsReady && (
         <Router>
          <div className="container">
            { user && <Navbar/> }
            <Routes>
              <Route path="/" element={ user? <Home /> : <Navigate to="/login" />} />
              <Route path="/posts" element={ user? <NewPosts /> : <Navigate to="/login" />} />
              <Route path="/login" element={ user? <Navigate to="/" /> : <Login />} />
              <Route path="/signup" element={ user? <Navigate to="/" /> : <Signup />} />
            </Routes>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
