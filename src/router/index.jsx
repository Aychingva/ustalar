// src/router/Router.jsx
import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Rey from '../rey';
import Register from '../register';
import Login from '../login';



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
