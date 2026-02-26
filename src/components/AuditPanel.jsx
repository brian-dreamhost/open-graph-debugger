import { useState } from 'react'

export default function AuditPanel({ audit }) {
  const [open, setOpen] = useState(true)

  const { issues, warnings, passes } = audit
  const total = issues.length + warnings.length + passes.length
  const score = passes.length
  const pct = total > 0 ? Math.round((score / total) * 100) : 0

  const scoreColor = pct >= 80 ? 'text-turtle' : pct >= 50 ? 'text-tangerine' : 'text-coral'
  const scoreBarColor = pct >= 80 ? 'bg-turtle' : pct >= 50 ? 'bg-tangerine' : 'bg-coral'

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl overflow-hidden">
      {/* Header / toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-inset"
      >
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-azure">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <span className="font-semibold text-white">Tag Audit</span>
          <div className="flex items-center gap-2">
            {issues.length > 0 && (
              <span className="text-xs bg-coral/20 text-coral border border-coral/30 rounded-full px-2 py-0.5">
                {issues.length} issue{issues.length !== 1 ? 's' : ''}
              </span>
            )}
            {warnings.length > 0 && (
              <span className="text-xs bg-tangerine/20 text-tangerine border border-tangerine/30 rounded-full px-2 py-0.5">
                {warnings.length} warning{warnings.length !== 1 ? 's' : ''}
              </span>
            )}
            {issues.length === 0 && warnings.length === 0 && (
              <span className="text-xs bg-turtle/20 text-turtle border border-turtle/30 rounded-full px-2 py-0.5">
                All good
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-sm font-bold ${scoreColor}`}>{score}/{total} tags complete</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-5 h-5 text-galactic transition-transform ${open ? 'rotate-180' : ''}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </button>

      {open && (
        <div className="px-6 pb-6 border-t border-metal/20 animate-fadeIn">
          {/* Score bar */}
          <div className="mt-4 mb-5">
            <div className="flex justify-between text-xs text-galactic mb-1">
              <span>Completeness</span>
              <span className={scoreColor}>{pct}%</span>
            </div>
            <div className="h-2 rounded-full bg-metal/30 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${scoreBarColor}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Issues */}
          {issues.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-coral mb-2 flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                Issues
              </h4>
              <div className="space-y-2">
                {issues.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-coral/5 border border-coral/20 rounded-lg px-3 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-coral flex-shrink-0 mt-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    <div>
                      <code className="text-xs font-mono text-coral">{item.tag}</code>
                      <p className="text-xs text-cloudy mt-0.5">{item.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warnings */}
          {warnings.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-tangerine mb-2 flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
                Warnings
              </h4>
              <div className="space-y-2">
                {warnings.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-tangerine/5 border border-tangerine/20 rounded-lg px-3 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-tangerine flex-shrink-0 mt-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                    <div>
                      <code className="text-xs font-mono text-tangerine">{item.tag}</code>
                      <p className="text-xs text-cloudy mt-0.5">{item.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Passes */}
          {passes.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-turtle mb-2 flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Passing
              </h4>
              <div className="space-y-2">
                {passes.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-turtle/5 border border-turtle/20 rounded-lg px-3 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-turtle flex-shrink-0 mt-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <div>
                      <code className="text-xs font-mono text-turtle">{item.tag}</code>
                      <p className="text-xs text-cloudy mt-0.5">{item.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
