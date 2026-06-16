Install-Module -Name CredentialManager -Force -Scope CurrentUser -AllowClobber -ErrorAction SilentlyContinue
$module = Get-Module -ListAvailable -Name CredentialManager
if ($module) {
  Import-Module CredentialManager
  $cred = Get-StoredCredential -Target "Supabase CLI:supabase"
  if ($cred) {
    Write-Host "TOKEN:$($cred.Password)"
  } else {
    Write-Host "NOT_FOUND"
  }
} else {
  Write-Host "MODULE_FAILED"
}