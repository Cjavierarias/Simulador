# 🔧 Guía de Solución de Problemas - Welding Simulator PWA

## 🚨 Problemas Comunes y Soluciones

### Error 404 en GitHub Pages

**Problema**: `Failed to load resource: the server responded with a status of 404`

**Causa**: Configuración incorrecta para GitHub Pages con routing del lado del cliente.

**Solución**:

1. **Verificar estructura de archivos**:
   ```bash
   # Asegúrate de que todos estos archivos estén en /public/
   /public/manifest.json
   /public/sw.js
   /public/404.html
   /public/.nojekyll
   /public/pwa-192x192.svg
   /public/pwa-512x512.svg
   ```

2. **Configurar GitHub Pages**:
   - Ir a Settings → Pages de tu repositorio
   - Source: Deploy from a branch
   - Branch: gh-pages (o main si usas otro branch)
   - Folder: / (root)

3. **Hacer build y deploy**:
   ```bash
   npm install
   npm run build
   npm run deploy
   ```

### Warning de Apple Mobile Web App

**Problema**: `<meta name="apple-mobile-web-app-capable" content="yes"> is deprecated`

**Solución**: Ya corregido en el código. Se agregó:
```html
<meta name="mobile-web-app-capable" content="yes">
```

### La app no arranca en móvil

**Causa**: Posibles problemas de permisos o configuración PWA.

**Solución paso a paso**:

1. **Verificar HTTPS**: GitHub Pages usa HTTPS automáticamente ✅

2. **Verificar manifest**: El archivo `/Simulador/manifest.json` debe estar accesible

3. **Limpiar cache**:
   - Chrome: F12 → Application → Storage → Clear storage
   - Safari: Settings → Safari → Clear History and Website Data

4. **Permisos de sensores**: Asegúrate de conceder permisos cuando se soliciten

5. **Probar en modo incógnito**: Para evitar problemas de cache

### Error de Service Worker

**Problema**: Service Worker no se registra correctamente

**Verificación**:
1. Abrir Developer Tools (F12)
2. Ir a Application → Service Workers
3. Verificar que `/Simulador/sw.js` esté registrado
4. Si no aparece, verificar la ruta en Network tab

**Solución**:
```javascript
// En el index.html, verificar que la ruta sea correcta:
navigator.serviceWorker.register('/Simulador/sw.js')
```

### Problemas de Router con GitHub Pages

**Causa**: BrowserRouter no funciona con GitHub Pages

**Solución**: Ya implementado HashRouter en App.tsx

**Verificar**:
- La URL debe mostrar `/#/simulator` en lugar de `/simulator`
- Todas las rutas deben usar `#` como prefijo

## 🔍 Verificación de Instalación

### 1. Verificar archivos esenciales
```bash
# Estos archivos deben existir:
ls -la public/
# Deberías ver:
# manifest.json
# sw.js
# 404.html
# .nojekyll
# pwa-192x192.svg
# pwa-512x512.svg
```

### 2. Verificar build
```bash
npm run build
# Debe crear dist/ sin errores
ls -la dist/
```

### 3. Verificar manifest
```bash
# El manifest.json debe ser válido JSON
cat public/manifest.json | jq .
```

### 4. Test local
```bash
npm run preview
# Abrir http://localhost:4173/Simulador/
```

## 📱 Testing en Dispositivo Móvil

### Chrome (Android):
1. Abrir `https://cjavierarias.github.io/Simulador/`
2. Tocar menú → "Add to Home screen"
3. Probar la app instalada

### Safari (iOS):
1. Abrir en Safari
2. Compartir → "Add to Home Screen"
3. Probar la app instalada

### Verificar PWA:
1. Abrir Developer Tools
2. Ir a Application → Manifest
3. Debe mostrar todos los campos sin errores

## 🚀 Deploy Automático a GitHub Pages

### Método 1: npm script
```bash
npm run deploy:github
```

### Método 2: GitHub Actions
Crear `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v2
      with:
        node-version: '18'
    - run: npm install
    - run: npm run build
    - uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 🔧 Debugging Avanzado

### 1. Console Errors
```javascript
// En Developer Console, verificar:
console.log('Service Worker:', navigator.serviceWorker)
console.log('Manifest:', navigator.serviceWorker.getRegistrations())
```

### 2. Network Tab
- Verificar que todos los recursos se cargan (200 status)
- Service Worker debe aparecer con status `sw`
- Manifest debe cargarse correctamente

### 3. Application Tab
- **Manifest**: Verificar todos los campos
- **Service Workers**: Debe mostrar registrado y activo
- **Storage**: Verificar cache y datos

### 4. Performance
- **Lighthouse**: Usar para verificar PWA score
- **Web Vitals**: Verificar Core Web Vitals

## 📞 Solución de Problemas Específicos

### Si la cámara no funciona:
1. Verificar HTTPS (debe ser https://)
2. Conceder permisos de cámara
3. Probar con otro navegador

### Si los sensores no responden:
1. Verificar permisos de movimiento
2. Probar en Chrome (mejor soporte)
3. Verificar que el dispositivo tenga sensores

### Si no se genera certificado:
1. Verificar que jsPDF esté cargado
2. Verificar permisos de descarga
3. Probar con otro navegador

### Si no funciona el AR tracking:
1. Verificar iluminación (no muy oscura)
2. Verificar patrón AR visible
3. Mantener patrón estable

## ✅ Checklist Final

Antes de reportar un problema, verificar:

- [ ] Todos los archivos están en `/public/`
- [ ] El build se completó sin errores
- [ ] GitHub Pages está configurado correctamente
- [ ] La URL es https://cjavierarias.github.io/Simulador/
- [ ] Probado en modo incógnito
- [ ] Cache limpiado
- [ ] Permisos concedidos
- [ ] Developer Tools sin errores críticos

## 🆘 Si el Problema Persiste

1. **Probar en desktop primero**: Verificar que funcione en Chrome desktop
2. **Probar otros navegadores**: Chrome, Firefox, Safari
3. **Verificar consola**: Buscar errores específicos
4. **Revisar Network tab**: Verificar recursos que fallan
5. **Reporte con detalles**:
   - Navegador y versión
   - Dispositivo y OS
   - Pasos para reproducir
   - Screenshots de errores

La aplicación debería funcionar correctamente con estos ajustes. El problema principal era la configuración para GitHub Pages y la falta de archivos PWA esenciales.