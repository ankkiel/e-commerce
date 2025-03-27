import { Navigate, RouteObject } from 'react-router';
import App from '../App';
import ProductPage from '../pages/Product';
import ProductsPage from '../pages/Products';

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/products',
        element: <ProductsPage />,
      },
      {
        path: '/products/:id',
        element: <ProductPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];
