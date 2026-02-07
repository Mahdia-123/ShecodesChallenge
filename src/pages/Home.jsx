import React from 'react'
import { Link } from 'react-router-dom'
import { Coffee, Book, Music, Clock, ArrowRight } from 'lucide-react'
import './Home.css'

const Home = () => {
  return (
    <div className="home page-enter">
      {/* Floating Background Elements */}
      <div className="floating-clouds">
        <div className="cloud cloud-1">☁️</div>
        <div className="cloud cloud-2">☁️</div>
        <div className="cloud cloud-3">☁️</div>
        <div className="cloud cloud-4">☁️</div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-visual">
            <div className="cozy-scene">
              <div className="steam-container">
                <div className="steam steam-1"></div>
                <div className="steam steam-2"></div>
                <div className="steam steam-3"></div>
              </div>
              <Coffee className="coffee-cup" />
            </div>
          </div>
          
          <h1 className="hero-title">
            For when you just need to do...{' '}
            <span className="highlight">nothing</span>
          </h1>
          
          <p className="hero-subtitle">
            Step into a peaceful retreat where you can unwind, escape daily stresses, 
            and indulge in simple joys. Your perfect lazy day starts here.
          </p>
          
          <Link to="/activities" className="cta-button">
            <span>Start Your Lazy Day</span>
            <ArrowRight className="cta-icon" />
          </Link>
        </div>
      </section>

      {/* Features Preview */}
      <section className="features-preview">
        <div className="container">
          <h2 className="section-title">What awaits you</h2>
          
          <div className="features-grid">
            <Link to="/activities" className="feature-card">
              <div className="feature-icon-wrapper music">
                <Music className="feature-icon" />
              </div>
              <h3>Lazy Playlist</h3>
              <p>Chill tunes to match your mood</p>
            </Link>
            
            <Link to="/activities" className="feature-card">
              <div className="feature-icon-wrapper book">
                <Book className="feature-icon" />
              </div>
              <h3>Cozy Reads</h3>
              <p>Short stories & poems to unwind</p>
            </Link>
            
            <Link to="/timer" className="feature-card">
              <div className="feature-icon-wrapper clock">
                <Clock className="feature-icon" />
              </div>
              <h3>Gentle Timer</h3>
              <p>No-pressure time keeping</p>
            </Link>
            
            <Link to="/visuals" className="feature-card">
              <div className="feature-icon-wrapper image">
                <span className="feature-emoji">🌅</span>
              </div>
              <h3>Calm Visuals</h3>
              <p>Peaceful imagery & wallpapers</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Lazy Quote Section */}
      <section className="quote-section">
        <div className="container">
          <div className="quote-card">
            <blockquote>
              "Sometimes the most productive thing you can do is relax."
            </blockquote>
            <cite>— Take a deep breath</cite>
          </div>
        </div>
      </section>

      {/* Mini Challenge Section */}
      <section className="challenge-section">
        <div className="container">
          <h2 className="section-title">Today's Lazy Challenge</h2>
          <div className="challenge-card">
            <span className="challenge-emoji">☕</span>
            <p className="challenge-text">
              Take 10 minutes to sip your favorite warm drink without checking your phone
            </p>
            <Link to="/timer" className="challenge-button">
              Set 10-Minute Timer
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
