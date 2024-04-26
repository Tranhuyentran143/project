import logo from './logo.svg';
import './App.css';
import HeaderComponent from './components/organisms/header/header';
import ProductDetail from './pages/site-customer/products/productDetail';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HeaderComponent>
        </HeaderComponent>
      </header>
    </div>
  );
}

export default App;
