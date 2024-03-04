/**
 * @global
 * @desc Array that stores all user objects. Each user object contains name, email and password.
 * @type {Array<Object>}
 */
let users = [];

/**
 * @global
 * @desc Stores information about the currently logged in user.
 * @type {Array}
 */
let currentUser = [];

/**
 * @global
 * @desc Used to reference the name input field of the registration form.
 * @type {HTMLInputElement}
 */
let Name = [];

/**
 * Loads the user list from memory and updates the global variable `users`.
 *
 * This asynchronous function attempts to load a saved list of users by
 * accesses a storage mechanism. The invited ones
 * Data is then used to update the global variable `users`. in case of a
 * If there is an error loading the data, an error message is displayed in the console.
 * 
 * @async
 * @function loadUsers
 * @returns {Promise<void>} A promise that will be fulfilled when the users load and the
 * global variable `users` has been updated. Returns nothing, but catches possible errors
 * and displays this in the console.
 */
async function loadUsers() {
  try {
    users = JSON.parse(await getItem('users'));
  } catch (e) {
    console.error('Loading error:', e);
  }
}

/**
 * Performs user registration by collecting the form data and saving the user data.
 * After successful registration, the form will be reset and the user will be redirected to the login page.
 * 
 * @async
 * @function register
 * @description Registers a new user with the data entered from the registration form.
 * Disables the registration button during the registration process to avoid multiple registrations.
 */
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

/**
 * Resets the registration form after registration.
 */
function resetForm() {     
  let Name = document.getElementById('name');
  Name.value = '';
  email.value = '';
  password.value = '';
  confirm_password.value = '';
  register_button.disabled = false;
}

/**
 * Checks whether the passwords match during registration.
 */
function match() {      
  var password = document.getElementById("password")
    , confirm_password = document.getElementById("confirm_password");
  function validatePassword() {
    if (password.value != confirm_password.value) {
      confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
      confirm_password.setCustomValidity('');
    }
  }
  password.onchange = validatePassword;
  confirm_password.onkeyup = validatePassword;
}

/**
 * Performs the login process.
 */
async function login() {
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let user = users.find(u => u.email == email.value && u.password == password.value);
  if (user) {
    await setItem('user', JSON.stringify(user));
    window.location.href = '/summary.html';
  } else {
    loginError();
  }
}

/**
 * Empties the arrays related to the current user and redirects to the login page
 */
function logOut() {  
  Name = [];
  currentUser = [];
  window.location.href = '/index.html';
}

/**
 * Sets the current user after login.
 */
async function setCurrentUser() {   
  const userData = await getItem('user');
  let message = document.getElementById('welcome-message');
  try {
    const jsonUserData = JSON.parse(userData);
    currentUser.push(jsonUserData);
    message.innerHTML = currentUser[0]['name'];
    capitalisedName();
    console.log(getItem('user'));
  } catch (error) {
    console.error("Es ist ein fehler aufgetreten.", error);
  }
}

/**
 * Sets the name of the current user.
 */
async function setCurrentUserName() { 
  const userData = await getItem('user');
  try {
    const jsonUserData = JSON.parse(userData);
    currentUser.push(jsonUserData);
    capitalisedName();
  } catch (error) {
    console.error("Es ist ein fehler aufgetreten.", error);
  }
}

/**
 * Filters out the user's name.
 */
function getNamefromArray() {
  let message = document.getElementById('welcome-message');
  message.innerHTML = currentUser[0]['name'];
}

/**
 * Capitalizes the first letter of the logged in user and displays it on the user button.
 */
function capitalisedName() {    
  let capitalisedName = document.getElementById('user-name-capitalized');
  Name.push(currentUser[0]['name']);
  parts = Name[0].split(" ");
  neededStr = parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
  capitalisedName.innerHTML = neededStr
}

/**
 * Displays an error message if username or password is incorrect.
 */
function loginError() {       
  let message = document.getElementById('login-error-message');
  message.classList.remove('d-none');
  message.classList.add('d-flex');

}

/**
 * Function behind the “Stay logged in” checkbox.
 */
function rememberMe() {   
  var rememberMeCheckbox = document.getElementById('remember');
  var usernameInput = document.getElementById('email');
  var passwordInput = document.getElementById('password');
  if (localStorage.chkbx && localStorage.chkbx !== '') {
    rememberMeCheckbox.checked = true;
    usernameInput.value = localStorage.usrname;
    passwordInput.value = localStorage.pass;
  } else {
    rememberMeCheckbox.checked = false;
    usernameInput.value = '';
    passwordInput.value = '';
  }
  rememberMeCheckbox.addEventListener('click', function () {
    if (rememberMeCheckbox.checked) {
      localStorage.usrname = usernameInput.value;
      localStorage.pass = passwordInput.value;
      localStorage.chkbx = rememberMeCheckbox.checked;
    } else {
      localStorage.usrname = '';
      localStorage.pass = '';
      localStorage.chkbx = '';
    }
  });
};