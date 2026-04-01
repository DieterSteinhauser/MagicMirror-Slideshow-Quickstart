#!/bin/bash

# --- Configuration ---
# Replace these with your actual GitHub Raw URL details
REPO_URL="https://raw.githubusercontent.com/DieterSteinhauser/MagicMirror-Slideshow-Quickstart/refs/heads/master"
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Starting Raspberry Pi Update...${NC}"
sudo apt update && sudo apt full-upgrade -y
sudo apt autoclean && sudo apt autoremove -y

echo -e "${BLUE}Installing and Configuring Rclone...${NC}"
sudo apt install rclone -y

echo -e "${GREEN}ACTION REQUIRED: Follow the Rclone setup wizard.${NC}"
rclone config

echo -e "${BLUE}Making a Local Directory for Images...${NC}"
mkdir -p ~/MirrorPhotos

echo -e "${GREEN}Enter the name of your Google Drive folder (the source):${NC}"
read -r DRIVE_FOLDER_NAME

echo -e "${BLUE}Testing Rclone Sync...${NC}"
rclone sync gdrive:"$DRIVE_FOLDER_NAME" ~/MirrorPhotos -v

echo -e "${BLUE}Setting up Cron Job (Every 15 minutes)...${NC}"
(crontab -l 2>/dev/null | grep -v "rclone sync"; echo "*/15 * * * * rclone sync gdrive:$DRIVE_FOLDER_NAME ~/MirrorPhotos") | crontab -

echo -e "${BLUE}Installing MagicMirror...${NC}"
echo -e "${GREEN}ACTION REQUIRED: Follow the prompts for the MagicMirror installation script.${NC}"
bash -c "$(curl -sL https://raw.githubusercontent.com/sdetweil/MagicMirror_scripts/master/raspberry.sh)"

# Stop the service to allow for module installation and config changes
pm2 stop MagicMirror 2>/dev/null || ~/bin/pm2 stop MagicMirror 2>/dev/null

echo -e "${BLUE}Installing MMM-BackgroundSlideshow Module...${NC}"
cd ~/MagicMirror/modules/ || exit
git clone https://github.com/darickc/MMM-BackgroundSlideshow
cd MMM-BackgroundSlideshow || exit
npm install
npm audit fix

# --- Navigate to Config Directory ---
echo -e "${BLUE}Navigating to config directory...${NC}"
cd ~/MagicMirror/config || exit

# --- Pull files from GitHub source ---
echo -e "${BLUE}Downloading config.js and custom.css from GitHub...${NC}"
curl -sSL "$REPO_URL/config.js" -o config.js
curl -sSL "$REPO_URL/custom.css" -o custom.css

echo -e "${GREEN}Setup Complete! Restarting MagicMirror...${NC}"
pm2 start MagicMirror || ~/bin/pm2 start MagicMirror

echo -e "${GREEN}ACTION REQUIRED: Restart the Device to see for full effect...${NC}"