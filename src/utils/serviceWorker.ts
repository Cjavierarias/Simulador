import { Workbox } from 'workbox-window'

export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/Simulador/sw.js')

    wb.addEventListener('waiting', () => {
      if (confirm('Hay una nueva versión disponible. ¿Quieres actualizar?')) {
        wb.messageSkipWaiting()
        window.location.reload()
      }
    })

    wb.addEventListener('controlling', () => {
      window.location.reload()
    })

    wb.register()
      .then(() => {
        console.log('Service Worker registrado correctamente')
      })
      .catch((error) => {
        console.error('Error registrando Service Worker:', error)
      })
  }
}

export const checkForUpdates = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.update()
    })
  }
}

export const requestPersistentStorage = async () => {
  if ('storage' in navigator && 'persist' in navigator.storage) {
    try {
      const isPersisted = await navigator.storage.persist()
      console.log('Persistent storage granted:', isPersisted)
    } catch (error) {
      console.error('Error requesting persistent storage:', error)
    }
  }
}

export const checkStorageEstimate = async () => {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    try {
      const estimate = await navigator.storage.estimate()
      console.log('Storage estimate:', {
        quota: estimate.quota,
        usage: estimate.usage,
        usageDetails: estimate.usageDetails
      })
    } catch (error) {
      console.error('Error checking storage estimate:', error)
    }
  }
}