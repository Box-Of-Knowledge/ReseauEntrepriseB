$ADUsers = Import-csv C:\Users\Administrator\Desktop\usersBox.csv

foreach ($User in $ADUsers)
{
    $firstname = $User.Firstname
    $lastname = $User.Lastname
    $username = $User.username
    $upn = $User.username + "@boxofknowledge.ephec-ti.be"
    $dptmt = $User.department
    $pwd = $User.password

    New-ADUser -Path 'OU=utilisateurs,DC=boxofknowledgeFR,DC=boxofknowledgeCA,DC=be' -SamAccountName $username -UserPrincipalName $upn -Name "$firstname $lastname" -Givenname $firstname -Surname $lastname -Department $dptmt -ChangePasswordAtLogon $true -AccountPassword (ConvertTo-SecureString $pwd -AsPlainText -force)  -Enabled $true -Type user
    Add-ADGroupMember -Identity $dptmt -Members $username
}