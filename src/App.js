import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './homePage/HomePage';
import Orders from './orders/Orders';
import Products from './products/Products'; 




function App() {
  return (
    <div className="App">
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
        
      </main>
    </div>
  );
}

export default App;
