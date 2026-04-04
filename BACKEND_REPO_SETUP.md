# Separate Backend Repository Setup Guide

This guide explains how to create a separate GitHub repository for the backend and deploy it on Render.

## Why Separate Repositories?

- **Independent Deployment:** Deploy backend and frontend separately
- **Scalability:** Scale backend independently from frontend
- **Flexibility:** Different deployment platforms for different parts
- **Development:** Teams can work on frontend/backend independently
- **Faster Builds:** Smaller repo = faster CI/CD pipelines

## Option 1: Quick Setup (Recommended)

### For Windows:

```powershell
# Navigate to the project root
cd c:\Users\harsh\event-system

# Run the setup script
.\setup-backend-repo.ps1
```

### For Mac/Linux:

```bash
# Navigate to the project root
cd event-system

# Make script executable
chmod +x setup-backend-repo.sh

# Run the setup script
./setup-backend-repo.sh
```

Then follow the on-screen instructions.

## Option 2: Manual Setup

### Step 1: Create New GitHub Repository

1. Go to [GitHub New Repository](https://github.com/new)
2. Name it `CertifyHub-Backend`
3. Add description: "Backend API for CertifyHub event management system"
4. Keep it public or private
5. **Do NOT** initialize with README, .gitignore, or license
6. Click "Create repository"
7. Copy the repository URL (HTTPS)

### Step 2: Prepare Backend Repository Locally

**On Windows (PowerShell):**

```powershell
# Navigate to event-system root
cd c:\Users\harsh\event-system

# Create a temporary directory for backend
mkdir CertifyHub-Backend-tmp
cd CertifyHub-Backend-tmp

# Initialize git
git init

# Copy server files
Copy-Item -Path "..\server\*" -Destination "." -Recurse -Force

# Add git config
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Create initial commit
git add .
git commit -m "Initial commit: CertifyHub Backend"
```

**On Mac/Linux (Bash):**

```bash
# Navigate to event-system root
cd event-system

# Create a temporary directory for backend
mkdir CertifyHub-Backend-tmp
cd CertifyHub-Backend-tmp

# Initialize git
git init

# Copy server files
cp -r ../server/* .

# Add git config
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Create initial commit
git add .
git commit -m "Initial commit: CertifyHub Backend"
```

### Step 3: Push to GitHub

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/CertifyHub-Backend.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

You should see output indicating successful push.

### Step 4: Verify Upload

1. Go to your new repository on GitHub
2. Verify all backend files are there
3. Check that the commit history is correct

### Step 5: Clean Up

Delete the temporary directory locally after confirming files are on GitHub:

**Windows:**
```powershell
cd ..
Remove-Item -Path "CertifyHub-Backend-tmp" -Recurse -Force
```

**Mac/Linux:**
```bash
cd ..
rm -rf CertifyHub-Backend-tmp
```

## Repository Structure After Separation

### Main Repository (CertifyHub)
```
CertifyHub/
├── client/              # Frontend (React + Vite)
├── README.md            # Main project README
└── RENDER_DEPLOYMENT.md # Frontend deployment guide
```

### Backend Repository (CertifyHub-Backend)
```
CertifyHub-Backend/
├── routes/              # API routes
├── models/              # Database models
├── middleware/          # Auth and other middleware
├── index.js             # Server entry point
├── package.json         # Dependencies
├── Procfile             # Process file
├── .env.example         # Environment variables template
└── README.md            # Backend README
```

## Next Steps

1. **Create Backend GitHub Repository** ✓ (Done above)
2. **Deploy on Render:**
   - Read `RENDER_DEPLOYMENT.md` in the project root
   - Follow the step-by-step deployment guide
3. **Update Frontend Configuration:**
   - Set `VITE_API_URL` to your Render backend URL
4. **Test Integration:**
   - Verify frontend can communicate with backend
5. **Continuous Integration:**
   - Push to backend repo = automatic Render deployment
   - Push to frontend repo = automatic Vercel deployment

## Backend-Only README

Here's a template for `README.md` in your new backend repository:

```markdown
# CertifyHub Backend API

RESTful API backend for the CertifyHub event management system.

## Tech Stack

- Node.js with Express.js
- MongoDB for database
- JWT for authentication
- Nodemailer for email notifications

## Quick Start

### Prerequisites
- Node.js >=18.0.0
- MongoDB Atlas account

### Installation

\`\`\`bash
npm install
\`\`\`

### Environment Variables

Create a `.env` file:

\`\`\`
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/certifyhub
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
CLIENT_URL=http://localhost:5173
\`\`\`

### Running

**Development:**
\`\`\`bash
npm run dev
\`\`\`

**Production:**
\`\`\`bash
npm start
\`\`\`

## API Endpoints

- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user
- GET `/api/events` - Get all events
- POST `/api/events` - Create event
- POST `/api/registrations` - Register for event
- GET `/api/certificates/:id` - Generate certificate

## Deployment

See [RENDER_DEPLOYMENT.md](../RENDER_DEPLOYMENT.md) for Render deployment instructions.

## License

MIT
\`\`\`

## Common Issues

### Push Rejected
- **Problem:** `fatal: 'origin' does not appear to be a 'git' repository`
- **Solution:** Make sure you ran `git remote add origin ...`

### Files Not Showing on GitHub
- **Problem:** Files show locally but not on GitHub
- **Solution:** 
  1. Check: `git status` should show nothing
  2. Check: `git log --oneline` should show at least one commit
  3. Re-push: `git push -u origin main`

### Connection Issues
- **Problem:** `Could not resolve host: github.com`
- **Solution:** Check internet connection, try SSH instead of HTTPS

### Authentication
- **Problem:** `fatal: Authentication failed`
- **Solution:** Use GitHub Personal Access Token (if using HTTPS) or SSH keys

## Need Help?

1. Check the main `RENDER_DEPLOYMENT.md` for deployment help
2. Review GitHub documentation
3. Check Render documentation

---

**For more info on the full project, visit:** https://github.com/Harsh181507/CertifyHub
```

## Summary

✅ Your backend is now ready to be deployed independently!

**Next:** Follow `RENDER_DEPLOYMENT.md` to deploy your backend on Render.

---

**Questions?** Refer to the deployment guide or the platform documentation.
