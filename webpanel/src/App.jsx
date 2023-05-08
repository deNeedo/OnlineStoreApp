import { useState } from 'react';
import './App.css';
import { Login } from './components/Login';
import { Register } from './components/Register';

// * import logo from './logo.svg';

function App() {
    const [currentForm, setCurrentForm] = useState('login')

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }
    
    return (
        <div>
          {
            currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm}  />
          }
        </div>
    );
}


export default App;
