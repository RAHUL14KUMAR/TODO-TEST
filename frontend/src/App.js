import { BrowserRouter,Routes,Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Tasks from './components/Tasks/Tasks';

function App() {


  return (
    <BrowserRouter>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={<Tasks/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
