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
import { CheckPermissions } from './CheckPermissions';

// inicialize
const location = new ReactLocation();

const routes = [
  {
    path: '/',
    element: (
      <CheckPermissions>
        <Login />
      </CheckPermissions>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <CheckPermissions isPrivate>
        <Dashboard />
      </CheckPermissions>
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
