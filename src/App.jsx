import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Student from './components/Student'
import Teacher from './components/Teacher'
import Admin from './components/Admin'
import Login from './components/Login'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import { AuthProvider } from './contexts/AuthContext'
import Accountant from './components/Accountant'
import Discipline from './components/Discipline'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student" element={<Student />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/accountant" element={<Accountant />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/discipline" element={<Discipline />} />
          <Route path="/forgot-password" element={<ForgotPassword />}  />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
