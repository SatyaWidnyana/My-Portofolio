$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$stackRoot = Join-Path $projectRoot 'image portofolio/WGA DEKORASI/Stack'
$sharedAssets = @('FE/html5.svg', 'FE/css3.svg', 'FE/javascript.svg', 'Integrations/whatsapp.svg', 'Integrations/google-maps.svg', 'Integrations/google-fonts.png')
foreach ($file in $sharedAssets) {
  $destination = Join-Path $stackRoot $file
  New-Item -ItemType Directory -Path (Split-Path -Parent $destination) -Force | Out-Null
  Copy-Item -LiteralPath (Join-Path $projectRoot "image portofolio/BALI ADVENTURE/Stack/$file") -Destination $destination
}
$assets = @(
  @{ File = 'BE/nodejs.svg'; Url = 'https://nodejs.org/static/logos/jsIconGreen.svg' }
  @{ File = 'BE/supabase.svg'; Url = 'https://raw.githubusercontent.com/supabase/supabase/master/apps/studio/public/supabase-logo.svg' }
  @{ File = 'BE/vercel.svg'; Url = 'https://vercel.com/vc-ap-b3331f/_next/static/immutable/media/logo-vercel-light.1xgi91gcqswpt.svg' }
  @{ File = 'Tools/sharp.svg'; Url = 'https://sharp.pixelplumbing.com/sharp-logo.svg' }
  @{ File = 'Tools/pglite.svg'; Url = 'https://pglite.dev/img/brand/icon-light.svg' }
)
foreach ($asset in $assets) {
  $destination = Join-Path $stackRoot $asset.File
  New-Item -ItemType Directory -Path (Split-Path -Parent $destination) -Force | Out-Null
  curl.exe -f -s -S -L --max-time 30 $asset.Url -o $destination
  if ($LASTEXITCODE -ne 0) { throw "Download failed: $($asset.File)" }
  [xml]$svg = Get-Content -LiteralPath $destination -Raw
  if ($svg.DocumentElement.LocalName -ne 'svg' -or $svg.SelectNodes('//*[local-name()="script" or local-name()="foreignObject"]').Count -gt 0) {
    throw "Invalid SVG: $($asset.File)"
  }
  Write-Output "$($asset.File): OK"
}
$zipPath = Join-Path $env:TEMP 'wga-cloudflare-logos.zip'
curl.exe -f -s -S -L --max-time 30 'https://cf-assets.www.cloudflare.com/dzlvafdwdttg/2Twekn3xyYyd94qDYAl0ed/9ab649caa40958f195166e0d9f5d9a04/Logos.zip?download=true' -o $zipPath
if ($LASTEXITCODE -ne 0) { throw 'Cloudflare logo download failed' }
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [IO.Compression.ZipFile]::OpenRead($zipPath)
try {
  $entry = $zip.GetEntry('CF-Logo 1.png')
  if (-not $entry) { throw 'Cloudflare logo missing from official kit' }
  $destination = Join-Path $stackRoot 'Integrations/cloudflare.png'
  New-Item -ItemType Directory -Path (Split-Path -Parent $destination) -Force | Out-Null
  [IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $destination, $true)
  Write-Output 'Integrations/cloudflare.png: OK'
} finally {
  $zip.Dispose()
}
