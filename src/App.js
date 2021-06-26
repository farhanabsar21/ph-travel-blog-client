import './App.css';
import './MediaQuery.css';
import Home from './Components/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddPost from './Components/AddPost';
import SingleBlog from './Components/SingleBlog';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute';

export const userAuthData = createContext();

function App() {
  const [userLog, setUserLog] = useState({});
  return (
    <div className="App">
      <userAuthData.Provider value={[userLog, setUserLog]}>
        <Router>
          <Switch>
            <PrivateRoute path="/addPost">
              <AddPost></AddPost>
            </PrivateRoute>
            <Route path="/posts/:blogQuery">
              <SingleBlog></SingleBlog>
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </userAuthData.Provider>
    </div>
  );
}

export default App;
