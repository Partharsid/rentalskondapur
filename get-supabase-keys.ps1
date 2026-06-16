Add-Type -AssemblyName 'System.Runtime.WindowsRuntime'
$v = New-Object 'Windows.Security.Credentials.PasswordVault'

try {
  $cred = $v.Retrieve('Supabase CLI', 'supabase')
  $cred.RetrievePassword()
  $token = $cred.Password
  Write-Host "Token found: $($token.Substring(0, [Math]::Min(20, $token.Length)))..."

  # Use the token to call Management API
  $url = "https://api.supabase.com/v1/projects/pxxbljoglftcsxllixgd/api-keys"
  $headers = @{ Authorization = "Bearer $token" }
  
  try {
    $response = Invoke-RestMethod -Uri $url -Headers $headers -Method Get
    $response | ConvertTo-Json | Write-Host
  } catch {
    Write-Host "API call failed: $($_.Exception.Message)"
  }
} catch {
  Write-Host "No Supabase credential found."
}