import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { store } from './store/store.js';
import { Provider } from 'react-redux'; 
import './index.css'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)