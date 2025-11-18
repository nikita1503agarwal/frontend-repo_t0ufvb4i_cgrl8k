import { useEffect } from 'react'

export default function LessonGrid({ lessons, onSelect }) {
  useEffect(() => {
    // Scroll to lessons on mount when hash is present
    if (window.location.hash.includes('lessons')) {
      const el = document.getElementById('lessons')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <section id="lessons" className="max-w-5xl mx-auto px-6 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-right">שיעורים</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {lessons.map((l) => (
          <button
            key={l.id}
            onClick={() => onSelect(l)}
            className="group text-right p-5 rounded-2xl border bg-white hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="text-3xl mb-2">{l.cover_emoji || '📘'}</div>
            <div className="font-bold text-slate-900">{l.title}</div>
            <div className="text-sm text-slate-600">{l.description || ''}</div>
            <div className="mt-3 inline-flex items-center gap-1 text-xs text-blue-700">
              להתחיל
              <span className="translate-x-0 group-hover:translate-x-1 transition">→</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
