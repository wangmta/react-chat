import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import loadable from '@loadable/component';

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
      <Route component={loadable(() => import('../pages/TabsPage'))}></Route>
      <Route></Route>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="layout-wrapper">
        <Switch>
          <Route
            exact
            path="/login"
            component={loadable(() => import('../pages/LoginPage'))}
          ></Route>
          <Route
            exact
            path="/signup"
            component={loadable(() => import('../pages/SignUpPage'))}
          ></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
