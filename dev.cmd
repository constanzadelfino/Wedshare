@echo off
rem Levanta todo Wedshare para probar en el celular: la API, la app (Expo) y la web del invitado.
rem Uso: doble clic en este archivo, o escribir "dev" en una terminal abierta en esta carpeta.

cd /d "%~dp0"

rem 1. Busca la IP de esta computadora en el Wi-Fi y la pone en mobile/.env,
rem    así el celular encuentra la API y los links de invitación funcionan aunque cambie la red.
powershell -NoProfile -Command ^
  "$ip = (Get-NetIPConfiguration | Where-Object { $_.IPv4DefaultGateway -and $_.NetAdapter.Status -eq 'Up' } | Select-Object -First 1).IPv4Address.IPAddress;" ^
  "if (-not $ip) { Write-Host 'No se encontro la IP del Wi-Fi. Revisa que estes conectada.'; exit 1 }" ^
  "$file = Join-Path (Get-Location) 'mobile\.env';" ^
  "$lines = [IO.File]::ReadAllLines($file) | Where-Object { $_ -notmatch '^EXPO_PUBLIC_(API|INVITE)_URL=' };" ^
  "$lines += 'EXPO_PUBLIC_API_URL=http://' + $ip + ':3000';" ^
  "$lines += 'EXPO_PUBLIC_INVITE_URL=http://' + $ip + ':5173/invitacion';" ^
  "[IO.File]::WriteAllLines($file, $lines, (New-Object Text.UTF8Encoding $false));" ^
  "Write-Host ('API en http://' + $ip + ':3000')"
if errorlevel 1 (
  pause
  exit /b 1
)

rem 2. Abre una ventana para la API, otra para la app y otra para la web del invitado.
start "Wedshare API" cmd /k "cd /d ""%~dp0api"" && npm run dev"
start "Wedshare App" cmd /k "cd /d ""%~dp0mobile"" && npx.cmd expo start --clear"
start "Wedshare Web" cmd /k "cd /d ""%~dp0web"" && npm run dev"

echo Listo: se abrieron las ventanas "Wedshare API", "Wedshare App" y "Wedshare Web".
echo Escanea el QR de la ventana de la app con Expo Go.
