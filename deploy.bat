@echo off
setlocal enabledelayedexpansion

:: RealBrave Deployment Script (Windows)
:: This script pushes code to GitHub and deploys to Vercel

echo 🚀 Starting RealBrave deployment process...
echo ===========================================

:: Check if we're in a git repository
if not exist ".git" (
    echo ❌ Error: Not a git repository. Please run this script from the project root.
    pause
    exit /b 1
)

:: Check git status
echo 📊 Checking git status...
git status --porcelain > temp_status.txt
if %errorlevel% neq 0 (
    echo ❌ Error checking git status.
    del temp_status.txt 2>nul
    pause
    exit /b 1
)

for /f %%i in ("temp_status.txt") do set size=%%~zi
if %size% equ 0 (
    echo ✅ No changes detected. Repository is clean.
    set /p "continue=Continue with deployment anyway? (y/N): "
    if /i not "!continue!"=="y" (
        echo ❌ Deployment cancelled.
        del temp_status.txt 2>nul
        pause
        exit /b 0
    )
) else (
    echo 📁 Changes detected in the following files:
    type temp_status.txt
)
del temp_status.txt 2>nul

:: Get commit message from user or use default
echo.
set /p "commit_msg=📝 Enter commit message (or press Enter for auto-generated): "

if "!commit_msg!"=="" (
    for /f "tokens=1-4 delims=/ " %%i in ("%date%") do set datestr=%%i-%%j-%%k
    for /f "tokens=1-2 delims=: " %%i in ("%time%") do set timestr=%%i:%%j
    set "commit_msg=Auto-deployment: Updates from !datestr! !timestr!"
)

echo.
echo 🔄 Starting deployment with commit message: '!commit_msg!'
echo.

:: Stage all changes
echo 📦 Staging all changes...
git add .

:: Check if there are changes to commit
git diff --cached --name-only > temp_diff.txt
for /f %%i in ("temp_diff.txt") do set size=%%~zi
if %size% equ 0 (
    echo ℹ️  No changes to commit.
) else (
    echo 💾 Committing changes...
    git commit -m "!commit_msg!"
    if !errorlevel! neq 0 (
        echo ❌ Failed to commit changes.
        del temp_diff.txt 2>nul
        pause
        exit /b 1
    )
)
del temp_diff.txt 2>nul

:: Push to GitHub
echo ⬆️  Pushing to GitHub...
git push origin main

if %errorlevel% equ 0 (
    echo ✅ Successfully pushed to GitHub!
) else (
    echo ❌ Failed to push to GitHub. Please check your connection and try again.
    pause
    exit /b 1
)

:: Deploy to Vercel
echo 🌐 Deploying to Vercel...
vercel --prod

if %errorlevel% equ 0 (
    echo.
    echo 🎉 DEPLOYMENT SUCCESSFUL!
    echo ===========================================
    echo ✅ Code pushed to GitHub
    echo ✅ Website deployed to Vercel
    echo 🌐 Your site is live at: https://realbrave.eu
    echo.
) else (
    echo ❌ Vercel deployment failed. Please check the error above.
    pause
    exit /b 1
)

pause