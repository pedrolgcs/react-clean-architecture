import {
  ReactLocation,
  Outlet,
  Router,
  Link,
  useMatch,
  useLocation,
  useNavigate,
} from 'react-location';
import { ReactLocationDevtools as ReactDevTools } from 'react-location-devtools';

// pages
import {
  makeLogin as Login,
  makeDashboard as Dashboard,
} from '@/main/factories/pages';

// components
import { PrivateRouter } from './PrivateRouter';

// inicialize
const location = new ReactLocation();

const routes = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRouter>
        <Dashboard />
      </PrivateRouter>
    ),
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
  useLocation,
  useNavigate,
};
