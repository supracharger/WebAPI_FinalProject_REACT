import './App.css';
import MovieHeader from './components/movieheader';
import Authentication from './components/authentication';
import Cart from './components/cart';
import ItemList from './components/itemlist';
import {HashRouter, Routes,  Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <HashRouter> {/* The Router component */}
        <MovieHeader />
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/itemlist" element={<ItemList />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/signin" element={<Authentication />}/>
          {/*... other routes */}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
