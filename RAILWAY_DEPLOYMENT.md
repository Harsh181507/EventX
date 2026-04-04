# Railway Deployment Guide

This guide will walk you through deploying the CertifyHub backend to Railway.

## Prerequisites

- A [Railway](https://railway.app/) account
- Code pushed to GitHub
- MongoDB Atlas account (for MongoDB database)

## Step 1: Prepare MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster or use an existing one
3. Get your connection string:
   - Click "Connect" on your cluster
   - Select "Drivers"
   - Copy the connection string
   - Replace `<username>`, `<password>`, and `<cluster>` with your actual credentials

Example format:
```
mongodb+srv://username:password@cluster0.mongodb.net/certifyhub?retryWrites=true&w=majority
```

## Step 2: Deploy to Railway

### Option 1: Using Railway Dashboard (Recommended)

1. **Connect GitHub Repository**
   - Go to [Railway Dashboard](https://railway.app/dashboard)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Authorize Railway with your GitHub account
   - Select the `Harsh181507/CertifyHub` repository

2. **Configure Build Settings**
   - Select the root source as `server/`
   - Railway will auto-detect Node.js

3. **Set Environment Variables**
   - In the Railway dashboard, go to the project
   - Click on the service (backend)
   - Go to "Variables"
   - Add the following variables:

   ```
   PORT=3000
   NODE_ENV=production
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/certifyhub
   JWT_SECRET=your_very_secure_secret_key_here
   JWT_EXPIRE=7d
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   CLIENT_URL=https://your-frontend-url.vercel.app
   ```

4. **Deploy**
   - Railway will automatically build and deploy
   - Monitor the deployment in real-time
   - Once deployed, you'll get a public URL

### Option 2: Using Railway CLI

1. **Install Railway CLI**
   ```bash
   npm i -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Initialize Railway Project**
   ```bash
   cd server
   railway init
   ```

4. **Link to Your Project**
   - Select your existing Railway project or create a new one

5. **Set Environment Variables**
   ```bash
   railway variables set PORT=3000
   railway variables set NODE_ENV=production
   railway variables set MONGO_URI="mongodb+srv://..."
   railway variables set JWT_SECRET="your_secret_here"
   railway variables set JWT_EXPIRE=7d
   railway variables set EMAIL_SERVICE=gmail
   railway variables set EMAIL_USER=your_email@gmail.com
   railway variables set EMAIL_PASSWORD=your_password
   railway variables set CLIENT_URL=https://your-frontend-url.vercel.app
   ```

6. **Deploy**
   ```bash
   railway up
   ```

## Step 3: Verify Deployment

1. Railway will provide you with a public URL (e.g., `https://certifyhub-production.railway.app`)

2. Test the health check endpoint:
   ```bash
   curl https://your-railway-url/
   ```
   Should return: `Backend is running 🚀`

3. Test with a protected route to verify middleware:
   ```bash
   curl https://your-railway-url/api/protected
   ```
   Should return a 401 error (authentication required)

## Step 4: Update Client Configuration

Update your frontend `.env` file to point to the Railway backend:

```
VITE_API_URL=https://your-railway-url
```

## Step 5: Set Up Auto-Deployment

Railway automatically deploys when you push to your GitHub repository's main branch.

To disable auto-deployment:
1. Go to your Railway project settings
2. Disable automatic deployments

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| NODE_ENV | Environment mode | production |
| MONGO_URI | MongoDB connection string | mongodb+srv://... |
| JWT_SECRET | JWT signing secret | your_secure_key |
| JWT_EXPIRE | JWT expiration time | 7d |
| EMAIL_SERVICE | Email service provider | gmail |
| EMAIL_USER | Email account username | your_email@gmail.com |
| EMAIL_PASSWORD | Email app password | your_password |
| CLIENT_URL | Frontend URL for CORS | https://yourfrontend.com |

## Troubleshooting

### Build Fails
- Check the build logs in Railway dashboard
- Ensure all dependencies in `package.json` are correct
- Verify Node.js version compatibility (>=18.0.0)

### Runtime Errors
- Check the runtime logs in Railway dashboard
- Verify all environment variables are set correctly
- Check MongoDB connection string

### CORS Errors
- Update `CLIENT_URL` environment variable with your frontend URL
- Restart the service after updating variables

### Database Connection Fails
- Verify MongoDB connection string in `MONGO_URI`
- Check MongoDB Atlas network access settings
- Ensure your IP is whitelisted in MongoDB Atlas

## Useful Railway Commands

```bash
# View project info
railway info

# View current variables
railway variables

# View logs
railway logs

# Run a command
railway run command

# Link to existing project
railway link

# Disconnect from project
railway unlink
```

## Monitoring

Railway provides built-in monitoring:
1. Go to your project dashboard
2. View real-time logs
3. Monitor resource usage (CPU, Memory)
4. Set up alerts for errors or high resource usage

## Next Steps

After successful deployment:
1. Update your frontend to use the Railway backend URL
2. Test all API endpoints
3. Set up email notifications
4. Monitor logs regularly for errors
5. Update your README with the deployed URL

## Support

For issues with Railway deployment, refer to:
- [Railway Documentation](https://docs.railway.app/)
- [Railway Support](https://discord.gg/railway)

---

**Deployed at:** https://your-railway-url
