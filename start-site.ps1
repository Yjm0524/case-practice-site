$ErrorActionPreference = "Stop"

$siteRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$python = "C:\Users\yijin\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
$port = 8766

Set-Location $siteRoot
Write-Host "Starting 执医病例分析刷题台 at http://127.0.0.1:$port/index.html"
& $python -m http.server $port --bind 127.0.0.1
