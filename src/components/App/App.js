import './App.css';
import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import NotFound from '../NotFound/NotFound';



function App() {
  const [currentUser, setCurrentUser] = React.useState({ name: "Пользователь", email: 'example@gmail.com', _id: '14143423' });


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
