import { useState } from 'react'

function ImagePlaceholder({ label }) {
  return (
    <div className="w-full bg-[#e4e6eb] flex items-center justify-center" style={{ aspectRatio: '1.91/1' }}>
      <div className="flex flex-col items-center gap-2 text-[#bec3c9]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        <span className="text-xs font-medium">{label || 'No image (1200×630 recommended)'}</span>
      </div>
    </div>
  )
}

export default function FacebookPreview({ tags }) {
  const [imgError, setImgError] = useState(false)

  const title = tags.title || tags.pageTitle || 'Page Title'
  const description = tags.description || tags.metaDescription || ''
  const siteName = tags.siteName || (tags.url ? (() => { try { return new URL(tags.url).hostname } catch { return '' } })() : '')
  const imageUrl = tags.image

  const displayTitle = title.length > 80 ? title.slice(0, 80) + '…' : title
  const displayDesc = description.length > 130 ? description.slice(0, 130) + '…' : description

  return (
    <div className="rounded-lg overflow-hidden border border-[#ced0d4]" style={{ backgroundColor: '#fff', fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', maxWidth: '500px' }}>
      {/* Image area */}
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
        <ImagePlaceholder label={imageUrl && imgError ? 'Image failed to load' : undefined} />
      )}

      {/* Text content */}
      <div className="px-3 py-2 border-t border-[#ced0d4]" style={{ backgroundColor: '#f2f3f5' }}>
        {siteName && (
          <p className="text-xs uppercase mb-1" style={{ color: '#606770', letterSpacing: '0.05em' }}>
            {siteName}
          </p>
        )}
        <p className="text-sm font-semibold leading-snug mb-1" style={{ color: '#1c1e21' }}>
          {displayTitle}
        </p>
        {displayDesc && (
          <p className="text-xs leading-snug" style={{ color: '#606770' }}>
            {displayDesc}
          </p>
        )}
      </div>
    </div>
  )
}
