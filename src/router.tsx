import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Packages from './pages/Packages';
import GuideHajj from './pages/GuideHajj';
import GuideOmra from './pages/GuideOmra';
import About from './pages/About';
import Contact from './pages/Contact';
import Booking from './pages/Booking';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'packages',
        element: <Packages />,
      },
      {
        path: 'guide-hajj',
        element: <GuideHajj />,
      },
      {
        path: 'guide-omra',
        element: <GuideOmra />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'booking',
        element: <Booking />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
