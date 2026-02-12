<#
Start-dev.ps1
Convenience script to install dependencies (if needed) and start the Vite dev server.
It calls `npm.cmd` to avoid PowerShell's `npm.ps1` shim which can be blocked by execution policy.

Usage:
 - Right-click and "Run with PowerShell" (may still be blocked by policy), or
 - Open PowerShell in this folder and run: `.\start-dev.ps1` (if allowed), or
 - Use the `start-dev.bat` created alongside this script which works with a double-click.
#>

$ErrorActionPreference = 'Stop'

Push-Location -LiteralPath (Split-Path -Parent $MyInvocation.MyCommand.Definition)

if (-not (Test-Path node_modules)) {
    Write-Host "Installing dependencies..."
    & npm.cmd install
}

Write-Host "Starting Vite dev server... (Ctrl+C to stop)"
& npm.cmd run dev

Pop-Location
