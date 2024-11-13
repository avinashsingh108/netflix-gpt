import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./components/Browse";
import AuthForm from "./components/AuthForm";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import SearchPage from "./components/SearchPage";
import MovieDetailsPage from "./components/MovieDetailsPage";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AuthForm />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/search",
      element: <SearchPage />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/info/:id",
      element: <MovieDetailsPage />,
    },
  ]);
  return (
    <>
      <Provider store={appStore}>
        <RouterProvider router={appRouter} />
      </Provider>
    </>
  );
}

export default App;
