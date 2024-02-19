import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./components/templates/main-layout/main-layout";
import MainPage from "./components/pages/main";
import ProductsPage from "./components/pages/products";
import PricePlansPage from "./components/pages/price-plans";
import PagesPage from "./components/pages/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/products",
    element: <ProductsPage />,
  },
  {
    path: "/price-plans",
    element: <PricePlansPage />,
  },
  {
    path: "/pages",
    element: <PagesPage />,
  },
]);

function App() {
  return (
    <MainLayout>
      <RouterProvider router={router} />
    </MainLayout>
  );
}

export default App;
