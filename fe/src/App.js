import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RenderCustomRoute from './routes/route';
import { Route, Routes } from 'react-router-dom/dist';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Route path="*" element={<RenderCustomRoute />} />
      </header>
    </div>
  );
}

export default App;
