import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import LessonGrid from './components/LessonGrid'
import Practice from './components/Practice'

function App() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [lessons, setLessons] = useState([])
  const [loadingSeed, setLoadingSeed] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [activeLesson, setActiveLesson] = useState(null)

  const loadLessons = async () => {
    const res = await fetch(`${backendUrl}/api/lessons`)
    const data = await res.json()
    setLessons(data)
    setSeeded(data.length > 0)
  }

  useEffect(() => {
    loadLessons()
  }, [])

  const seed = async () => {
    try {
      setLoadingSeed(true)
      await fetch(`${backendUrl}/api/seed`, { method: 'POST' })
      await loadLessons()
    } finally {
      setLoadingSeed(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50">
      <header className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="font-extrabold text-xl text-blue-700">EnglishKids</div>
        <nav className="flex items-center gap-4 text-sm text-slate-700">
          <a href="/test" className="hover:underline">בדיקת שרת</a>
          <a href="#lessons" className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700">לשיעורים</a>
        </nav>
      </header>

      {!activeLesson ? (
        <>
          <Hero onSeed={seed} loading={loadingSeed} seeded={seeded} />
          <LessonGrid lessons={lessons} onSelect={setActiveLesson} />
        </>
      ) : (
        <Practice lesson={activeLesson} backendUrl={backendUrl} onBack={() => setActiveLesson(null)} />
      )}

      <footer className="max-w-5xl mx-auto px-6 py-10 text-right text-slate-600">
        נבנה לילדים דוברי עברית – ידידותי, ברור ומהנה
      </footer>
    </div>
  )
}

export default App
