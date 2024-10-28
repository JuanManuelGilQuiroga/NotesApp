// import React from 'react';
import { useState } from 'react'
// import './App.css'

import { Home } from './views/home';
import { Login } from './views/login';
import { Register } from './views/register';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/home",
    element: <Home />
  }
])


export function App() {
  return(
    <RouterProvider router={routes}/>
  )
}

export default App