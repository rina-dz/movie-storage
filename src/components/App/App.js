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
import { newOMDbApi } from '../../utils/OMDbApi.js';

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    email: "",
    password: "",
    favMovies: []
  });
  const [loggedIn, changeState] = React.useState(false);
  const [favMovies, addFavMovies] = React.useState([]);

  if (!localStorage.users) {
    localStorage.setItem('users', JSON.stringify([defaultUser]));
  }

  //localStorage.clear(); 
  // очистить localStorage

  React.useEffect(() => {
    if (localStorage.isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      setCurrentUser({
        name: user.name,
        email: user.email,
        password: user.password,
        favMovies: user.favMovies
      });
      let movies = [];
      user.favMovies.forEach((id) => {
        newOMDbApi.getMovieById(id)
          .then((movie) => {
            movies.push(movie);
          })
          .catch((err) => {
            console.log(err);
          })
      })
      addFavMovies(movies);
      changeState(true);
    }
  }, [loggedIn]);

  // вынести setCurrentUser итд в отдельную функцию

  function handleLogin(info) {
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
          password: user.password,
          favMovies: user.favMovies
        })
        changeState(true);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('currentUser', JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
          favMovies: user.favMovies
        }));
        navigate('/', { replace: true });
      } else {
        console.log('Неверный пароль!');
      }
    } else {
      return console.log('Пользователь не найден!');
    }
  }


  function handleRegister(info) {
    if (localStorage.users) {
      const users = JSON.parse(localStorage.getItem('users'));
      if (users.some((i) => { return i.email === info.email })) {
        return console.log('Почта уже занята!');
      }
    }
    setCurrentUser({
      name: info.name,
      email: info.email,
      password: info.password,
      favMovies: []
    });
    changeState(true);
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('currentUser', JSON.stringify({
      name: info.name,
      email: info.email,
      password: info.password,
      favMovies: []
    }));
    navigate('/', { replace: true });
  }


  function signOut() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    let users = JSON.parse(localStorage.getItem('users'));
    console.log(`Изначальный список юзеров - ${users}`);
    const userIndex = users.findIndex((i) => { return i.email === user.email });
    console.log(`Индекс элемента в массиве - ${userIndex}`);
    if (userIndex >= 0) {
      users.splice(userIndex, 1, user);
      console.log(`Новый список юзеров после замены - ${users}`);
    } else {
      users.push(user);
      console.log(`Новый список юзеров без замены - ${users}`);
    }
    localStorage.setItem('users', JSON.stringify(users));
    setCurrentUser({ name: "", email: "", favMovies: [] });
    changeState(false);
    navigate('/auth', { replace: true });
  }


  function getMovie(info) {
    if (info.name) {
      if (info.year) {
        newOMDbApi.getMovieByNameAndYear(info)
          .then((movie) => {
            //console.log(movie);
            return (movie);
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        newOMDbApi.getMovieByName(info)
          .then((movie) => {
            //console.log(movie);
            return (movie);
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
  }


  function getMovieById(id) {
    newOMDbApi.getMovieById(id)
      .then((movie) => {
        //console.log(movie);
        return (movie);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleLikeMovie(id) {
    if (loggedIn) {
      //добавить значок загрузки чтобы нельзя было перейти в favmovies до добавления
      newOMDbApi.getMovieById(id)
        .then((movie) => {
          addFavMovies([...favMovies, movie]);
          let savedMovies = [...currentUser.favMovies, id];
          let user = currentUser;
          user.favMovies = savedMovies;

          setCurrentUser(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
        })
        .catch((err) => {
          console.log(err);
          alert('Произошла ошибка на сервере');
        })
        .finally(() => {
          // убрать значок загрузки
        })
    } else {
      navigate('/auth', { replace: true });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main isLoggedIn={loggedIn} likeMovie={handleLikeMovie} />} />
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
            movies={favMovies}
          />} />
        </Routes>
        <Animatic />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
