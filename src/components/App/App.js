import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import NotFound from '../NotFound/NotFound';
import Header from '../Header/Header';
import Auth from '../Auth/Auth.js';
import Animatic from '../Animatic/Animatic.js'


function App() {
  const [currentUser, setCurrentUser] = React.useState({ name: "Пользователь", email: 'example@gmail.com', _id: '14143423' });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
        <Animatic />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
