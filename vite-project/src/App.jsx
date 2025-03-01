import React from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Toppings from './pages/Toppings'
import Pizzas from './pages/Pizzas'

const router = createBrowserRouter(createRoutesFromElements (
  <Route path='/' element={<Layout />}>
    <Route index element={<Home />} />
    <Route path='toppings' element={<Toppings />}/>
    <Route path='pizzas' element={<Pizzas />}/>
  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
