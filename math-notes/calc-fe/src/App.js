// import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import '@mantine/core/styles.css';
// import { MantineProvider } from "@mantine/core";
// import Home from "./screens/home";
// import '@/index.css';
// const paths = [
//     {
//         path: '/',
//         element: (_jsx(Home, {})),
//     },
// ];
// const BrowserRouter = createBrowserRouter(paths);
// const App = () => {
//     return (_jsxs(MantineProvider, { children: [_jsx(RouterProvider, { router: BrowserRouter }), ";"] }));
// };
// export default App;

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import '@mantine/core/styles.css';
import { MantineProvider } from "@mantine/core";
import Home from "./screens/home";
import History from "./components/History"; // Import the History component
import '@/index.css';

// Define paths for routing
const paths = [
    {
        path: '/',
        element: (_jsx(Home, {})),
    },
    {
        path: '/history', // New route for history
        element: (_jsx(History, {})), // Render History component
    },
];

const BrowserRouter = createBrowserRouter(paths);

const App = () => {
    return (
        _jsxs(MantineProvider, { children: [_jsx(RouterProvider, { router: BrowserRouter })] })
    );
};

export default App;
