import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Cloud, Music, Clock, Heart, BookOpen, Image, Menu, X } from 'lucide-react'
import './Navigation.css'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: Cloud },
    { path: '/activities', label: 'Activities', icon: Music },
    { path: '/timer', label: 'Timer', icon: Clock },
    { path: '/mood', label: 'Mood', icon: Heart },
    { path: '/journal', label: 'Journal', icon: BookOpen },
    { path: '/visuals', label: 'Visuals', icon: Image },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <Cloud className="logo-icon" />
          <span>The Lazy Lounge</span>
        </Link>

        <button 
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        <ul className={`nav-menu ${isOpen ? 'nav-menu-open' : ''}`}>
          {navItems.map(({ path, label, icon: Icon }) => (
            <li key={path}>
              <Link
                to={path}
                className={`nav-link ${isActive(path) ? 'nav-link-active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <Icon className="nav-icon" />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
