import React from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Toppings, { loader as toppingsLoader} from './pages/Toppings'
import Pizzas, { loader as pizzasLoader} from './pages/Pizzas'
import ToppingAdd, {action as toppingAddAction} from './pages/ToppingAdd';
import ToppingEdit, {action as toppingEditAction} from './pages/ToppingEdit';
import PizzaAdd, {action as pizzaAddAction} from './pages/PizzaAdd';
import PizzaEdit, {action as pizzaEditAction} from './pages/PizzaEdit';

const router = createBrowserRouter(createRoutesFromElements (
  <Route path='/' element={<Layout />}>
    <Route index element={<Home />} />
    <Route 
      path='toppings' 
      element={<Toppings />} 
      loader={toppingsLoader}
    />
    <Route 
      path='toppings/add'
      element={<ToppingAdd />}
      action = {toppingAddAction}
    />
    <Route 
      path='toppings/edit'
      element={<ToppingEdit />}
      action = {toppingEditAction}
    />
    <Route path='pizzas' 
      element={<Pizzas />}
      loader={pizzasLoader}
    />
    <Route 
      path='pizzas/add'
      element={<PizzaAdd />}
      action = {pizzaAddAction}
      loader = {toppingsLoader}
    />
    <Route 
      path='pizzas/edit'
      element={<PizzaEdit />}
      action = {pizzaEditAction}
      loader = {toppingsLoader}
    />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
