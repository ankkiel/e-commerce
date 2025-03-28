import './styles/index.scss';

import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routesConfig } from './config/routes';

const router = createBrowserRouter(routesConfig);

const root = createRoot(document.getElementById('root') as HTMLDivElement);

root.render(<RouterProvider router={router} />);
