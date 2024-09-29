// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from '../Dashboard/Dashboard.jsx';
import ProtectedRoute from './Firebase/ProtectedRoute.jsx';
import Header from './components/Headersection/Header.jsx'
import './App.css'

const [Loding, setLoding] = useState(true)

function App() {
  return  (
    <div className='min-h-screen flex flex-wrap content-between bg-white'>
    <div className='w-full block'>
        <Header />
        <main>
          <Dashboard/>
        </main>
        </div>
    </div>
  )
}

export default App;
