@echo off
REM start-dev.bat — install deps if needed and start the Vite dev server
cd /d "%~dp0"
IF NOT EXIST node_modules (
  echo Installing dependencies...
  npm install
)

echo Starting Vite dev server... (Ctrl+C to stop)
npm run dev
