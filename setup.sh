#!/bin/bash

# Welding Simulator PWA - Setup Script
# This script sets up the project for GitHub Pages deployment

echo "🔧 Welding Simulator PWA - Setup"
echo "================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Generate icons
echo ""
echo "🎨 Generating PWA icons..."
npm run generate-icons

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate icons"
    exit 1
fi

echo "✅ Icons generated successfully"

# Build the project
echo ""
echo "🏗️ Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo ""
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created"
    echo "⚠️  Please edit .env file and add your Google Sheets configuration if needed"
fi

# Check if gh-pages is installed
if ! npm list gh-pages &> /dev/null; then
    echo ""
    echo "📤 Installing gh-pages for deployment..."
    npm install --save-dev gh-pages
    echo "✅ gh-pages installed"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env file if you want Google Sheets integration"
echo "2. Test locally: npm run preview"
echo "3. Deploy to GitHub Pages: npm run deploy"
echo ""
echo "🔗 Local preview: http://localhost:4173/Simulador/"
echo ""
echo "📚 Documentation:"
echo "- README.md - Full project documentation"
echo "- SETUP.md - Quick setup guide"
echo "- TROUBLESHOOTING.md - Common issues and solutions"
echo ""
echo "Happy welding! 🔥"