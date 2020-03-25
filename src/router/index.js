import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

const FUNCTION_ROUTERS = [
  '/',
  '/robot_chat',
  '/group_chat/:to_group_id',
  '/private_chat/:user_id',
  '/setting'
];

const AUTH_ROUTERS = ['/login', '/signup'];

function MainView(props) {
  const { pathName } = props.location;
  if (AUTH_ROUTERS.indexOf(pathName) < 0 && !localStorage.getItem('userInfo')) {
    sessionStorage.setItem('originalLink', window.location.href);
    props.history.push('/login');
  }

  let MainViewClassName =
    pathName === '/' || pathName === '/setting' ? 'layout-left' : 'layout-left-mobile';

  return (
    <div className={MainViewClassName}>
      {/* <Route component={}></Route>
      <Route></Route>
      <Route></Route> */}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="layout-wrapper">
        <Switch>
          <Route exact path="/login" component={LoginPage}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
