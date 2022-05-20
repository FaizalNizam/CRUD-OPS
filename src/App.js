import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css"
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import AddUserDetails from './components/AddUserDetails';

function App() {
  return (
    <div className="App">
      <Routes >
        <Route exact path="/" element={<Home />} />
        <Route exact path="/add" element={<AddUserDetails/>} />
        <Route exact path="/add/:user_id" element={<AddUserDetails/>} />
      </Routes>
    </div>
  );
}

export default App;
