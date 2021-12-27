import { Toaster } from 'react-hot-toast';

// pages
import { Login } from '@/presentation/pages/';

function App() {
  return (
    <div className="App">
      <Login />
      <Toaster />
    </div>
  );
}

export default App;
