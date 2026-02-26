export default function InputTabs({ activeTab, setActiveTab, url, setUrl, htmlInput, setHtmlInput, onFetch, onParseHtml, loading, error }) {
  const handleUrlKeyDown = (e) => {
    if (e.key === 'Enter') onFetch()
  }

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-metal/20">
        <button
          onClick={() => setActiveTab('url')}
          className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-inset ${
            activeTab === 'url'
              ? 'text-white border-b-2 border-azure bg-azure/5'
              : 'text-galactic hover:text-cloudy'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
            </svg>
            Fetch by URL
          </span>
        </button>
        <button
          onClick={() => setActiveTab('html')}
          className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-inset ${
            activeTab === 'html'
              ? 'text-white border-b-2 border-azure bg-azure/5'
              : 'text-galactic hover:text-cloudy'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
            </svg>
            Paste HTML
          </span>
        </button>
      </div>

      {/* Tab content */}
      <div className="p-6">
        {activeTab === 'url' ? (
          <div>
            <label className="block text-sm font-medium text-cloudy mb-2">
              Enter a URL to fetch and analyze
            </label>
            <div className="flex gap-3 flex-col sm:flex-row">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={handleUrlKeyDown}
                placeholder="https://example.com/blog/my-post"
                className="flex-1 bg-midnight border border-metal/30 rounded-lg px-4 py-3 text-white placeholder-galactic text-sm focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors"
              />
              <button
                onClick={onFetch}
                disabled={loading || !url.trim()}
                className="bg-azure hover:bg-azure-hover disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg px-6 py-3 font-semibold text-sm transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Fetching…
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    Fetch &amp; Analyze
                  </>
                )}
              </button>
            </div>
            <p className="mt-2 text-xs text-galactic">
              URL fetching uses a public CORS proxy. For best results, paste your page's HTML directly.
            </p>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-cloudy mb-2">
              Paste your page's HTML or <code className="bg-midnight px-1 py-0.5 rounded text-xs text-prince">&lt;head&gt;</code> section
            </label>
            <textarea
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              placeholder={'<!DOCTYPE html>\n<html>\n<head>\n  <meta property="og:title" content="My Page" />\n  ...\n</head>\n</html>'}
              rows={8}
              className="w-full bg-midnight border border-metal/30 rounded-lg px-4 py-3 text-white placeholder-galactic text-sm font-mono focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors resize-y"
              style={{ minHeight: '160px' }}
            />
            <div className="mt-3 flex justify-end">
              <button
                onClick={onParseHtml}
                disabled={!htmlInput.trim()}
                className="bg-azure hover:bg-azure-hover disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg px-6 py-3 font-semibold text-sm transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                </svg>
                Analyze HTML
              </button>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mt-4 flex items-start gap-3 bg-coral/10 border border-coral/30 rounded-lg px-4 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-coral flex-shrink-0 mt-0.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            <p className="text-sm text-coral">{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}
