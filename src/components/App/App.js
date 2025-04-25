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
  const [searchedMoviesInfo, addSearchedMoviesInfo] = React.useState({});
  const [searchedMovies, addSearchedMovies] = React.useState([]);
  const [currentMovie, changeMovie] = React.useState();
  const [pageCounter, changePageCounter] = React.useState(1);
  const [moreMoviesStatus, changeMoreMoviesStatus] = React.useState(false);

  if (!localStorage.users) {
    localStorage.setItem('users', JSON.stringify([defaultUser]));
  }

 //  localStorage.clear(); 
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
    localStorage.removeItem('searchInfo')
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
    const userIndex = users.findIndex((i) => { return i.email === user.email });
    if (userIndex >= 0) {
      users.splice(userIndex, 1, user);
    } else {
      users.push(user);
    }
    localStorage.setItem('users', JSON.stringify(users));
    setCurrentUser({ name: "", email: "", favMovies: [] });
    changeState(false);
    navigate('/auth', { replace: true });
  }

  function getMovies(info) {
    let currentInfo = info;
    currentInfo.page = pageCounter;

    if (currentInfo.name) {
      if (currentInfo.year) {
        return newOMDbApi.getMovieByNameAndYear(currentInfo)
          .then((movies) => {
            addSearchedMoviesInfo({
              totalResults: movies.totalResults,
              Response: movies.Response
            });
            pageCounter > 1 ? addSearchedMovies([...searchedMovies, ...movies.Search]) : addSearchedMovies(movies.Search);
            movies.totalResults === '10' ? changeMoreMoviesStatus(false) :
              movies.totalResults > searchedMovies.length ? changeMoreMoviesStatus(true) : changeMoreMoviesStatus(false);
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        return newOMDbApi.getMovieByName(currentInfo)
          .then((movies) => {
            addSearchedMoviesInfo({
              totalResults: movies.totalResults,
              Response: movies.Response
            });
            pageCounter > 1 ? addSearchedMovies([...searchedMovies, ...movies.Search]) : addSearchedMovies(movies.Search);
            movies.totalResults === '10' ? changeMoreMoviesStatus(false) :
              movies.totalResults > searchedMovies.length ? changeMoreMoviesStatus(true) : changeMoreMoviesStatus(false);
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
  }

  function getMovieById(id) {
    return newOMDbApi.getMovieById(id)
      .catch((err) => {
        console.log(err);
      })
  }

  function handleLikeMovie(id) {
    if (loggedIn) {
       return newOMDbApi.getMovieById(id)
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
    } else {
      navigate('/auth', { replace: true });
    }
  }

  function handleDislikeMovie(id) {
    let newFavMovies = favMovies.filter((movie) => movie.imdbID !== id);
    addFavMovies(newFavMovies);
    let user = currentUser;
    let moviesId = user.favMovies.filter((movieId) => movieId !== id);
    user.favMovies = moviesId;
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  function navigateToMovie(id) {
    newOMDbApi.getMovieById(id)
      .then((movie) => {
        changeMovie(movie);
      })
      .then(() => {
        navigate('/movie', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function getNextPage(info) {
    changePageCounter(pageCounter + 1);
    return getMovies(info);
  }

  // обновляется только при втором нажатии на поиск
  // та же проблема с кнопкой ещё - открывает новые фильмы, но при первом нажатии нужно тыкнутть дважды 
  function reloadSearch() {
    changePageCounter(1);
    addSearchedMovies([]);
    addSearchedMoviesInfo({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main
            likeMovie={handleLikeMovie} dislikeMovie={handleDislikeMovie} getNextPage={getNextPage}
            reloadSearch={reloadSearch}
            getMovies={getMovies} searchedMovies={searchedMovies} searchedMoviesInfo={searchedMoviesInfo}
            navigateToMovie={navigateToMovie} getMovieById={getMovieById} moreMoviesStatus={moreMoviesStatus} />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/auth" element={<Auth handleLogin={handleLogin} handleRegister={handleRegister} />} />
          <Route path="/movie" element={<ProtectedRoute element={Movie}
            isAllowIn={currentMovie} likeMovie={handleLikeMovie}
            navigateToMovie={navigateToMovie} getMovieById={getMovieById}
            dislikeMovie={handleDislikeMovie} movie={currentMovie} />} />
          <Route path="/profile" element={<ProtectedRoute element={Profile}
            isAllowIn={loggedIn} signOut={signOut}
            navigateToMovie={navigateToMovie} getMovieById={getMovieById}
          />} />
          <Route path="/fav-movies" element={<ProtectedRoute element={FavMovies}
            isAllowIn={loggedIn} movies={favMovies}
            likeMovie={handleLikeMovie} dislikeMovie={handleDislikeMovie}
            navigateToMovie={navigateToMovie} getMovieById={getMovieById}
          />} />
        </Routes>
        <Animatic />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;




// if (info.name) {
//   if (info.year) {
//     return newOMDbApi.getMovieByNameAndYear(info)
//       .then((movies) => {
//         console.log(movies);
//         addSearchedMoviesInfo({
//           totalResults: movies.totalResults,
//           Response: movies.Response
//         });
//         //if (pageCounter > 1) 
//         pageCounter > 1 ? addSearchedMovies(...searchedMovies, movies.Search) : addSearchedMovies(movies.Search);
//         //addSearchedMovies(movies.Search)
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   } else {
//     return newOMDbApi.getMovieByName(info)
//       .then((movies) => {
//         addSearchedMoviesInfo({
//           totalResults: movies.totalResults,
//           Response: movies.Response
//         });
//         pageCounter > 1 ? addSearchedMovies(...searchedMovies, movies.Search) : addSearchedMovies(movies.Search);
//         //addSearchedMovies(movies.Search)
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   }
// }