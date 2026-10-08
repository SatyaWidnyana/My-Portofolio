$ErrorActionPreference = 'Stop'
$stackProjectRoot = Split-Path -Parent $PSScriptRoot
$stackRoot = Join-Path $stackProjectRoot 'image portofolio\BALI ADVENTURE\Stack'

$stackDownloads = @(
    @{ File = 'FE\html5.svg'; Url = 'https://www.w3.org/html/logo/downloads/HTML5_Badge.svg' },
    @{ File = 'FE\css3.svg'; Url = 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg' },
    @{ File = 'FE\javascript.svg'; Url = 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg' },
    @{ File = 'Integrations\whatsapp.svg'; Url = 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' },
    @{ File = 'Integrations\google-maps.svg'; Url = 'https://www.gstatic.com/images/branding/productlogos/maps_2025/v1/192px.svg' },
    @{ File = 'Integrations\google-fonts.png'; Url = 'https://www.gstatic.com/images/branding/product/2x/google_fonts_96dp.png' },
    @{ File = 'Integrations\font-awesome.svg'; Url = 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/7.x/svgs/brands/font-awesome.svg' }
)

foreach ($asset in $stackDownloads) {
    $destination = Join-Path $stackRoot $asset.File
    New-Item -ItemType Directory -Path (Split-Path -Parent $destination) -Force | Out-Null
    & curl.exe -f -s -S -L --max-time 30 $asset.Url -o $destination
    if ($LASTEXITCODE -ne 0) { throw "Could not download $($asset.File)" }
    Write-Output "Downloaded $($asset.File)"
}

Add-Type -AssemblyName System.IO.Compression.FileSystem
$archivePath = Join-Path $stackProjectRoot 'tmp\stack-assets\firebase-brand-assets.zip'
if (!(Test-Path -LiteralPath $archivePath)) {
    New-Item -ItemType Directory -Path (Split-Path -Parent $archivePath) -Force | Out-Null
    & curl.exe -f -s -S -L --max-time 45 'https://firebase.google.com/static/downloads/brand-guidelines/firebase-brand-assets.zip' -o $archivePath
    if ($LASTEXITCODE -ne 0) { throw 'Could not download Firebase brand assets' }
}

$firebaseAssets = @(
    @{ Name = 'Product_Logomark_Cloud_Firestore_Full_Color.svg'; File = 'BE\cloud-firestore.svg' },
    @{ Name = 'Product_Logomark_Authentication_Full_Color.svg'; File = 'BE\firebase-authentication.svg' },
    @{ Name = 'Logomark_Full Color.svg'; File = 'BE\firebase.svg' }
)
$archive = [IO.Compression.ZipFile]::OpenRead($archivePath)
try {
    foreach ($asset in $firebaseAssets) {
        $entry = $archive.Entries | Where-Object { $_.Name -eq $asset.Name } | Select-Object -First 1
        if (!$entry) { throw "Missing Firebase asset $($asset.Name)" }
        $destination = Join-Path $stackRoot $asset.File
        New-Item -ItemType Directory -Path (Split-Path -Parent $destination) -Force | Out-Null
        [IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $destination, $true)
        Write-Output "Extracted $($asset.File)"
    }
} finally {
    $archive.Dispose()
}

Get-ChildItem -LiteralPath $stackRoot -Recurse -Filter '*.svg' | ForEach-Object {
    [xml]$svgDocument = Get-Content -LiteralPath $_.FullName -Raw
    if ($svgDocument.DocumentElement.LocalName -ne 'svg') { throw "Invalid SVG: $($_.Name)" }
    if ($svgDocument.SelectNodes('//*[local-name()="script" or local-name()="foreignObject"]').Count) {
        throw "Unexpected active content: $($_.Name)"
    }
}
