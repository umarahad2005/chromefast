# ChromeFast installer (Windows PowerShell).
# Usage:
#   .\install\install.ps1 -Target claude
#   .\install\install.ps1 -Target codex  -Project C:\code\myapp   # appends to AGENTS.md
#   .\install\install.ps1 -Target cursor -Project C:\code\myapp
# Existing files are backed up to *.bak before being replaced.
param(
  [ValidateSet('claude','codex','agents','antigravity','windsurf','gemini','cursor')]
  [string]$Target = 'claude',
  [string]$Project = '.'
)
$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot

function Copy-WithBackup($Src, $Dst) {
  if (Test-Path $Dst) { Copy-Item $Dst "$Dst.bak" -Recurse -Force; Write-Host "backup: $Dst.bak" }
  New-Item -ItemType Directory -Force (Split-Path -Parent $Dst) | Out-Null
  Copy-Item $Src $Dst -Recurse -Force
  Write-Host "installed: $Dst"
}

switch ($Target) {
  'claude' {
    $ClaudeDir = if ($env:CLAUDE_CONFIG_DIR) { $env:CLAUDE_CONFIG_DIR } else { Join-Path $HOME '.claude' }
    Copy-WithBackup (Join-Path $Root 'skills\chromefast') (Join-Path $ClaudeDir 'skills\chromefast')
    Get-ChildItem (Join-Path $Root 'agents\*.md') | ForEach-Object { Copy-WithBackup $_.FullName (Join-Path $ClaudeDir "agents\$($_.Name)") }
    Get-ChildItem (Join-Path $Root 'commands\*.md') | ForEach-Object { Copy-WithBackup $_.FullName (Join-Path $ClaudeDir "commands\chromefast\$($_.Name)") }
    Write-Host 'Done. Restart Claude Code; try: /chromefast:read <url> <what>'
  }
  'cursor' {
    Copy-WithBackup (Join-Path $Root '.cursor\rules\chromefast.mdc') (Join-Path $Project '.cursor\rules\chromefast.mdc')
  }
  default {
    $Dst = Join-Path $Project 'AGENTS.md'
    if ((Test-Path $Dst) -and (Select-String -Path $Dst -Pattern 'ChromeFast rules' -Quiet)) { Write-Host "already present in $Dst"; break }
    if (Test-Path $Dst) { Copy-Item $Dst "$Dst.bak" -Force; Add-Content $Dst "`n`n" -Encoding utf8 }
    Get-Content (Join-Path $Root 'rules\chromefast-rules.md') -Encoding utf8 | Add-Content $Dst -Encoding utf8
    Write-Host "appended rules to $Dst"
  }
}
