// Icon generator script - run this to create PWA icons
const fs = require('fs')
const path = require('path')

// Generate PWA icons
function generateIcons() {
  const sizes = [192, 512]
  
  sizes.forEach(size => {
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <rect width="${size}" height="${size}" fill="#1976d2" rx="${size/8}"/>
      <path d="M${size/2} ${size/4} L${size*2/3} ${size/2} L${size/2} ${size*3/4} L${size/3} ${size/2} Z" fill="white"/>
      <circle cx="${size/2}" cy="${size/2}" r="${size/20}" fill="white"/>
    </svg>`
    
    const filename = `pwa-${size}x${size}.svg`
    fs.writeFileSync(path.join(__dirname, 'public', filename), svg)
    console.log(`Generated ${filename}`)
  })
  
  // Generate favicon
  const faviconSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <rect width="32" height="32" fill="#1976d2" rx="4"/>
    <path d="M16 8 L21.3 16 L16 24 L10.7 16 Z" fill="white"/>
    <circle cx="16" cy="16" r="2" fill="white"/>
  </svg>`
  
  fs.writeFileSync(path.join(__dirname, 'public', 'vite.svg'), faviconSVG)
  console.log('Generated favicon.svg')
  
  // Generate apple-touch-icon
  const appleIconSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
    <rect width="180" height="180" fill="#1976d2" rx="24"/>
    <path d="M90 45 L120 90 L90 135 L60 90 Z" fill="white"/>
    <circle cx="90" cy="90" r="9" fill="white"/>
  </svg>`
  
  fs.writeFileSync(path.join(__dirname, 'public', 'apple-touch-icon.png.svg'), appleIconSVG)
  console.log('Generated apple-touch-icon.svg')
}

generateIcons()