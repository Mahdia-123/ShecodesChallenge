import React, { useState, useEffect } from 'react'
import { Smile, Meh, Frown, Cloud, Sun, Moon, Heart } from 'lucide-react'
import './MoodTracker.css'

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null)
  const [moodHistory, setMoodHistory] = useState([])
  const [note, setNote] = useState('')

  const moods = [
    { id: 'amazing', label: 'Amazing', icon: '🌟', color: '#F4E04D', description: 'Feeling great and at peace' },
    { id: 'happy', label: 'Happy', icon: '😊', color: '#C8D5C8', description: 'Content and comfortable' },
    { id: 'calm', label: 'Calm', icon: '😌', color: '#B8D4E3', description: 'Relaxed and steady' },
    { id: 'tired', label: 'Tired', icon: '😴', color: '#D4C4DD', description: 'Sleepy and low energy' },
    { id: 'stressed', label: 'Stressed', icon: '😓', color: '#E8D5D5', description: 'Need to unwind more' },
    { id: 'anxious', label: 'Anxious', icon: '😰', color: '#EDE4D8', description: 'Feeling restless' },
  ]

  useEffect(() => {
    const saved = localStorage.getItem('lazyLoungeMoods')
    if (saved) {
      setMoodHistory(JSON.parse(saved))
    }
  }, [])

  const saveMood = () => {
    if (!selectedMood) return
    
    const newEntry = {
      mood: selectedMood,
      note,
      timestamp: new Date().toISOString(),
    }
    
    const updated = [newEntry, ...moodHistory].slice(0, 30)
    setMoodHistory(updated)
    localStorage.setItem('lazyLoungeMoods', JSON.stringify(updated))
    
    setSelectedMood(null)
    setNote('')
  }

  const getMoodIcon = (moodId) => {
    const mood = moods.find(m => m.id === moodId)
    return mood ? mood.icon : '😐'
  }

  const getMoodLabel = (moodId) => {
    const mood = moods.find(m => m.id === moodId)
    return mood ? mood.label : 'Unknown'
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="mood-tracker page-enter">
      <div className="container">
        <header className="mood-header">
          <h1>Mood Tracker</h1>
          <p>Track how your lazy day transforms your state of mind</p>
        </header>

        {/* Current Mood Selection */}
        <section className="mood-selection">
          <h2>How are you feeling right now?</h2>
          <div className="mood-grid">
            {moods.map((mood) => (
              <button
                key={mood.id}
                className={`mood-btn ${selectedMood === mood.id ? 'mood-selected' : ''}`}
                onClick={() => setSelectedMood(mood.id)}
                style={{ '--mood-color': mood.color }}
              >
                <span className="mood-emoji">{mood.icon}</span>
                <span className="mood-label">{mood.label}</span>
                <span className="mood-desc">{mood.description}</span>
              </button>
            ))}
          </div>

          {selectedMood && (
            <div className="mood-note-section">
              <textarea
                className="mood-note-input"
                placeholder="Add a note about how you're feeling (optional)..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
              />
              <button className="save-mood-btn" onClick={saveMood}>
                <Heart size={18} />
                Log This Mood
              </button>
            </div>
          )}
        </section>

        {/* Mood Stats */}
        {moodHistory.length > 0 && (
          <section className="mood-stats">
            <h2>Your Lazy Day Journey</h2>
            <div className="stats-cards">
              <div className="stat-card">
                <span className="stat-number">{moodHistory.length}</span>
                <span className="stat-label">Moods Logged</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">
                  {Math.round(moodHistory.filter(m => 
                    ['amazing', 'happy', 'calm'].includes(m.mood)
                  ).length / moodHistory.length * 100)}%
                </span>
                <span className="stat-label">Positive Vibes</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">
                  {getMoodLabel(moodHistory[0]?.mood)}
                </span>
                <span className="stat-label">Current Mood</span>
              </div>
            </div>
          </section>
        )}

        {/* Mood History */}
        {moodHistory.length > 0 && (
          <section className="mood-history">
            <h2>Recent Moods</h2>
            <div className="history-list">
              {moodHistory.slice(0, 10).map((entry, index) => (
                <div key={index} className="history-item">
                  <span className="history-mood">{getMoodIcon(entry.mood)}</span>
                  <div className="history-details">
                    <span className="history-label">{getMoodLabel(entry.mood)}</span>
                    <span className="history-time">{formatDate(entry.timestamp)}</span>
                    {entry.note && (
                      <p className="history-note">{entry.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {moodHistory.length === 0 && (
          <section className="mood-empty">
            <div className="empty-icon">🌱</div>
            <p>Start tracking your mood to see your relaxation journey unfold</p>
          </section>
        )}
      </div>
    </div>
  )
}

export default MoodTracker
