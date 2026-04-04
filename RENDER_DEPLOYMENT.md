# Render Deployment Guide

This guide walks you through deploying the CertifyHub backend to Render.

## Prerequisites

- A [Render](https://render.com/) account
- Backend GitHub repository created
- MongoDB Atlas account (for MongoDB database)
- Backend code pushed to GitHub

## Step 1: Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster or use an existing one
3. Get your connection string:
   - Click "Connect"
   - Select "Drivers"
   - Copy the connection string
   - Replace `<username>`, `<password>`, `<cluster>` with your actual credentials

Example:
```
mongodb+srv://username:password@cluster0.mongodb.net/certifyhub?retryWrites=true&w=majority
```

## Step 2: Create GitHub Repository for Backend

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `CertifyHub-Backend` (or similar)
3. Keep it public or private as per your preference
4. Do NOT initialize with README (we'll push existing code)

## Step 3: Push Backend Code to New Repository

From your local machine:

```bash
# Navigate to the event-system directory
cd c:\Users\harsh\event-system

# Create a new directory for backend-only repo
mkdir CertifyHub-Backend-temp
cd CertifyHub-Backend-temp

# Initialize git repository
git init

# Copy server files
xcopy ..\server\* . /E /I

# Add and commit
git add .
git commit -m "Initial commit: CertifyHub Backend"

# Add remote (replace YOUR_USERNAME/YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/CertifyHub-Backend.git

# Push to GitHub
git branch -M main
git push -u origin main

# Clean up
cd ..
# You can delete CertifyHub-Backend-temp folder now
```

**OR on Mac/Linux:**

```bash
# Navigate to the event-system directory
cd event-system

# Create a new directory for backend-only repo
mkdir CertifyHub-Backend-temp
cd CertifyHub-Backend-temp

# Initialize git repository
git init

# Copy server files
cp -r ../server/* .

# Add and commit
git add .
git commit -m "Initial commit: CertifyHub Backend"

# Add remote (replace YOUR_USERNAME/YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/CertifyHub-Backend.git

# Push to GitHub
git branch -M main
git push -u origin main

# Clean up
cd ..
# Remove the temp folder: rm -rf CertifyHub-Backend-temp
```

## Step 4: Deploy to Render

### Option 1: Using Render Dashboard (Recommended)

1. **Go to [Render Dashboard](https://dashboard.render.com/)**

2. **Create New Web Service**
   - Click "New +"
   - Select "Web Service"
   - Click "Connect repository"
   - Authorize Render with GitHub
   - Select your `CertifyHub-Backend` repository
   - Click "Connect"

3. **Configure Service**
   - **Name:** CertifyHub-Backend (or your preferred name)
   - **Environment:** Node
   - **Region:** Choose closest to you (e.g., US East)
   - **Branch:** main
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

4. **Set Environment Variables**
   - Click "Advanced" or scroll down
   - Click "Add Environment Variable"
   - Add the following:

   ```
   NODE_ENV=production
   PORT=3000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/certifyhub?retryWrites=true&w=majority
   JWT_SECRET=your_very_secure_secret_key_generate_one_here
   JWT_EXPIRE=7d
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_specific_password
   CLIENT_URL=https://your-frontend-url.vercel.app
   ```

5. **Deploy**
   - Select pricing plan (Free tier available)
   - Click "Create Web Service"
   - Render will automatically build and deploy

### Option 2: Using render.yaml (Recommended for team)

Create a `render.yaml` file in the root of your backend repository:

```yaml
services:
  - type: web
    name: certifyhub-backend
    env: node
    plan: starter
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 3000
      - key: MONGO_URI
        scope: runtime
      - key: JWT_SECRET
        scope: runtime
      - key: JWT_EXPIRE
        value: 7d
      - key: EMAIL_SERVICE
        value: gmail
      - key: EMAIL_USER
        scope: runtime
      - key: EMAIL_PASSWORD
        scope: runtime
      - key: CLIENT_URL
        scope: runtime
```

Then follow the dashboard steps above, but the configuration will be auto-populated.

## Step 5: Verify Deployment

1. Render will provide you with a URL (e.g., `https://certifyhub-backend.onrender.com`)

2. Test the health endpoint:
   ```bash
   curl https://your-render-url/
   ```
   Should return: `Backend is running 🚀`

3. Check the logs in Render dashboard for any errors

## Step 6: Connect Frontend to Backend

Update your frontend `.env` file:

```
VITE_API_URL=https://your-render-url
```

## Step 7: Configure CORS (Important)

Your backend already has CORS configured with the `CLIENT_URL` environment variable. Make sure it's set correctly to your frontend URL.

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| NODE_ENV | Environment mode | production |
| PORT | Server port | 3000 |
| MONGO_URI | MongoDB connection string | mongodb+srv://... |
| JWT_SECRET | JWT signing secret | your_secure_key |
| JWT_EXPIRE | JWT expiration time | 7d |
| EMAIL_SERVICE | Email provider | gmail |
| EMAIL_USER | Email account | your_email@gmail.com |
| EMAIL_PASSWORD | Email app password | your_password |
| CLIENT_URL | Frontend URL for CORS | https://frontend.vercel.app |

## Auto-Deployment

Render automatically redeploys when you push to GitHub's main branch.

To disable:
1. Go to service settings
2. Disable "Auto-Deploy"

## Troubleshooting

### Service Won't Start
- Check build and runtime logs in Render dashboard
- Verify Node.js version (>=18.0.0)
- Ensure all dependencies are in `package.json`

### Database Connection Error
- Verify `MONGO_URI` is correct
- Check MongoDB Atlas IP whitelist includes Render's IP
- Test connection string locally

### CORS Errors
- Update `CLIENT_URL` environment variable
- Restart the service
- Check browser console for exact error

### Free Plan Limitations
- Service spins down after 15 minutes of inactivity
- ~0.5 GB RAM
- Upgrade to Starter or Professional for production

## Monitoring

1. **Logs:** Dashboard shows real-time logs
2. **Metrics:** View CPU, memory, request count
3. **Alerts:** Set up email notifications for service failures
4. **Health Checks:** Render monitors your `/` endpoint

## Useful Render Features

- **Preview Environments:** Deploy PRs automatically
- **Cron Jobs:** Schedule background tasks
- **Persistent Disks:** Store data between deployments
- **Private Services:** Internal communication between services

## Next Steps

1. ✅ Push backend to separate GitHub repo
2. ✅ Deploy on Render
3. ✅ Update frontend to use Render URL
4. ✅ Test all API endpoints
5. ✅ Monitor logs and performance
6. ✅ Set up email notifications
7. ✅ Plan scaling as needed

## Support

- [Render Documentation](https://render.com/docs)
- [Render Support](https://render.com/support)
- [Community Discord](https://discord.gg/render)

---

**Deployed Backend URL:** https://your-render-url
