# Vercel Frontend Deployment Guide

Guide for deploying the CertifyHub frontend to Vercel.

## Prerequisites

- A [Vercel](https://vercel.com/) account
- Frontend GitHub repository: `CertifyHub-Frontend`
- Backend API deployed and running (on Render or similar)
- Node.js v18+ installed locally

## Prerequisites Checklist

- ✅ Vercel account created
- ✅ GitHub repository `https://github.com/Harsh181507/CertifyHub-Frontend` created
- ✅ Backend API URL (e.g., `https://certifyhub-backend.onrender.com`)

## Quick Deploy (Recommended)

### Step 1: Connect GitHub to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Click "Import Git Repository"
4. Authorize Vercel with GitHub
5. Select `Harsh181507/CertifyHub-Frontend`
6. Click "Import"

### Step 2: Configure Project

On the "Configure Project" page:

- **Framework Preset:** Vite
- **Root Directory:** (leave empty)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Step 3: Add Environment Variables

Click "Environment Variables" and add:

```
VITE_API_URL=https://your-backend-url.onrender.com
```

(Replace with your actual Render backend URL)

### Step 4: Deploy

Click "Deploy" and wait for the deployment to complete. Vercel will provide you with a URL like:
```
https://certifyhub-frontend.vercel.app
```

## Manual Setup (If Needed)

### Step 1: Clone Repository Locally

```bash
git clone https://github.com/Harsh181507/CertifyHub-Frontend.git
cd CertifyHub-Frontend
```

### Step 2: Install Vercel CLI

```bash
npm i -g vercel
```

### Step 3: Create .env File

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
VITE_API_URL=https://your-backend-api-url.onrender.com
```

### Step 4: Test Locally

```bash
npm install
npm run build
```

### Step 5: Deploy with Vercel CLI

```bash
vercel
```

Follow the prompts and Vercel will deploy your app.

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API base URL | https://certifyhub-backend.onrender.com |

### .env.example Template

```env
# API Configuration
VITE_API_URL=http://localhost:5000
```

## Project Structure

```
CertifyHub-Frontend/
├── src/
│   ├── pages/              # Page components
│   │   ├── Landing.jsx     # Home page
│   │   ├── Auth.jsx        # Login/Register
│   │   ├── Dashboard.jsx   # User dashboard
│   │   └── Events.jsx      # Events listing
│   ├── components/         # Reusable components
│   │   └── Navbar.jsx      # Navigation
│   ├── assets/             # Images and static files
│   ├── App.jsx             # Root component
│   └── main.jsx            # Entry point
├── public/                 # Static files
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS config
└── .env.example            # Environment template
```

## Build & Deployment

### Development

```bash
npm install
npm run dev
```

Runs on `http://localhost:5173`

### Production Build

```bash
npm run build
```

Creates optimized build in `dist/` folder

### Preview Build Locally

```bash
npm run preview
```

## API Configuration

The frontend uses the `VITE_API_URL` environment variable to connect to the backend.

**Development:** `http://localhost:5000`  
**Production:** (Your Render backend URL)

Example API calls:
```javascript
const API_URL = import.meta.env.VITE_API_URL;

// Login
fetch(`${API_URL}/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(credentials)
})

// Get Events
fetch(`${API_URL}/api/events`)
```

## Auto-Deployment

Vercel automatically redeployes when you push to the `main` branch.

To disable auto-deployment:
1. Go to Vercel Dashboard
2. Project Settings
3. Git
4. Disable "Deploy on Push"

## Custom Domain (Optional)

1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Troubleshooting

### Build Fails

**Problem:** `npm ERR! peer dep missing`
- **Solution:** Run `npm install --legacy-peer-deps`

**Problem:** `ENOSPC: no space left on device`
- **Solution:** Clear cache: `npm cache clean --force`

### Blank Page or 404 Errors

**Problem:** Frontend loads but shows blank page
- **Solution:** Check browser console for errors. Usually API_URL misconfiguration.

**Problem:** API endpoints return 404
- **Solution:** Verify `VITE_API_URL` is correctly set to your backend URL

**Problem:** Fetch errors or CORS issues
- **Solution:** Ensure backend `CLIENT_URL` environment variable matches your Vercel URL

### Cannot Connect to Backend

**Problem:** `Failed to fetch` or network errors
- **Solution:**
  1. Verify backend is running on Render
  2. Check `VITE_API_URL` environment variable
  3. Restart Vercel deployment

### Dependencies Issues

**Problem:** `yarn add` vs `npm install`
- **Solution:** Use consistent package manager. Repository uses npm.

## Performance Tips

1. **Image Optimization:** Use Vercel's Image Optimization
   ```jsx
   import Image from 'next/image' // if using Next.js
   ```

2. **Code Splitting:** Vercel handles this automatically with Vite

3. **Caching:** Set appropriate cache headers in `vercel.json` if needed

## Vercel Features

### Preview Deployments
- Automatic preview URL for PRs
- Test changes before merging

### Analytics
- View traffic and performance metrics
- Monitor deployment health

### Edge Middleware
- Add custom logic at edge level
- Perfect for authentication checks

## Monitoring

1. **Vercel Dashboard:** View build logs and deployments
2. **Analytics:** Track page views and performance
3. **Error Tracking:** Monitor client-side errors
4. **Performance:** Check Core Web Vitals

## update VITE_API_URL

If you redeploy your backend or change URLs:

1. Go to Vercel Project Settings
2. Environment Variables
3. Update `VITE_API_URL`
4. Trigger new deployment (push to main or redeploy from dashboard)

## Rollback Previous Version

1. Go to Vercel Deployments page
2. Find the deployment you want to revert to
3. Click the three dots
4. Select "Promote to Production"

## Integration with Backend

Your frontend is now configured to communicate with the Render backend.

**Frontend:** https://certifyhub-frontend.vercel.app  
**Backend:** https://certifyhub-backend.onrender.com

## Next Steps

1. ✅ Deploy frontend to Vercel
2. ✅ Set up backend on Render
3. ✅ Configure VITE_API_URL
4. ✅ Test API integration
5. ✅ Set up custom domain (optional)
6. ✅ Monitor performance

## Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [Vercel CLI Reference](https://vercel.com/cli/reference)
- [Environment Variables](https://vercel.com/docs/build-output-api/v3/environment-variables)

## Support

For deployment issues:
1. Check Vercel dashboard logs
2. Review browser console errors
3. Verify environment variables
4. Check backend connectivity
5. Open issue on GitHub

---

**Your Frontend URL:** (Will be provided after deploy)

**Backend URL:** (Update this after deploying backend)

Happy deploying! 🚀
