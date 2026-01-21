#!/bin/bash

# RealBrave Deployment Script
# This script pushes code to GitHub and deploys to Vercel

set -e  # Exit on any error

echo "🚀 Starting RealBrave deployment process..."
echo "==========================================="

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not a git repository. Please run this script from the project root."
    exit 1
fi

# Check git status
echo "📊 Checking git status..."
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ No changes detected. Repository is clean."
    read -p "Continue with deployment anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Deployment cancelled."
        exit 0
    fi
else
    echo "📁 Changes detected in the following files:"
    git status --porcelain
fi

# Get commit message from user or use default
echo ""
read -p "📝 Enter commit message (or press Enter for auto-generated): " commit_msg

if [ -z "$commit_msg" ]; then
    timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    commit_msg="Auto-deployment: Updates from $timestamp"
fi

echo ""
echo "🔄 Starting deployment with commit message: '$commit_msg'"
echo ""

# Stage all changes
echo "📦 Staging all changes..."
git add .

# Check if there are changes to commit
if [ -z "$(git diff --cached --name-only)" ]; then
    echo "ℹ️  No changes to commit."
else
    echo "💾 Committing changes..."
    git commit -m "$commit_msg"
fi

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
else
    echo "❌ Failed to push to GitHub. Please check your connection and try again."
    exit 1
fi

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 DEPLOYMENT SUCCESSFUL!"
    echo "==========================================="
    echo "✅ Code pushed to GitHub"
    echo "✅ Website deployed to Vercel"
    echo "🌐 Your site is live at: https://realbrave.eu"
    echo ""
else
    echo "❌ Vercel deployment failed. Please check the error above."
    exit 1
fi