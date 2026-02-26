import { useState } from 'react'

function ImagePlaceholder() {
  return (
    <div className="w-full flex items-center justify-center" style={{ aspectRatio: '1.91/1', backgroundColor: '#eef3f8' }}>
      <div className="flex flex-col items-center gap-2" style={{ color: '#b0c0cc' }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        <span className="text-xs">No image (1200×627 recommended)</span>
      </div>
    </div>
  )
}

export default function LinkedInPreview({ tags }) {
  const [imgError, setImgError] = useState(false)

  const title = tags.title || tags.pageTitle || 'Page Title'
  const description = tags.description || tags.metaDescription || ''
  const siteName = tags.siteName || (tags.url ? (() => { try { return new URL(tags.url).hostname } catch { return '' } })() : '')
  const imageUrl = tags.image
  const sourceUrl = tags.url || ''

  const displayTitle = title.length > 120 ? title.slice(0, 120) + '…' : title
  const displayDesc = description.length > 160 ? description.slice(0, 160) + '…' : description

  return (
    <div className="rounded-lg overflow-hidden border" style={{ backgroundColor: '#ffffff', borderColor: '#dce6f1', maxWidth: '500px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif' }}>
      {/* Image */}
      {imageUrl && !imgError ? (
        <div className="w-full overflow-hidden" style={{ aspectRatio: '1.91/1' }}>
          <img
            src={imageUrl}
            alt={tags.imageAlt || displayTitle}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <ImagePlaceholder />
      )}

      {/* Text content */}
      <div className="px-3 py-2" style={{ backgroundColor: '#eef3f8' }}>
        <p className="text-sm font-semibold leading-snug mb-1" style={{ color: '#000000e0' }}>
          {displayTitle}
        </p>
        {displayDesc && (
          <p className="text-xs leading-snug mb-1" style={{ color: '#00000099' }}>
            {displayDesc}
          </p>
        )}
        <div className="flex items-center gap-1 flex-wrap">
          {siteName && (
            <span className="text-xs" style={{ color: '#00000066' }}>{siteName}</span>
          )}
          {siteName && sourceUrl && (
            <span className="text-xs" style={{ color: '#00000066' }}>·</span>
          )}
          {sourceUrl && (
            <span className="text-xs truncate" style={{ color: '#00000066', maxWidth: '200px' }}>{sourceUrl}</span>
          )}
        </div>
      </div>
    </div>
  )
}
