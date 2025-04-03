import { Navigate, RouteObject } from 'react-router';
import ProductPage from '@/pages/Product/ProductPage';
import ProductsPage from '@/pages/Products/ProductsPage';
import App from '../../App';

export const ROUTE_NAMES = {
  ROOT: '/',
  PRODUCTS: '/products',
  PRODUCT: '/products/:id',
  NOT_FOUND: '*',
} as const;

export const routesConfig: RouteObject[] = [
  {
    path: ROUTE_NAMES.ROOT,
    element: <App />,
    children: [
      {
        path: ROUTE_NAMES.PRODUCTS,
        element: <ProductsPage />,
      },
      {
        path: ROUTE_NAMES.PRODUCT,
        element: <ProductPage />,
      },
    ],
  },
  {
    path: ROUTE_NAMES.NOT_FOUND,
    element: <Navigate to={ROUTE_NAMES.ROOT} replace />,
  },
];

export default routesConfig;
