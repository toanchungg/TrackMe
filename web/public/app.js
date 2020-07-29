$('#navbar').load('navbar.html');
$("#footer").load("footer.html"); 

const response = $.get('http://localhost:3001/devices') .then(response => {
    response.forEach(device => { $('#devices tbody').append(`
    <tr> <td>${device.user}</td> <td>${device.name}</td>
    </tr>`
    ); });
    })
    .catch(error => {
    console.error(`Error: ${error}`); });

const users = JSON.parse(localStorage.getItem('users')) || [];
users.forEach(function(user) { 
    $('#users tbody').append(`
<tr> 
    <td>${user.user1}</td>
    <td>${user.password}</td>
</tr>`
); });

$('#add-device').on('click', () => { const name = $('#name').val(); const user = $('#user').val(); const sensorData = [];
  const body = {
    name,
user,
    sensorData
  };
$.post('http://localhost:3001/devices', body) .then(response => {
location.href = '/'; })
.catch(error => { console.error(`Error: ${error}`);
}); });

$('#send-command').on('click', function() { 
    const command = $('#command').val(); 
    console.log(`command is: ${command}`);
});

$('#register').on('click', function() {
    const user1 = $('#LoginName').val();
    const password = $('#LoginPassword').val();
    const confirmpassword = $('#confirmpassword').val();

    const exists = users.find((user) => {
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

$('#login').on('click', function() { 
    const user2  = $('#user2').val();
    const password2 = $('#password2').val();
    const existed = users.find(user => {
        if( user.user1 === user2 && user.password === password2) {
            return true;
        } else {
            return false;
        }
    });
        if(existed) {
            localStorage.setItem( 'IsAuthenticated', true );
            location.href = "/";
        } else {
            alert("Wrong password and username");
        }
});



const logout = () => { 
    localStorage.removeItem('isAuthenticated'); 
    location.href = '/login';
}