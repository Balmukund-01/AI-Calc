import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import '@mantine/core/styles.css';
import { MantineProvider } from "@mantine/core";
import Home from "./screens/home";
import '@/index.css';
const paths = [
    {
        path: '/',
        element: (_jsx(Home, {})),
    },
];
const BrowserRouter = createBrowserRouter(paths);
const App = () => {
    return (_jsxs(MantineProvider, { children: [_jsx(RouterProvider, { router: BrowserRouter }), ";"] }));
};
export default App;
