import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

// Precache static assets
precacheAndRoute(self.__WB_MANIFEST)
cleanupOutdatedCaches()

// Cache API requests
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'api-cache',
    networkTimeoutSeconds: 3,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60 // 5 minutes
      })
    ]
  })
)

// Cache images
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
      })
    ]
  })
)

// Cache fonts
registerRoute(
  ({ url }) => 
    url.origin === 'https://fonts.googleapis.com' ||
    url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
      })
    ]
  })
)

// Cache CSS and JS
registerRoute(
  ({ request }) => 
    request.destination === 'style' ||
    request.destination === 'script',
  new StaleWhileRevalidate({
    cacheName: 'static-resources'
  })
)

// Handle offline navigation
self.addEventListener('install', (event) => {
  console.log('Service Worker installing')
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== 'welding-simulator-v1') {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Background sync for offline data
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync-sessions') {
    event.waitUntil(syncOfflineSessions())
  }
})

async function syncOfflineSessions() {
  try {
    // Get unsynced sessions from IndexedDB
    const unsyncedData = await getUnsyncedData()
    
    if (unsyncedData.sessions.length > 0) {
      await syncToGoogleSheets(unsyncedData.sessions)
    }
  } catch (error) {
    console.error('Background sync failed:', error)
  }
}

async function getUnsyncedData() {
  // This would integrate with IndexedDB to get unsynced data
  // Implementation would depend on your data structure
  return { sessions: [] }
}

async function syncToGoogleSheets(sessions) {
  // Sync with Google Sheets API
  try {
    const response = await fetch('/api/syncSessions', {
      method: 'POST',
      body: JSON.stringify({ sessions }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    if (response.ok) {
      console.log('Sessions synced successfully')
    }
  } catch (error) {
    console.error('Sync failed:', error)
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New welding practice session available',
    icon: '/Simulador/icon-192x192.png',
    badge: '/Simulador/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Start Practice',
        icon: '/Simulador/icon-play.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/Simulador/icon-close.png'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('Welding Simulator', options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/Simulador/')
    )
  }
})