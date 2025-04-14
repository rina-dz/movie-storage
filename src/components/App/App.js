import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import NotFound from '../NotFound/NotFound';
import Main from '../Main/Main';
import Auth from '../Auth/Auth.js';
import Profile from '../Profile/Profile.js';
import FavMovies from '../FavMovies/FavMovies.js';
import Animatic from '../Animatic/Animatic.js';


function App() {
  const [currentUser, setCurrentUser] = React.useState(
    {
      name: "Пользователь",
      email: 'example@gmail.com',
      favMovies: ["tt18689424", "tt18689425", 'tt31806037', 'tt18923754']
    }
  );
  const [loggedIn, changeState] = React.useState(true);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main isLoggedIn={loggedIn} />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile isLoggedIn={loggedIn} />} />
          <Route path="/fav-movies" element={<FavMovies isLoggedIn={loggedIn} />} />
        </Routes>
        <Animatic />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
