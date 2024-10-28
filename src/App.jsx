// import React from 'react';
import { useState } from 'react'
// import './App.css'

import { Home, notasLoader } from './views/home';
import { Login } from './views/login';
import { Register } from './views/register';
import { Note, notaLoader } from './views/note';
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
    element: <Home />,
    loader: notasLoader
  },
  {
    path: "/note/:id?",
    element: <Note />,
    loader: notaLoader
  }
])


export function App() {
  return(
    <RouterProvider router={routes}/>
  )
}

export default App