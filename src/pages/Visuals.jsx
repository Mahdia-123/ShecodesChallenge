import React, { useState, useEffect } from 'react'
import { Download, Moon, Sun, Cloud, Coffee } from 'lucide-react'
import './Visuals.css'

const Visuals = () => {
  const [activeScene, setActiveScene] = useState('beach')
  const [isNapping, setIsNapping] = useState(false)
  const [napTimeLeft, setNapTimeLeft] = useState(300) // 5 minutes default

  const scenes = [
    {
      id: 'beach',
      name: 'Peaceful Beach',
      icon: '🏖️',
      description: 'Gentle waves and soft sand',
      gradient: 'linear-gradient(135deg, #B8D4E3 0%, #F0E6D6 100%)',
    },
    {
      id: 'forest',
      name: 'Quiet Forest',
      icon: '🌲',
      description: 'Sunlight through the trees',
      gradient: 'linear-gradient(135deg, #C8D5C8 0%, #D4C4DD 100%)',
    },
    {
      id: 'sunset',
      name: 'Gentle Sunset',
      icon: '🌅',
      description: 'Warm colors fading into evening',
      gradient: 'linear-gradient(135deg, #E8D5D5 0%, #F5EDE4 50%, #B8D4E3 100%)',
    },
    {
      id: 'cozy',
      name: 'Cozy Room',
      icon: '🏠',
      description: 'Warm blankets and soft light',
      gradient: 'linear-gradient(135deg, #F0E6D6 0%, #E8D5D5 100%)',
    },
    {
      id: 'clouds',
      name: 'Floating Clouds',
      icon: '☁️',
      description: 'Drifting through the sky',
      gradient: 'linear-gradient(135deg, #FDF8F4 0%, #B8D4E3 100%)',
    },
    {
      id: 'rain',
      name: 'Rainy Day',
      icon: '🌧️',
      description: 'Comfort of being inside',
      gradient: 'linear-gradient(135deg, #D4C4DD 0%, #B8D4E3 100%)',
    },
  ]

  const wallpapers = [
    { name: 'Morning Mist', color: '#E8D5D5', pattern: 'soft' },
    { name: 'Ocean Calm', color: '#B8D4E3', pattern: 'waves' },
    { name: 'Forest Bath', color: '#C8D5C8', pattern: 'nature' },
    { name: 'Lavender Dreams', color: '#D4C4DD', pattern: 'floral' },
    { name: 'Cream Clouds', color: '#F0E6D6', pattern: 'clouds' },
    { name: 'Soft Peach', color: '#F5EDE4', pattern: 'gradient' },
  ]

  useEffect(() => {
    let interval
    if (isNapping && napTimeLeft > 0) {
      interval = setInterval(() => {
        setNapTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (napTimeLeft === 0) {
      setIsNapping(false)
    }
    return () => clearInterval(interval)
  }, [isNapping, napTimeLeft])

  const formatNapTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const startNap = (minutes) => {
    setNapTimeLeft(minutes * 60)
    setIsNapping(true)
  }

  const stopNap = () => {
    setIsNapping(false)
    setNapTimeLeft(300)
  }

  const currentScene = scenes.find(s => s.id === activeScene)

  return (
    <div className="visuals page-enter">
      <div className="container">
        <header className="visuals-header">
          <h1>Calm Visuals</h1>
          <p>Peaceful scenes and virtual spaces for your relaxation</p>
        </header>

        {/* Scene Viewer */}
        <section className="scene-viewer">
          <div 
            className="scene-display"
            style={{ background: currentScene.gradient }}
          >
            <div className="scene-content">
              <span className="scene-emoji">{currentScene.icon}</span>
              <h2>{currentScene.name}</h2>
              <p>{currentScene.description}</p>
            </div>
            
            {/* Animated Elements */}
            <div className="scene-animations">
              {activeScene === 'beach' && (
                <>
                  <div className="wave wave-1"></div>
                  <div className="wave wave-2"></div>
                  <div className="wave wave-3"></div>
                </>
              )}
              {activeScene === 'clouds' && (
                <>
                  <div className="floating-cloud cloud-a">☁️</div>
                  <div className="floating-cloud cloud-b">☁️</div>
                  <div className="floating-cloud cloud-c">☁️</div>
                </>
              )}
              {activeScene === 'rain' && (
                <>
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="raindrop" style={{ 
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${0.5 + Math.random() * 0.5}s`
                    }}></div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Scene Selector */}
          <div className="scene-selector">
            {scenes.map((scene) => (
              <button
                key={scene.id}
                className={`scene-btn ${activeScene === scene.id ? 'scene-active' : ''}`}
                onClick={() => setActiveScene(scene.id)}
              >
                <span className="scene-btn-icon">{scene.icon}</span>
                <span className="scene-btn-name">{scene.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Virtual Nap Section */}
        <section className="nap-section">
          <h2>Virtual Nap Corner</h2>
          <div className="nap-card">
            {isNapping ? (
              <div className="nap-active">
                <div className="nap-zzz">
                  <span>Z</span>
                  <span>Z</span>
                  <span>Z</span>
                </div>
                <p className="nap-status">You're taking a virtual nap</p>
                <div className="nap-timer">{formatNapTime(napTimeLeft)}</div>
                <button className="nap-stop-btn" onClick={stopNap}>
                  <Sun size={18} />
                  Wake Up Gently
                </button>
              </div>
            ) : (
              <div className="nap-setup">
                <Moon className="nap-icon" size={48} />
                <h3>Ready for a quick rest?</h3>
                <p>Set a gentle timer and let yourself drift off</p>
                <div className="nap-durations">
                  <button className="nap-duration-btn" onClick={() => startNap(5)}>
                    <Coffee size={16} />
                    5 min
                  </button>
                  <button className="nap-duration-btn" onClick={() => startNap(10)}>
                    10 min
                  </button>
                  <button className="nap-duration-btn" onClick={() => startNap(15)}>
                    15 min
                  </button>
                  <button className="nap-duration-btn" onClick={() => startNap(20)}>
                    20 min
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Wallpapers Section */}
        <section className="wallpapers-section">
          <h2>Calming Wallpapers</h2>
          <p className="wallpapers-subtitle">
            Download these soothing backgrounds for your devices
          </p>
          <div className="wallpapers-grid">
            {wallpapers.map((wallpaper, index) => (
              <div 
                key={index} 
                className="wallpaper-card"
                style={{ backgroundColor: wallpaper.color }}
              >
                <div className="wallpaper-preview">
                  <div className={`wallpaper-pattern ${wallpaper.pattern}`}></div>
                </div>
                <div className="wallpaper-info">
                  <span className="wallpaper-name">{wallpaper.name}</span>
                  <button className="wallpaper-download">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Visuals
