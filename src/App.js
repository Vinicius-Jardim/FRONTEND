import { Route, Routes } from 'react-router-dom';
import './App.css';
import Products from './Products/Products';
import HomePage from './homePage/HomePage';



function App() {
  return (
    <div className="App">
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
        </Routes>
        
      </main>
    </div>
  );
}

export default App;
