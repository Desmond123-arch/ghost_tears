import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layouts/layout'
import routes from './routes'


function App() {
  const router = createBrowserRouter([
    {
      element: <Layout/>,
      children: routes
    }
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App
