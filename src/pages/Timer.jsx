import React, { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, Volume2, Coffee } from 'lucide-react'
import './Timer.css'

const Timer = () => {
  const [time, setTime] = useState(10 * 60) // Default 10 minutes
  const [isActive, setIsActive] = useState(false)
  const [customMinutes, setCustomMinutes] = useState(10)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showComplete, setShowComplete] = useState(false)
  const intervalRef = useRef(null)
  const audioRef = useRef(null)

  const presets = [
    { label: 'Quick Break', minutes: 5, icon: '☕' },
    { label: 'Lazy Session', minutes: 10, icon: '🌿' },
    { label: 'Deep Relax', minutes: 20, icon: '😌' },
    { label: 'Power Nap', minutes: 30, icon: '😴' },
  ]

  useEffect(() => {
    if (isActive && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0 && isActive) {
      setIsActive(false)
      setShowComplete(true)
      if (soundEnabled && audioRef.current) {
        audioRef.current.play()
      }
    }

    return () => clearInterval(intervalRef.current)
  }, [isActive, time, soundEnabled])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const toggleTimer = () => {
    setIsActive(!isActive)
    setShowComplete(false)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTime(customMinutes * 60)
    setShowComplete(false)
  }

  const setPreset = (minutes) => {
    setIsActive(false)
    setCustomMinutes(minutes)
    setTime(minutes * 60)
    setShowComplete(false)
  }

  const handleCustomChange = (e) => {
    const value = parseInt(e.target.value) || 0
    setCustomMinutes(value)
    setTime(value * 60)
    setIsActive(false)
    setShowComplete(false)
  }

  const progress = ((customMinutes * 60 - time) / (customMinutes * 60)) * 100

  return (
    <div className="timer-page page-enter">
      <div className="container">
        <header className="timer-header">
          <h1>Lazy Day Timer</h1>
          <p>Keep track of your relaxation without the stress</p>
        </header>

        <div className="timer-container">
          {/* Presets */}
          <div className="timer-presets">
            {presets.map((preset) => (
              <button
                key={preset.minutes}
                className={`preset-btn ${customMinutes === preset.minutes ? 'preset-active' : ''}`}
                onClick={() => setPreset(preset.minutes)}
              >
                <span className="preset-icon">{preset.icon}</span>
                <span className="preset-label">{preset.label}</span>
                <span className="preset-time">{preset.minutes} min</span>
              </button>
            ))}
          </div>

          {/* Timer Display */}
          <div className="timer-display-card">
            <div className="timer-circle">
              <svg className="timer-svg" viewBox="0 0 200 200">
                <circle
                  className="timer-track"
                  cx="100"
                  cy="100"
                  r="90"
                />
                <circle
                  className="timer-progress"
                  cx="100"
                  cy="100"
                  r="90"
                  style={{
                    strokeDasharray: `${2 * Math.PI * 90}`,
                    strokeDashoffset: `${2 * Math.PI * 90 * (1 - progress / 100)}`,
                  }}
                />
              </svg>
              <div className="timer-content">
                <div className="timer-time">{formatTime(time)}</div>
                <div className="timer-status">
                  {isActive ? 'Relaxing...' : showComplete ? 'Time to rest more!' : 'Ready to unwind?'}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="timer-controls">
              <button
                className="control-btn control-main"
                onClick={toggleTimer}
              >
                {isActive ? <Pause size={28} /> : <Play size={28} />}
                <span>{isActive ? 'Pause' : showComplete ? 'Start Again' : 'Start'}</span>
              </button>

              <button
                className="control-btn control-secondary"
                onClick={resetTimer}
              >
                <RotateCcw size={20} />
                <span>Reset</span>
              </button>

              <button
                className={`control-btn control-secondary ${soundEnabled ? '' : 'control-muted'}`}
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                <Volume2 size={20} />
                <span>{soundEnabled ? 'Sound On' : 'Muted'}</span>
              </button>
            </div>
          </div>

          {/* Custom Time Input */}
          <div className="custom-time">
            <label htmlFor="custom-minutes">Custom time (minutes):</label>
            <input
              id="custom-minutes"
              type="number"
              min="1"
              max="120"
              value={customMinutes}
              onChange={handleCustomChange}
              className="custom-input"
            />
          </div>

          {/* Gentle Notification Info */}
          <div className="timer-info">
            <Coffee className="info-icon" />
            <p>
              When the timer ends, you'll hear a gentle chime. 
              Take your time—there's no rush to get back to reality.
            </p>
          </div>
        </div>

        {/* Hidden audio element for the chime */}
        <audio ref={audioRef} preload="auto">
          <source src="/chime.mp3" type="audio/mpeg" />
        </audio>
      </div>
    </div>
  )
}

export default Timer
