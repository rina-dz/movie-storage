import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import NotFound from '../NotFound/NotFound';
import Main from '../Main/Main';
import Auth from '../Auth/Auth.js';
import Profile from '../Profile/Profile.js';
import FavMovies from '../FavMovies/FavMovies.js';
import Movie from '../Movie/Movie';
import Animatic from '../Animatic/Animatic.js';
import defaultUser from '../../utils/defaultUser.js';

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    email: "",
    favMovies: []
  });
  const [loggedIn, changeState] = React.useState(false);

  // localStorage.clear(); очистить localStorage

  React.useEffect(() => {
    if (localStorage.isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      setCurrentUser({
        name: user.name,
        email: user.email,
        favMovies: user.favMovies
      });
      changeState(true);
    }
  }, [loggedIn]);

  //   const defaultUser = {
  // name: "Котя",
  // email: 'kotik@mail.meow',
  // password: 'meowmeow',
  // favMovies: ["tt18689424", "tt0312528", 'tt0347618', 'tt0118843', 'tt0051459', 'tt3606888', 'tt0068612']
  // };

  function handleLogin(info) {
    if (info.email === defaultUser.email) {
      if (info.password === defaultUser.password) {
        setCurrentUser({
          name: defaultUser.name,
          email: defaultUser.email,
          favMovies: defaultUser.favMovies
        });
        changeState(true);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('currentUser', JSON.stringify({
          name: defaultUser.name,
          email: defaultUser.email,
          favMovies: defaultUser.favMovies
        }));
        navigate('/', { replace: true });
      } else {
        console.log('Неверный пароль!');
      }
    } else {
      if (localStorage.users) {
        const users = JSON.parse(localStorage.users);
        const user = users.find((i) => { return i.email === info.email });
        if (!user) {
          return console.log('Пользователь не найден!');
        }
        if (info.password === user.password) {
          setCurrentUser({
            name: user.name,
            email: user.email,
            favMovies: user.favMovies
          })
          changeState(true);
          localStorage.setItem('isLoggedIn', true);
          localStorage.setItem('currentUser', JSON.stringify({
            name: user.name,
            email: user.email,
            favMovies: user.favMovies
          }));
          navigate('/', { replace: true });
        } else {
          console.log('Неверный пароль!');
        }
      } else {
        console.log('Пользователь не найден!');
      }
    }
  }
  //meow@mail.com
  function handleRegister(info) {
    if (info.email === defaultUser.email) {
      return console.log('Почта уже занята!');
    } else {
      if (localStorage.users) {
        const users = JSON.parse(localStorage.getItem('users'));
        if (users.some((i) => { return i.email === info.email })) {
          return console.log('Почта уже занята!');
        }
      }
    }

    setCurrentUser({
      name: info.name,
      email: info.email,
      favMovies: []
    });
    changeState(true);

    console.log(JSON.stringify({
      name: info.name,
      email: info.email,
      favMovies: []
    }));
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('currentUser', JSON.stringify({
      name: info.name,
      email: info.email,
      favMovies: []
    }));

    const user = {
      name: info.name,
      email: info.email,
      password: info.password,
      favMovies: []
    };

    //doggy@gav.com qwerty

    if (localStorage.users) {
      const users = JSON.parse(localStorage.getItem('users'));
      const newUsers = JSON.stringify([...users, user]);
      localStorage.setItem('users', newUsers);
    } else {
      const newUsers = JSON.stringify([user]);
      localStorage.setItem('users', newUsers);
    }

    console.log(`users без парса ${localStorage.getItem('users')}`);
    console.log(`users c парсом ${JSON.parse(localStorage.getItem('users'))}`);

    navigate('/', { replace: true });
  }

  function signOut() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    setCurrentUser({ name: "", email: "", favMovies: [] });
    changeState(false);
    navigate('/auth', { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main isLoggedIn={loggedIn} />} />
          <Route path="/exmp" element={<Movie isLoggedIn={loggedIn} />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/auth" element={<Auth handleLogin={handleLogin} handleRegister={handleRegister} />} />
          <Route path="/profile" element={<ProtectedRoute
            isLoggedIn={loggedIn}
            signOut={signOut}
            element={Profile}
          />} />
          <Route path="/fav-movies" element={<ProtectedRoute
            isLoggedIn={loggedIn}
            element={FavMovies}
          />} />
        </Routes>
        <Animatic />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
