# PowerShell script to create a separate backend repository for Windows

Write-Host "CertifyHub Backend Repository Setup" -ForegroundColor Yellow
Write-Host "=======================================" -ForegroundColor Yellow
Write-Host ""

# Check if server directory exists
if (-not (Test-Path "server")) {
    Write-Host "Error: 'server' directory not found!" -ForegroundColor Red
    Write-Host "Please run this script from the root of the event-system project."
    exit 1
}

# Create temp directory
$TEMP_DIR = "CertifyHub-Backend-tmp"
if (Test-Path $TEMP_DIR) {
    Write-Host "$TEMP_DIR already exists. Please remove it first." -ForegroundColor Red
    exit 1
}

Write-Host "Creating temporary backend repository..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path $TEMP_DIR | Out-Null
cd $TEMP_DIR

# Initialize git
git init
Write-Host "✓ Git initialized" -ForegroundColor Green

# Copy server files
Copy-Item -Path "..\server\*" -Destination "." -Recurse -Force
Write-Host "✓ Backend files copied" -ForegroundColor Green

# Add all files and create initial commit
git add .
git commit -m "Initial commit: CertifyHub Backend"
Write-Host "✓ Initial commit created" -ForegroundColor Green

Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Create a new GitHub repository named 'CertifyHub-Backend'"
Write-Host "2. Run these commands in the $TEMP_DIR directory:"
Write-Host ""
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/CertifyHub-Backend.git" -ForegroundColor Yellow
Write-Host "   git branch -M main" -ForegroundColor Yellow
Write-Host "   git push -u origin main" -ForegroundColor Yellow
Write-Host ""
Write-Host "3. After pushing, delete the $TEMP_DIR folder"
Write-Host "4. Follow RENDER_DEPLOYMENT.md for deployment instructions"
Write-Host ""
Write-Host "Repository ready in: $TEMP_DIR" -ForegroundColor Green
