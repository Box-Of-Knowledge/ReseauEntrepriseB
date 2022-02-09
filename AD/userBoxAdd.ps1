$users = @("Toto Pierre", "Tata Pierre", "Test Pierre")

$pwd = "xxxxx"

$path = "OU=Users, OU=Company, DC=boxofknowledgeFR, DC=local"

foreach($user in $users){
    New-ADUser -Name $user -Path $path -AccountPassword (ConvertTo-SecureString $pwd -AsPlainText -force) -Enabled $true
}

Add-ADGroupMember -Identity "IT" -Members $users
