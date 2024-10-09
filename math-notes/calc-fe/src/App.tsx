import { createBrowserRouter, RouterProvider } from "react-router-dom";
import '@mantine/core/styles.css';
import { MantineProvider } from "@mantine/core";

import Home from "./screens/home";
import History from "./components/History";
import '@/index.css';
// import path from "path";

const paths = [ 
  {
    path: '/',
    element: (
      <Home />
    ),
  },
  {
    path: '/history',
    element: (
      <History />
    ),
  }
];

const BrowserRouter = createBrowserRouter(paths);

const App = () => {
  return (
    <MantineProvider>
      <RouterProvider router={BrowserRouter} />;
    </MantineProvider>
  );
}

export default App;