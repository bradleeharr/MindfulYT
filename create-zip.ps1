$zipFile = "myt_firefox.zip"
$files = @(
    "./src",
    "./icons",
    "manifest.json",
    "package-lock.json",
    "package.json",
    "README.md"
)

7z a $zipFile $files