import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Activities from './pages/Activities'
import Timer from './pages/Timer'
import MoodTracker from './pages/MoodTracker'
import Journal from './pages/Journal'
import Visuals from './pages/Visuals'
import './index.css'

function App() {
  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/mood" element={<MoodTracker />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/visuals" element={<Visuals />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
