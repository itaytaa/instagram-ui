
import './App.scss';
import { useEffect } from 'react';
import { Switch, Route,useHistory } from 'react-router-dom'
import Header from './Header/Header';
import Register from './Register/Register';
import Feed from './Feed/Feed';
import Login from './Login/Login';
import { UserService } from './services/user.service';





function App() {
  const history = useHistory()

  useEffect(() => {
    async function getMe() {
      try {
        const user = await UserService.me()
        if (!user) {
          history.push('/login')
        }
      } catch (err) {
        console.log(err)
      }
    }
    getMe()
  }, [history])


  return (

    <div className="App">
      <Header />
      <div className="container">
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/" exact>
            <Feed />
          </Route>
        </Switch>
      </div>
    </div>

  );
}

export default App;
