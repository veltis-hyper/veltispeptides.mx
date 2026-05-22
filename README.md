# Veltis Peptides - SEO Blog Platform

🚀 **Next.js + MDX + GA4 + Automated Daily Blogs**

A high-performance blog platform with automated SEO blog generation, Google Analytics integration, and CI/CD deployment.

## Features

✅ **Next.js 14** - React framework with Server Components  
✅ **MDX** - Write blogs in Markdown with JSX  
✅ **Google Analytics 4** - Full GA4 integration with Measurement ID: `G-3CW4PHN6C3`  
✅ **Automated Blogs** - 2 SEO-optimized posts generated daily  
✅ **GitHub Actions** - Auto-deploy to Vercel on every commit  
✅ **Lighthouse SEO** - Performance scoring and optimization  
✅ **Responsive Design** - Mobile-first, modern UI  
✅ **Fast Static Generation** - Pre-rendered pages for speed  

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/veltis-hyper/veltispeptides.mx.git
cd veltispeptides.mx
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

```bash
cp .env.local.example .env.local
```

Verify GA4 ID in `.env.local`:

```bash
NEXT_PUBLIC_GA_ID=G-3CW4PHN6C3
NEXT_PUBLIC_SITE_URL=https://veltispeptides.mx
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
veltispeptides.mx/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # GA4 integration
│   ├── page.tsx           # Homepage with blog list
│   ├── blog/
│   │   └── [slug]/        # Blog post dynamic route
│   └── globals.css        # Tailwind styles
├── content/
│   └── posts/             # MDX blog posts
│       ├── bpc-157-*.mdx
│       └── ipamorelin-*.mdx
├── lib/
│   └── posts.ts           # Post loading utilities
├── scripts/
│   └── generate-blogs.js  # Daily blog generator
├── .github/workflows/
│   ├── deploy.yml         # Vercel auto-deploy
│   └── seo.yml            # Lighthouse checks
├── package.json
├── next.config.js
├── vercel.json
└── lighthouserc.json
```

## Creating Blog Posts

Add new `.mdx` files in `content/posts/`:

```mdx
---
title: "Your Blog Title"
description: "SEO description"
date: "2026-05-22"
keywords: ["keyword1", "keyword2", "keyword3"]
---

## Heading

Your content here...
```

Posts are automatically:
- Listed on homepage
- Indexed by GA4
- Generated in sitemap
- Optimized for SEO

## Automated Daily Blogs

Every day at **8 AM UTC**, GitHub Actions:

1. Generates 2 new SEO-optimized blog posts
2. Creates a Pull Request for review
3. Auto-deploys to Vercel after merge

**To manually generate blogs:**

```bash
node scripts/generate-blogs.js
```

## GitHub Actions / CI-CD

### Auto-Deploy

On every push to `main`, Vercel automatically:
- Builds the site
- Runs Lighthouse audits
- Deploys to production

### Required GitHub Secrets

Add to `Settings > Secrets and variables > Actions`:

```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id
GITHUB_TOKEN=automatically_provided
```

### Daily Blog Schedule

Triggers automatically every 24 hours. Modify in `.github/workflows/deploy.yml`:

```yaml
schedule:
  - cron: '0 8 * * *'  # 8 AM UTC daily
```

## Google Analytics 4 Setup

✅ **Already integrated!** Your Measurement ID is: `G-3CW4PHN6C3`

### View Analytics

1. Go to [Google Analytics](https://analytics.google.com)
2. Select property: "Veltis Peptides"
3. View real-time data, traffic sources, user behavior

### Track Custom Events

Edit `app/layout.tsx` to add event tracking:

```typescript
gtag('event', 'blog_post_view', {
  'post_title': 'BPC 157...',
  'post_category': 'peptides'
});
```

## SEO Optimization

### Lighthouse Audits

Automatically run on every PR. Target scores:

- **Performance**: 85+
- **Accessibility**: 90+
- **SEO**: 90+

### Best Practices

1. **Keywords in Title/Description**: Use 3-5 targeted keywords
2. **Heading Structure**: H2 for main topics, H3 for subtopics
3. **Internal Links**: Link to related posts
4. **Image Optimization**: Use Next.js `<Image>` component
5. **Meta Tags**: Set via MDX frontmatter

## Performance Tips

- Pages are **pre-rendered** at build time (SSG)
- Images are **optimized** via Cloudflare
- CSS is **minified** and **cached**
- Blog posts are **static** (fast loading)
- Analytics is **non-blocking**

## Deployment

### Vercel (Recommended)

1. Push to `main` branch
2. Vercel automatically detects changes
3. Site deploys to `veltispeptides.mx`
4. GA4 tracks live traffic

### Manual Deploy

```bash
vercel --prod
```

## Troubleshooting

### GA4 not tracking?

1. Verify `NEXT_PUBLIC_GA_ID` in `.env.local`
2. Check `app/layout.tsx` has gtag script
3. Allow 24-48 hours for GA4 to process data

### Blogs not generating?

```bash
node scripts/generate-blogs.js
cat content/posts/*.mdx  # View generated posts
```

### Vercel deployment failing?

1. Check GitHub Actions logs
2. Verify `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
3. Test locally: `npm run build`

## Support & Resources

- [Next.js Docs](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com)
- [Google Analytics](https://analytics.google.com)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com)

## License

Proprietary - Veltis Peptides

---

**Questions?** Contact: support@veltispeptides.mx
