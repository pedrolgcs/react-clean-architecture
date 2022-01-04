import { Toaster } from 'react-hot-toast';

// routes
import {
  routes,
  location,
  Outlet,
  Router,
  ReactLocationDevtools,
} from '@/main/routes';

function App() {
  return (
    <>
      <Router location={location} routes={routes}>
        <Outlet />
        {import.meta.env.DEV && <ReactLocationDevtools />}
      </Router>
      <Toaster />
    </>
  );
}

export default App;
