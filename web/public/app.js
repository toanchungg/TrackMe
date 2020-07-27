$('#navbar').load('navbar.html');
$("#footer").load("footer.html"); 

const devices = JSON.parse(localStorage.getItem('devices')) || [];
const users = JSON.parse(localStorage.getItem('users')) || [];

devices.forEach(function(device) { $('#devices tbody').append(`
<tr> 
<td>${device.user}</td> 
<td>${device.name}</td>
</tr>`
); });

users.forEach(function(user) { 
    $('#users tbody').append(`
<tr> 
    <td>${user.user1}</td> 
    <td>${user.password}</td>
</tr>`
); });

$('#add-device').on('click', function() { 
    const user = $('#user').val();
    const name = $('#name').val(); 
    devices.push({ user, name });
    console.log(devices);
    localStorage.setItem('devices', JSON.stringify(devices));
    location.href = '/';

$('#send-command').on('click', function() { 
    const command = $('#command').val(); 
    console.log(`command is: ${command}`);
});

$('#register').on('click', function() {
    const user1 = $('#loginName').val();
    const password = $('#loginPassword').val();
    const confirm = $('#confirmpassword').val();

    const exists = users.find ((user) => {
        return user.user1 === user1;
    });

    if(exists){
        alert("This user's name has been registered");
    }
    else{
        users.push({ user1, password });
        localStorage.setItem('users', JSON.stringify(users));
        location.href = '/user-list';
    }
});

});