import { Toaster } from 'react-hot-toast';

// context
import { GlobalProvider } from '@/presentation/contexts';

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
    <GlobalProvider>
      <Router location={location} routes={routes}>
        <Outlet />
        {process.env.NODE_ENV === 'development' && <ReactLocationDevtools />}
      </Router>
      <Toaster />
    </GlobalProvider>
  );
}

export default App;
