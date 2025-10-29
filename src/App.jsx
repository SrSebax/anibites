import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components';
import { Home, New, Calendar, Stats } from './pages';
import './styles/index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-kawaii-cream font-sans">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nueva-venta" element={<New />} />
            <Route path="/calendario" element={<Calendar />} />
            <Route path="/estadisticas" element={<Stats />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
