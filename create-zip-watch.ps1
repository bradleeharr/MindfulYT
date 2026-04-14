<# Reference https://stackoverflow.com/questions/29066742/watch-file-for-changes-and-run-command-with-powershell #>
Function Register-Watcher {
    param (
        $folder,
        $changeAction
    )
    $filter = "*.*" #all files
    $watcher = New-Object IO.FileSystemWatcher $folder, $filter -Property @{ 
        IncludeSubdirectories = $true
        EnableRaisingEvents = $true
    }
    echo "Change action $changeAction"
    
    Register-ObjectEvent $Watcher -EventName "Created" -Action $changeAction
    Register-ObjectEvent $Watcher -EventName "Deleted" -Action $changeAction
    Register-ObjectEvent $Watcher -EventName "Renamed" -Action $changeAction
    Register-ObjectEvent $Watcher -EventName "Changed" -Action $changeAction

}

$watchDir = "$PSScriptRoot\\src"
$action = ".\$PSScriptRoot\\create-zip.ps1"
$changeAction = [scriptblock]::Create('
    $path = $Event.SourceEventArgs.FullPath
    $name = $Event.SourceEventArgs.Name
    $changeType = $Event.SourceEventArgs.ChangeType
    $timeStamp = $Event.TimeGenerated
    Write-Host The file $name was $changeType at $timeStamp
    & .\create-zip.ps1
')

#while ($true) {
    echo "Watching $watchDir..."
    $watcher = Register-Watcher $watchDir $changeAction
#}
 