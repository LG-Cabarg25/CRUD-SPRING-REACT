import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdoptPage from './pages/AdoptPage';
import { PetProvider } from './context/PetContext';
import { OwnerProvider } from './context/OwnerContex'; // Importa OwnerProvider

const App = () => {
  return (
    <PetProvider>
      <OwnerProvider> 
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/adoptar" element={<AdoptPage />} />
          </Routes>
        </Router>
      </OwnerProvider>
    </PetProvider>
  );
};

export default App;
