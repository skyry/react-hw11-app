import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Form from './components/Form';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <nav className="bg-gray-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link className="text-white text-xl font-bold hover:text-gray-300 transition-colors" to="/">
                  React with Tailwind Form App 
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Form />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;