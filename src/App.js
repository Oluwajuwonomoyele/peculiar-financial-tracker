import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar'
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const { authIsReady, user } = useAuthContext()
  const spinner = document.getElementById('spinner')

  if(spinner && authIsReady){
    setTimeout(() => {
      spinner.style.display = 'none'
    }, 2000)
  }

  return (
    <>
      { authIsReady && (
        <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={ user ? <Home /> : <Navigate to='/login' />} />
          <Route path='/signup' element={ user ? <Navigate to='/' /> : <SignUp />} />
          <Route path='/login' element={ user ? <Navigate to='/' /> : <LogIn />} />
        </Routes>
      </Router>
      )}
    </>
  );
}

export default App;
