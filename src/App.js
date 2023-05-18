// components
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// hooks
import { useAuthContext } from './hooks/useAuthContext';
// pages
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Timeline from './pages/timeline/Timeline';
import Profile from './pages/profile/Profile';
import Search from './pages/search/Search';
import Notification from './pages/notifications/Notification';
import PostPage from './pages/post/PostPage';

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={!user ? <Login /> : <Timeline />} />
            <Route path='/login' element={!user ? <Login /> : <Timeline />} />
            <Route path='/signup' element={!user ? <Signup /> : <Timeline />} />
            <Route path='/:uid' element={!user ? <Login /> : <Profile />} />
            <Route path='/search' element={!user ? <Login /> : <Search />} />
            <Route path='/notifications/:uid' element={!user ? <Login /> : <Notification />} />
            <Route path='/post/:postId' element={!user ? <Login /> : <PostPage />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
