import React, { useState, useEffect } from 'react'
import { Save, Trash2, Edit2, Sparkles } from 'lucide-react'
import './Journal.css'

const Journal = () => {
  const [entries, setEntries] = useState([])
  const [currentEntry, setCurrentEntry] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [prompt, setPrompt] = useState('')

  const prompts = [
    "What are you grateful for today?",
    "Describe your perfect lazy day...",
    "What's on your mind right now?",
    "Write about a peaceful moment you experienced...",
    "What helps you relax the most?",
    "If you could do anything right now, what would it be?",
    "Describe the sounds around you...",
    "What's something that made you smile today?",
  ]

  useEffect(() => {
    const saved = localStorage.getItem('lazyLoungeJournal')
    if (saved) {
      setEntries(JSON.parse(saved))
    }
    setPrompt(prompts[Math.floor(Math.random() * prompts.length)])
  }, [])

  const saveEntry = () => {
    if (!currentEntry.trim()) return

    let updatedEntries
    if (editingId) {
      updatedEntries = entries.map(entry =>
        entry.id === editingId
          ? { ...entry, text: currentEntry, updatedAt: new Date().toISOString() }
          : entry
      )
    } else {
      const newEntry = {
        id: Date.now(),
        text: currentEntry,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      updatedEntries = [newEntry, ...entries]
    }

    setEntries(updatedEntries)
    localStorage.setItem('lazyLoungeJournal', JSON.stringify(updatedEntries))
    setCurrentEntry('')
    setEditingId(null)
  }

  const editEntry = (entry) => {
    setCurrentEntry(entry.text)
    setEditingId(entry.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const deleteEntry = (id) => {
    const updated = entries.filter(entry => entry.id !== id)
    setEntries(updated)
    localStorage.setItem('lazyLoungeJournal', JSON.stringify(updated))
    if (editingId === id) {
      setCurrentEntry('')
      setEditingId(null)
    }
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const newPrompt = () => {
    setPrompt(prompts[Math.floor(Math.random() * prompts.length)])
  }

  return (
    <div className="journal page-enter">
      <div className="container">
        <header className="journal-header">
          <h1>Lazy Journal</h1>
          <p>A quiet space for your thoughts, dreams, and random musings</p>
        </header>

        {/* Writing Area */}
        <section className="journal-write">
          <div className="prompt-card">
            <div className="prompt-header">
              <Sparkles size={18} />
              <span>Writing Prompt</span>
            </div>
            <p className="prompt-text">{prompt}</p>
            <button className="prompt-refresh" onClick={newPrompt}>
              Get another prompt
            </button>
          </div>

          <div className="journal-editor">
            <textarea
              className="journal-textarea"
              placeholder="Start writing here... let your thoughts flow freely"
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              rows={8}
            />
            <div className="journal-actions">
              <span className="char-count">
                {currentEntry.length} characters
              </span>
              <button
                className="save-entry-btn"
                onClick={saveEntry}
                disabled={!currentEntry.trim()}
              >
                <Save size={18} />
                {editingId ? 'Update Entry' : 'Save Entry'}
              </button>
            </div>
          </div>
        </section>

        {/* Previous Entries */}
        {entries.length > 0 && (
          <section className="journal-entries">
            <h2>Your Past Thoughts</h2>
            <div className="entries-list">
              {entries.map((entry) => (
                <article key={entry.id} className="entry-card">
                  <div className="entry-header">
                    <time className="entry-date">
                      {formatDate(entry.createdAt)}
                    </time>
                    <div className="entry-actions">
                      <button
                        className="entry-action-btn"
                        onClick={() => editEntry(entry)}
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="entry-action-btn delete"
                        onClick={() => deleteEntry(entry.id)}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="entry-text">{entry.text}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {entries.length === 0 && (
          <section className="journal-empty">
            <div className="empty-illustration">📝</div>
            <h3>Your journal is waiting</h3>
            <p>
              Take a moment to write down your thoughts. There's no right or wrong here—
              just a peaceful space to let your mind wander.
            </p>
          </section>
        )}
      </div>
    </div>
  )
}

export default Journal
