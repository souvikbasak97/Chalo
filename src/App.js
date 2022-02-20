import './App.css';
import {Crud} from './components/Crud';
import {GoogleMap} from './components/MapComponent';
import { SimpleForm } from './components/SimpleForm';
import { BrowserRouter,Routes,Route} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AddEdit} from './pages/AddEdit';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route exact path="/" element={<Crud/>}></Route>
          <Route path="/update/:id" element={<AddEdit/>}></Route>
        </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
