# Script de deploy completo
Write-Host "🚀 Iniciando deploy completo..." -ForegroundColor Green

# 1. Compilar y desplegar backend
Write-Host "📦 Compilando backend..." -ForegroundColor Yellow
npm run build

Write-Host "⚡ Desplegando Functions y Firestore..." -ForegroundColor Yellow
firebase deploy --only "functions,firestore"

# 2. Compilar frontend
Write-Host "🎨 Compilando frontend..." -ForegroundColor Yellow
Set-Location ..\frontend
ng build --configuration production

# 3. Crear carpeta dist en backend si no existe
Set-Location ..\backend
if (!(Test-Path "dist")) {
    New-Item -ItemType Directory -Name "dist"
}

# 4. Copiar archivos del frontend
Write-Host "📂 Copiando archivos del frontend..." -ForegroundColor Yellow
Copy-Item -Path "..\frontend\dist\frontend\*" -Destination ".\dist" -Recurse -Force

# 5. Desplegar hosting
Write-Host "🌐 Desplegando hosting..." -ForegroundColor Yellow
firebase deploy --only hosting

Write-Host "✅ Deploy completo!" -ForegroundColor Green
Write-Host "🌍 Tu aplicación está en: https://atomfullstack.web.app" -ForegroundColor Cyan