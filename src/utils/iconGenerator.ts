// Simple SVG icon generator for PWA
export const generatePWAIcons = () => {
  const iconSVGs = {
    '192x192': `<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192">
      <rect width="192" height="192" fill="#1976d2" rx="24"/>
      <path d="M96 48 L128 96 L96 144 L64 96 Z" fill="white"/>
      <circle cx="96" cy="96" r="8" fill="white"/>
    </svg>`,
    '512x512': `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
      <rect width="512" height="512" fill="#1976d2" rx="64"/>
      <path d="M256 128 L341.3 256 L256 384 L170.7 256 Z" fill="white"/>
      <circle cx="256" cy="256" r="20" fill="white"/>
    </svg>`
  }
  
  return iconSVGs
}