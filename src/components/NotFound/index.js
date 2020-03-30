import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

export default function NotFound() {
  return (
    <section className="page-404">
      <div className="container">
        <div className="bg-404">
          <h1>404</h1>
        </div>
        <div className="content-box">
          <p>The page doesn't exist.</p>
          <Link className="link" to="/">
            Go To Home Page
          </Link>
        </div>
      </div>
    </section>
  );
}
