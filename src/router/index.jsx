
import { createBrowserRouter } from 'react-router-dom'
import Rey from '../pages/rey';
import Register from '../pages/register';
import Login from '../pages/login';
import React from 'react';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
    children: [
      {
        path: "rey",
        element: <Rey />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
