// components
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// hooks
import { useAuthContext } from './hooks/useAuthContext';
// pages
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Timeline from './pages/timeline/Timeline';
// styles
import './App.css';

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
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
