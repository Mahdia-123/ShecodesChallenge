import React, { useState } from 'react'
import { Play, Pause, BookOpen, Film, Puzzle, Headphones } from 'lucide-react'
import './Activities.css'

const Activities = () => {
  const [activeTab, setActiveTab] = useState('music')
  const [playingTrack, setPlayingTrack] = useState(null)

  const activities = {
    music: {
      icon: Headphones,
      title: 'Lazy Day Playlist',
      description: 'Curated low-energy tunes for your relaxation',
      items: [
        { title: 'Lo-Fi Study Beats', duration: '45 min', type: 'Lo-Fi' },
        { title: 'Rainy Day Jazz', duration: '60 min', type: 'Jazz' },
        { title: 'Ambient Nature Sounds', duration: '30 min', type: 'Nature' },
        { title: 'Soft Piano Melodies', duration: '40 min', type: 'Classical' },
        { title: 'Chill Indie Acoustic', duration: '50 min', type: 'Indie' },
        { title: 'Ocean Waves', duration: '∞', type: 'Nature' },
      ]
    },
    movies: {
      icon: Film,
      title: 'Cozy Watch List',
      description: 'Feel-good movies and shows for lazy days',
      items: [
        { title: 'The Grand Budapest Hotel', duration: '1h 40m', type: 'Comedy' },
        { title: 'Amelie', duration: '2h 2m', type: 'Romance' },
        { title: 'My Neighbor Totoro', duration: '1h 28m', type: 'Animation' },
        { title: 'The Secret Life of Walter Mitty', duration: '1h 54m', type: 'Adventure' },
        { title: 'Chef', duration: '1h 55m', type: 'Comedy' },
        { title: 'Paddington', duration: '1h 35m', type: 'Family' },
      ]
    },
    games: {
      icon: Puzzle,
      title: 'Gentle Games',
      description: 'Light, no-stress games to pass the time',
      items: [
        { title: 'Zen Puzzle', duration: '10-15 min', type: 'Puzzle' },
        { title: 'Virtual Coloring Book', duration: '∞', type: 'Creative' },
        { title: 'Memory Match', duration: '5-10 min', type: 'Memory' },
        { title: 'Bubble Wrap Pop', duration: '∞', type: 'Casual' },
        { title: 'Gentle Crossword', duration: '15-20 min', type: 'Word' },
        { title: 'Cloud Watching Sim', duration: '∞', type: 'Relaxation' },
      ]
    },
    reading: {
      icon: BookOpen,
      title: 'Cozy Reads',
      description: 'Short stories, poems, and calming articles',
      items: [
        { title: 'The Little Prince', duration: '30 min', type: 'Story' },
        { title: 'Desiderata (Poem)', duration: '5 min', type: 'Poetry' },
        { title: 'The Art of Stillness', duration: '20 min', type: 'Essay' },
        { title: 'Wild Geese (Poem)', duration: '3 min', type: 'Poetry' },
        { title: 'Letters to a Young Poet', duration: '25 min', type: 'Letters' },
        { title: 'Slow Living Guide', duration: '15 min', type: 'Article' },
      ]
    }
  }

  const CurrentIcon = activities[activeTab].icon

  return (
    <div className="activities page-enter">
      <div className="container">
        <header className="activities-header">
          <h1>Choose Your Lazy Activity</h1>
          <p>Something for every mood, no effort required</p>
        </header>

        {/* Tabs */}
        <div className="activity-tabs">
          {Object.keys(activities).map((key) => (
            <button
              key={key}
              className={`tab-button ${activeTab === key ? 'tab-active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="activity-content">
          <div className="activity-intro">
            <div className={`activity-icon-wrapper ${activeTab}`}>
              <CurrentIcon className="activity-icon" />
            </div>
            <h2>{activities[activeTab].title}</h2>
            <p>{activities[activeTab].description}</p>
          </div>

          <div className="activity-grid">
            {activities[activeTab].items.map((item, index) => (
              <div key={index} className="activity-card">
                <div className="activity-card-header">
                  <span className="activity-type">{item.type}</span>
                  {activeTab === 'music' && (
                    <button
                      className="play-button"
                      onClick={() => setPlayingTrack(playingTrack === index ? null : index)}
                    >
                      {playingTrack === index ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                  )}
                </div>
                <h3 className="activity-title">{item.title}</h3>
                <span className="activity-duration">{item.duration}</span>
                {playingTrack === index && activeTab === 'music' && (
                  <div className="playing-indicator">
                    <span className="playing-bar"></span>
                    <span className="playing-bar"></span>
                    <span className="playing-bar"></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Meditation Section */}
        <section className="meditation-section">
          <h2>Gentle Guided Meditation</h2>
          <div className="meditation-card">
            <div className="meditation-visual">
              <div className="breathing-circle">
                <span className="breath-text">Breathe</span>
              </div>
            </div>
            <div className="meditation-info">
              <h3>5-Minute Calm</h3>
              <p>A simple breathing exercise to center yourself. Find a comfortable position, close your eyes, and follow your breath.</p>
              <div className="meditation-durations">
                <button className="duration-btn">5 min</button>
                <button className="duration-btn">10 min</button>
                <button className="duration-btn">15 min</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Activities
