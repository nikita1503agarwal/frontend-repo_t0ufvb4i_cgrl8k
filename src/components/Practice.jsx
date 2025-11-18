import { useEffect, useState } from 'react'

export default function Practice({ lesson, backendUrl, onBack }) {
  const [words, setWords] = useState([])
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${backendUrl}/api/lessons/${lesson.id}/words`)
      const data = await res.json()
      setWords(data)
    }
    load()
  }, [lesson, backendUrl])

  if (!words.length) {
    return (
      <div className="max-w-2xl mx-auto px-6 text-center py-10">
        <p className="text-slate-600">טוען מילים...</p>
      </div>
    )
  }

  const current = words[index]

  const answers = [
    current.hebrew,
    ...shuffle(words.filter(w => w.id !== current.id).slice(0, 2).map(w => w.hebrew))
  ]

  const options = shuffle(answers).slice(0, 3)

  function shuffle(arr){
    return [...arr].sort(() => Math.random() - 0.5)
  }

  const choose = async (val) => {
    const good = val === current.hebrew
    setCorrect(c => c + (good ? 1 : 0))
    setIncorrect(i => i + (good ? 0 : 1))

    const next = index + 1
    if (next >= words.length) {
      setFinished(true)
      try {
        await fetch(`${backendUrl}/api/progress`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 'guest',
            lesson_id: lesson.id,
            correct: good ? correct + 1 : correct,
            incorrect: good ? incorrect : incorrect + 1,
            last_score: Math.round(((good ? correct + 1 : correct) / words.length) * 100)
          })
        })
      } catch (e) {
        // ignore
      }
    } else {
      setIndex(next)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <button onClick={onBack} className="text-blue-700 hover:underline mb-4">← חזרה לשיעורים</button>
      <h3 className="text-2xl font-bold text-right">{lesson.title}</h3>

      {!finished ? (
        <div className="mt-6 bg-white p-6 rounded-2xl border">
          <div className="text-center">
            <div className="text-6xl mb-3">{lesson.cover_emoji || '⭐'}</div>
            <div className="text-xl text-slate-700 mb-1">מה התרגום לעברית?</div>
            <div className="text-3xl font-extrabold text-slate-900 mb-6">{current.english}</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => choose(opt)}
                className="p-4 rounded-xl border bg-blue-50 hover:bg-blue-100 text-right"
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="mt-6 text-sm text-slate-600 text-right">{index + 1} / {words.length}</div>
        </div>
      ) : (
        <div className="mt-6 bg-white p-6 rounded-2xl border text-right">
          <div className="text-2xl font-bold text-slate-900 mb-1">כל הכבוד!</div>
          <div className="text-slate-700 mb-4">סיימת את התרגול.</div>
          <div className="text-slate-700">תשובות נכונות: {correct} | לא נכונות: {incorrect}</div>
          <button onClick={onBack} className="mt-4 px-5 py-3 rounded-xl bg-blue-600 text-white">חזרה לשיעורים</button>
        </div>
      )}
    </div>
  )
}
