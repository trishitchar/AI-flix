import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Login'
import Browse from './Browse'
import MovieInfo from './MovieInfo'
import Profile from './Profile'

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path:"/",
      element:<Login/>
    },
    {
      path:"/browse",
      element:<Browse/>
    },{
      path:"/movieinfo/:id",
      element:<MovieInfo/>
    },{
      path:"/profile",
      element:<Profile/>
    }
  ])

  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body