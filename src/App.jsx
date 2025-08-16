import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Student from './components/Student'
import Teacher from './components/Teacher'
import Login from './components/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<Student />} />
        <Route path="/teacher" element={<Teacher />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
