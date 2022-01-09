import { Toaster } from 'react-hot-toast';

// context
import { AppProvider } from '@/presentation/contexts';

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
    <AppProvider>
      <Router location={location} routes={routes}>
        <Outlet />
        {process.env.NODE_ENV === 'development' && <ReactLocationDevtools />}
      </Router>
      <Toaster />
    </AppProvider>
  );
}

export default App;
