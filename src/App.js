
import './App.scss';
import { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom'
import Header from './Header/Header';
import Register from './Register/Register';
import Feed from './Feed/Feed';
import Login from './Login/Login';
import { UserService } from './services/user.service';
import { UserContext } from './user-context'
import PostCreate from './PostCreate/PostCreate';
import { withRouter } from 'react-router'
import PostPage from './PostPage/PostPage';
import Profile from './Profile/Profile';
import Search from './Search/Search';
import ProfileEdit from './ProfileEdit/ProfileEdit';




function App({ location }) {

  const history = useHistory()
  const [user, setUser] = useState({})

  useEffect(() => {
    async function getMe() {
      try {
        const user = await UserService.me()
        if (!user) {
          history.push('/login')
          return;
        }
        setUser(user)
      } catch (err) {
        console.log(err)
      }
    }
    getMe()
  }, [history])

  const urlPathes = ['/login', '/Login', '/Register', '/register']


  function isLogged() {
    return Boolean(Object.keys(user).length);
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="app-container d-flex flex-column sm-reverse  ">

        {!urlPathes.includes(location.pathname) && isLogged() && <Header />}

        <div className="container App-container ">
          <Switch>
          {/* <Route path="/post/:id/like">
              <PostLike/>
            </Route> */}
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/post/create">
              <PostCreate />
            </Route>
            <Route path="/post/:id" >
              <PostPage />
            </Route>
            <Route path="/profile/:username">
              <Profile />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/ProfileEdit">
              <ProfileEdit/>
            </Route>
            <Route path="/" >
              <Feed />
            </Route>
          </Switch>
        </div>
      </div>
    </UserContext.Provider>

  );
}

export default withRouter(App);
