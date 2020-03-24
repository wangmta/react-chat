import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="layout-wrapper">
        <Switch>
          <Route exact path="/" component={LoginPage}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
