import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import Home from './components/home/home-index';
import Job from './components/job/job-index';
import Test from './components/test/test-index';

function NotFound() {
  return (
      <div className="jngl__home">
          <h1>Not found!</h1>
      </div>
  );
}

const routes = (
  <Route>
    <Route path="/" component={ Home } />
    <Route path="/job/:id" component={ Job } />
    <Route path="/test" component={ Test } />
    <Route path="*" component={ NotFound } />
  </Route>
);

export default routes;
