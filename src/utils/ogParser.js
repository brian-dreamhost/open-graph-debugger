export function parseOGTags(html) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  const getMeta = (attr, value) => {
    const el = doc.querySelector(`meta[${attr}="${value}"]`)
    return el ? el.getAttribute('content') : null
  }

  return {
    // Open Graph
    title: getMeta('property', 'og:title') || getMeta('name', 'og:title'),
    description: getMeta('property', 'og:description') || getMeta('name', 'og:description'),
    image: getMeta('property', 'og:image') || getMeta('name', 'og:image'),
    url: getMeta('property', 'og:url') || getMeta('name', 'og:url'),
    type: getMeta('property', 'og:type') || getMeta('name', 'og:type'),
    siteName: getMeta('property', 'og:site_name') || getMeta('name', 'og:site_name'),
    imageWidth: getMeta('property', 'og:image:width'),
    imageHeight: getMeta('property', 'og:image:height'),
    imageAlt: getMeta('property', 'og:image:alt'),

    // Twitter Card
    twitterCard: getMeta('name', 'twitter:card'),
    twitterTitle: getMeta('name', 'twitter:title'),
    twitterDescription: getMeta('name', 'twitter:description'),
    twitterImage: getMeta('name', 'twitter:image'),
    twitterImageAlt: getMeta('name', 'twitter:image:alt'),
    twitterSite: getMeta('name', 'twitter:site'),
    twitterCreator: getMeta('name', 'twitter:creator'),

    // Fallbacks from regular meta/title
    metaDescription: getMeta('name', 'description'),
    pageTitle: doc.querySelector('title')?.textContent || null,
  }
}

export function auditTags(tags) {
  const issues = []
  const warnings = []
  const passes = []

  // Required OG tags
  if (!tags.title) issues.push({ tag: 'og:title', message: 'Missing — required for all platforms' })
  else passes.push({ tag: 'og:title', message: tags.title.length > 60 ? `${tags.title.length} chars (ideal: 40-60)` : 'Good' })

  if (!tags.description) issues.push({ tag: 'og:description', message: 'Missing — required for all platforms' })
  else if (tags.description.length > 155) warnings.push({ tag: 'og:description', message: `${tags.description.length} chars — may be truncated (ideal: <155)` })
  else passes.push({ tag: 'og:description', message: 'Good' })

  if (!tags.image) issues.push({ tag: 'og:image', message: 'Missing — no preview image will show' })
  else passes.push({ tag: 'og:image', message: 'Present' })

  if (!tags.url) warnings.push({ tag: 'og:url', message: 'Missing — recommended for canonical URL' })
  else passes.push({ tag: 'og:url', message: 'Present' })

  if (!tags.type) warnings.push({ tag: 'og:type', message: 'Missing — defaults to "website"' })
  else passes.push({ tag: 'og:type', message: tags.type })

  if (!tags.siteName) warnings.push({ tag: 'og:site_name', message: 'Missing — used by Facebook for display' })
  else passes.push({ tag: 'og:site_name', message: tags.siteName })

  // Twitter Card
  if (!tags.twitterCard) warnings.push({ tag: 'twitter:card', message: 'Missing — defaults to "summary" but explicit is better' })
  else passes.push({ tag: 'twitter:card', message: tags.twitterCard })

  if (!tags.twitterImage && tags.image) warnings.push({ tag: 'twitter:image', message: 'Missing — will fall back to og:image' })

  // Image dimensions
  if (tags.image && (!tags.imageWidth || !tags.imageHeight)) {
    warnings.push({ tag: 'og:image:width/height', message: 'Missing — specify for faster rendering (recommended: 1200×630)' })
  }

  if (!tags.imageAlt && !tags.twitterImageAlt) {
    warnings.push({ tag: 'og:image:alt', message: 'Missing — important for accessibility' })
  }

  return { issues, warnings, passes }
}

export function resolveImageUrl(imageUrl, pageUrl) {
  if (!imageUrl) return null
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return imageUrl
  if (imageUrl.startsWith('//')) return 'https:' + imageUrl
  if (imageUrl.startsWith('/') && pageUrl) {
    try {
      const base = new URL(pageUrl)
      return base.origin + imageUrl
    } catch {
      return imageUrl
    }
  }
  return imageUrl
}
