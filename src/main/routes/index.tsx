import { ReactLocation, Outlet, Router, Link, useMatch } from 'react-location';
import { ReactLocationDevtools as ReactDevTools } from 'react-location-devtools';

// pages
import { makeLogin as Login } from '@/main/factories/pages';

// inicialize
const location = new ReactLocation();

const routes = [
  {
    path: '/',
    element: <Login />,
  },
];

function ReactLocationDevtools() {
  return process.env.NODE_ENV === 'development' && <ReactDevTools />;
}

export {
  routes,
  location,
  useMatch,
  Outlet,
  Router,
  Link,
  ReactLocationDevtools,
};
