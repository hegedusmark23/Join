let users = [];

async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}


async function register() {
    let Name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let register_button = document.getElementById('register_button');

    register_button.disabled = true;
    users.push({
        name: Name.value,
        email: email.value,
        password: password.value,
    });
    await setItem('users', JSON.stringify(users));
    resetForm();
    signUpMessage();
    redirectToLogin();
}


function resetForm() {     // Resets the form after registration.
    let Name = document.getElementById('name');
    Name.value = '';
    email.value = '';
    password.value = '';
    confirm_password.value = '';
    register_button.disabled = false;
}


function match(){      // Checks if the passwords are matching at the registration.
var password = document.getElementById("password")
  , confirm_password = document.getElementById("confirm_password");

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}
password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;
}


function login(){
  let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find( u => u.email == email.value && u.password == password.value);
    console.log(user)
    if(user) {
      window.location.href = '/index.html'
    } else {
      loginError();
    }
}

function loginError(){
  let message = document.getElementById('login-error-message');
  message.classList.remove('d-none');
  message.classList.add('d-flex');

}
