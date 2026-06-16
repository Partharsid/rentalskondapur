Add-Type -AssemblyName System.Runtime.WindowsRuntime
$v = New-Object Windows.Security.Credentials.PasswordVault
try {
  $creds = $v.RetrieveAll()
  foreach ($c in $creds) {
    if ($c.Resource -like "*supabase*") {
      $c.RetrievePassword()
      Write-Host "TOKEN:$($c.Password)"
    }
  }
} catch {
  Write-Host "Error: $($_.Exception.Message)"
}