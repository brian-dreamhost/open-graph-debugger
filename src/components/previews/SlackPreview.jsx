import { useState } from 'react'

export default function SlackPreview({ tags }) {
  const [imgError, setImgError] = useState(false)

  const title = tags.title || tags.pageTitle || 'Page Title'
  const description = tags.description || tags.metaDescription || ''
  const siteName = tags.siteName || (tags.url ? (() => { try { return new URL(tags.url).hostname } catch { return '' } })() : '')
  const imageUrl = tags.image
  const pageUrl = tags.url || ''

  const displayTitle = title.length > 100 ? title.slice(0, 100) + '…' : title
  const displayDesc = description.length > 200 ? description.slice(0, 200) + '…' : description

  return (
    <div
      className="rounded overflow-hidden"
      style={{
        backgroundColor: '#1a1d21',
        borderLeft: '4px solid #4a9eff',
        maxWidth: '500px',
        fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
        padding: '0',
      }}
    >
      <div className="flex items-start gap-3 p-3">
        {/* Left content */}
        <div className="flex-1 min-w-0">
          {siteName && (
            <p className="text-xs font-bold mb-1" style={{ color: '#4a9eff' }}>{siteName}</p>
          )}
          {pageUrl ? (
            <a
              className="text-sm font-semibold hover:underline block leading-snug mb-1"
              style={{ color: '#1264a3' }}
              href={pageUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {displayTitle}
            </a>
          ) : (
            <p className="text-sm font-semibold leading-snug mb-1" style={{ color: '#1264a3' }}>
              {displayTitle}
            </p>
          )}
          {displayDesc && (
            <p className="text-xs leading-relaxed" style={{ color: '#d1d2d3' }}>
              {displayDesc}
            </p>
          )}
        </div>

        {/* Thumbnail image on right */}
        {imageUrl && !imgError && (
          <div className="flex-shrink-0 rounded overflow-hidden" style={{ width: '80px', height: '80px' }}>
            <img
              src={imageUrl}
              alt={tags.imageAlt || displayTitle}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          </div>
        )}
        {imageUrl && imgError && (
          <div className="flex-shrink-0 rounded flex items-center justify-center" style={{ width: '80px', height: '80px', backgroundColor: '#2b2d31' }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{ color: '#5e6472' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}
