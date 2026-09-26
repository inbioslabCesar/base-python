[CmdletBinding(SupportsShouldProcess = $true)]
param(
    [Parameter(Mandatory = $true)]
    [string]$ProjectName,

    [Parameter(Mandatory = $false)]
    [string]$TemplateRepoUrl = "https://github.com/inbioslabCesar/base-python.git",

    [Parameter(Mandatory = $false)]
    [string]$DestinationRoot = ".",

    [Parameter(Mandatory = $false)]
    [string]$NewRepoUrl,

    [Parameter(Mandatory = $false)]
    [switch]$PushToNewRemote
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Assert-Command {
    param([string]$Name)
    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        throw "Required command not found: $Name"
    }
}

Assert-Command -Name "git"

$destinationRootResolved = Resolve-Path -Path $DestinationRoot
$targetPath = Join-Path -Path $destinationRootResolved.Path -ChildPath $ProjectName

if (Test-Path -Path $targetPath) {
    throw "Target directory already exists: $targetPath"
}

if ($PSCmdlet.ShouldProcess($targetPath, "Clone template repository")) {
    Write-Host "Cloning template into $targetPath..."
    git clone $TemplateRepoUrl $ProjectName | Out-Host
}

if (-not (Test-Path -Path $targetPath)) {
    Write-Host "Target directory was not created (likely due to -WhatIf)."
    return
}

Push-Location $targetPath
try {
    if ($NewRepoUrl) {
        if ($PSCmdlet.ShouldProcess($targetPath, "Set origin to new repository")) {
            Write-Host "Setting origin to $NewRepoUrl..."
            git remote set-url origin $NewRepoUrl | Out-Host
        }

        if ($PushToNewRemote) {
            if ($PSCmdlet.ShouldProcess($NewRepoUrl, "Push main branch")) {
                Write-Host "Pushing main branch to new remote..."
                git push -u origin main | Out-Host
            }
        }
    }
}
finally {
    Pop-Location
}

Write-Host "Done."
Write-Host "Project path: $targetPath"

if (-not $NewRepoUrl) {
    Write-Host "Next step: configure new origin when ready:"
    Write-Host "  git -C `"$targetPath`" remote set-url origin <new-repo-url>"
}

if ($NewRepoUrl -and -not $PushToNewRemote) {
    Write-Host "Next step: push when ready:"
    Write-Host "  git -C `"$targetPath`" push -u origin main"
}
