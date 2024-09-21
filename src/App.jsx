import React from 'react'
import { Route, Routes } from 'react-router'
import Dashboard from './components/custom/Dashboard'
import Login from './page/Login'
import Signup from './page/Signup'
import Home from './page/Home'
import Pricing from './page/Pricing'
import WorkFlow from './page/Workflow'
import Report from './page/Report'

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />

      <Route path='/' element={<Dashboard />}>
          <Route path='/' element={<Home />} />
      </Route>

      
      <Route path='/workflow' element={<Dashboard />}>
          <Route path='/workflow' element={<WorkFlow />} />
      </Route>

      
      <Route path='/report' element={<Dashboard />}>
          <Route path='/report' element={<Report />} />
      </Route>

      
      <Route path='/pricing' element={<Dashboard />}>
          <Route path='/pricing' element={<Pricing />} />
      </Route>
    </Routes>
  )
}

export default App