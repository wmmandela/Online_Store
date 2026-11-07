import { products } from '../data/products'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'https://online-store-peach-three.vercel.app'
  const currentDate = new Date().toISOString().split('T')[0]

  const staticRoutes = [
    { url: '/', changefreq: 'daily', priority: '1.0' },
    { url: '/products', changefreq: 'daily', priority: '0.9' },
    { url: '/about', changefreq: 'weekly', priority: '0.7' },
    { url: '/cart', changefreq: 'weekly', priority: '0.5' },
  ]

  const productRoutes = products.map((p) => ({
    url: `/products/${p.slug}`,
    changefreq: 'weekly',
    priority: '0.8',
  }))

  const allRoutes = [...staticRoutes, ...productRoutes]

  const xmlUrls = allRoutes
    .map(
      (r) => `  <url>
    <loc>${siteUrl}${r.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
    )
    .join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=86400')

  return sitemap
})
