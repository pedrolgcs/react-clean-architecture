import { Toaster } from 'react-hot-toast';

// routes
import {
  routes,
  location,
  Outlet,
  Router,
  ReactLocationDevtools,
} from '@/presentation/routes';

function App() {
  return (
    <>
      <Router location={location} routes={routes}>
        <Outlet />
        {process.env.NODE_ENV === 'development' && <ReactLocationDevtools />}
      </Router>
      <Toaster />
    </>
  );
}

export default App;
