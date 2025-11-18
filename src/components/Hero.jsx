import { motion } from 'framer-motion'

export default function Hero({ onSeed, seeded, loading }) {
  return (
    <section className="relative overflow-hidden pt-20 pb-10 md:pt-28 md:pb-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.12),transparent_40%),radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.12),transparent_35%)]" />
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900"
        >
          לומדים אנגלית בשמחה
          <span className="block text-blue-600">מותאם לילדים דוברי עברית</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-5 text-lg md:text-xl text-slate-600"
        >
          שיעורים קצרים, אוצר מילים עם תמונות ומשחקי תרגול מהנים
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button
            onClick={onSeed}
            disabled={loading || seeded}
            className="px-6 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
          >
            {seeded ? 'התוכן מוכן ✅' : loading ? 'מכין תוכן...' : 'הכנת תוכן לדוגמה'}
          </button>
          <a
            href="#lessons"
            className="px-6 py-3 rounded-xl font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100"
          >
            לצפייה בשיעורים
          </a>
        </motion.div>
      </div>
    </section>
  )
}
