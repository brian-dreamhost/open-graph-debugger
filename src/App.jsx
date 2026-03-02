import { useState } from 'react'
import { parseOGTags, auditTags } from './utils/ogParser.js'
import InputTabs from './components/InputTabs.jsx'
import AuditPanel from './components/AuditPanel.jsx'
import TagsTable from './components/TagsTable.jsx'
import FacebookPreview from './components/previews/FacebookPreview.jsx'
import TwitterPreview from './components/previews/TwitterPreview.jsx'
import LinkedInPreview from './components/previews/LinkedInPreview.jsx'
import SlackPreview from './components/previews/SlackPreview.jsx'

export default function App() {
  const [activeTab, setActiveTab] = useState('url')
  const [url, setUrl] = useState('')
  const [htmlInput, setHtmlInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [tags, setTags] = useState(null)
  const [audit, setAudit] = useState(null)

  function fillTestData() {
    setActiveTab('url')
    setUrl('https://www.dreamhost.com')
    setError(null)
    setTags(null)
    setAudit(null)
  }

  async function fetchAndAnalyze(inputUrl) {
    const trimmed = inputUrl.trim()
    if (!trimmed) return
    setLoading(true)
    setError(null)
    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(trimmed)}`
      const res = await fetch(proxyUrl)
      if (!res.ok) throw new Error('Failed to fetch page')
      const data = await res.json()
      if (!data.contents) throw new Error('No content returned')
      const parsed = parseOGTags(data.contents)
      setTags(parsed)
      setAudit(auditTags(parsed))
    } catch (e) {
      setError(e.message + '. Try the "Paste HTML" tab instead.')
    } finally {
      setLoading(false)
    }
  }

  function handleParseHtml() {
    const trimmed = htmlInput.trim()
    if (!trimmed) return
    const parsed = parseOGTags(trimmed)
    setTags(parsed)
    setAudit(auditTags(parsed))
    setError(null)
  }

  const hasResults = tags !== null

  return (
    <div className="bg-abyss bg-glow bg-grid min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12 animate-fadeIn">

        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-galactic" aria-label="Breadcrumb">
          <a href="https://seo-tools-tau.vercel.app/" className="text-azure hover:text-white transition-colors duration-200">
            Free Tools
          </a>
          <span className="mx-2 text-metal" aria-hidden="true">/</span>
          <a href="https://seo-tools-tau.vercel.app/social-media/" className="text-azure hover:text-white transition-colors duration-200">
            Social Media Tools
          </a>
          <span className="mx-2 text-metal" aria-hidden="true">/</span>
          <span className="text-cloudy" aria-current="page">Open Graph Debugger</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-start gap-4 mb-4">
            <div className="hidden sm:block flex-shrink-0 p-3 rounded-xl bg-azure/10 border border-azure/20" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-azure">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white leading-tight">Open Graph Debugger</h1>
              <p className="text-cloudy mt-2 max-w-2xl">
                See exactly how your page looks when shared on Facebook, X/Twitter, LinkedIn, and Slack. Extract all OG and Twitter Card tags, audit for missing or incorrect values, and fix issues before you post.
              </p>
            </div>
          </div>
        </header>

        {/* Fill Test Data */}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={fillTestData}
            className="px-3 py-1.5 text-xs font-mono bg-prince/20 text-prince border border-prince/30 rounded hover:bg-prince/30 transition-colors focus:outline-none focus:ring-2 focus:ring-prince focus:ring-offset-2 focus:ring-offset-abyss"
          >
            Fill Test Data
          </button>
        </div>

        {/* Input section */}
        <div className="mb-10">
          <InputTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            url={url}
            setUrl={setUrl}
            htmlInput={htmlInput}
            setHtmlInput={setHtmlInput}
            onFetch={() => fetchAndAnalyze(url)}
            onParseHtml={handleParseHtml}
            loading={loading}
            error={error}
          />
        </div>

        {/* Results */}
        {hasResults && (
          <div className="space-y-10 animate-fadeIn">

            {/* Platform previews */}
            <section>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <h2 className="text-xl font-bold text-white">Social Share Previews</h2>
                <span className="text-xs text-galactic border border-metal/30 rounded-full px-3 py-1">Preview uses your actual OG image URL</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Facebook */}
                <div className="card-gradient border border-metal/20 rounded-2xl p-4 sm:p-5 overflow-hidden">
                  <div className="flex items-center gap-2 mb-4">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span className="text-sm font-semibold text-white">Facebook</span>
                    <span className="text-xs text-galactic ml-auto">1200×630 recommended</span>
                  </div>
                  <FacebookPreview tags={tags} />
                </div>

                {/* X/Twitter */}
                <div className="card-gradient border border-metal/20 rounded-2xl p-4 sm:p-5 overflow-hidden">
                  <div className="flex items-center gap-2 mb-4">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#ffffff">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.733-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span className="text-sm font-semibold text-white">X / Twitter</span>
                    <span className="text-xs text-galactic ml-auto">
                      {tags.twitterCard === 'summary' ? 'summary card' : 'summary_large_image'}
                    </span>
                  </div>
                  <TwitterPreview tags={tags} />
                </div>

                {/* LinkedIn */}
                <div className="card-gradient border border-metal/20 rounded-2xl p-4 sm:p-5 overflow-hidden">
                  <div className="flex items-center gap-2 mb-4">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#0A66C2">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span className="text-sm font-semibold text-white">LinkedIn</span>
                    <span className="text-xs text-galactic ml-auto">1200×627 recommended</span>
                  </div>
                  <LinkedInPreview tags={tags} />
                </div>

                {/* Slack */}
                <div className="card-gradient border border-metal/20 rounded-2xl p-4 sm:p-5 overflow-hidden">
                  <div className="flex items-center gap-2 mb-4">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52z" fill="#E01E5A"/>
                      <path d="M6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
                      <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834z" fill="#36C5F0"/>
                      <path d="M8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
                      <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834z" fill="#2EB67D"/>
                      <path d="M17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/>
                      <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52z" fill="#ECB22E"/>
                      <path d="M15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E"/>
                    </svg>
                    <span className="text-sm font-semibold text-white">Slack</span>
                    <span className="text-xs text-galactic ml-auto">Unfurl preview</span>
                  </div>
                  <SlackPreview tags={tags} />
                </div>

              </div>
            </section>

            {/* Audit panel */}
            <section>
              <h2 className="text-xl font-bold text-white mb-5">Tag Audit Results</h2>
              <AuditPanel audit={audit} />
            </section>

            {/* Raw tags table */}
            <section>
              <TagsTable tags={tags} audit={audit} />
            </section>

          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="text-center py-16 text-galactic animate-fadeIn">
            <svg className="w-10 h-10 mx-auto mb-4 animate-spin text-azure" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-cloudy font-medium">Fetching page...</p>
            <p className="text-sm mt-1">This may take a few seconds</p>
          </div>
        )}

        {/* Empty state */}
        {!hasResults && !loading && (
          <div className="text-center py-20 text-galactic">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mx-auto mb-4 opacity-30">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
            </svg>
            <p className="text-lg font-medium text-cloudy mb-2">Enter a URL or paste HTML to get started</p>
            <p className="text-sm">See how your page looks on Facebook, X, LinkedIn, and Slack</p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-6 border-t border-metal/30 text-center">
          <p className="text-sm text-galactic">
            Free marketing tools by{' '}
            <a href="https://www.dreamhost.com" className="text-azure hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              DreamHost
            </a>
          </p>
        </footer>

      </div>
    </div>
  )
}
