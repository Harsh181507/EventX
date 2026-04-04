#!/bin/bash
# Script to create a separate backend repository

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}CertifyHub Backend Repository Setup${NC}"
echo "======================================="
echo ""

# Check if server directory exists
if [ ! -d "server" ]; then
    echo -e "${RED}Error: 'server' directory not found!${NC}"
    echo "Please run this script from the root of the event-system project."
    exit 1
fi

# Create temp directory
TEMP_DIR="CertifyHub-Backend-tmp"
if [ -d "$TEMP_DIR" ]; then
    echo -e "${RED}$TEMP_DIR already exists. Please remove it first.${NC}"
    exit 1
fi

echo -e "${YELLOW}Creating temporary backend repository...${NC}"
mkdir "$TEMP_DIR"
cd "$TEMP_DIR"

# Initialize git
git init
echo -e "${GREEN}✓ Git initialized${NC}"

# Copy server files
cp -r ../server/* .
echo -e "${GREEN}✓ Backend files copied${NC}"

# Add all files
git add .
git commit -m "Initial commit: CertifyHub Backend"
echo -e "${GREEN}✓ Initial commit created${NC}"

echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Create a new GitHub repository named 'CertifyHub-Backend'"
echo "2. Run these commands in the $TEMP_DIR directory:"
echo ""
echo -e "${YELLOW}   git remote add origin https://github.com/YOUR_USERNAME/CertifyHub-Backend.git${NC}"
echo -e "${YELLOW}   git branch -M main${NC}"
echo -e "${YELLOW}   git push -u origin main${NC}"
echo ""
echo "3. After pushing, delete the $TEMP_DIR folder"
echo "4. Follow RENDER_DEPLOYMENT.md for deployment instructions"
echo ""
echo -e "${GREEN}Repository ready in: $TEMP_DIR${NC}"
