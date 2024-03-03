/**
 * @global
 * @desc Array, das alle Benutzerobjekte speichert. Jedes Benutzerobjekt enthält Name, E-Mail und Passwort.
 * @type {Array<Object>}
 */
let users = [];

/**
 * @global
 * @desc Speichert Informationen zum derzeit eingeloggten Benutzer.
 * @type {Array}
 */
let currentUser = [];

/**
 * @global
 * @desc Wird verwendet, um auf das Namenseingabefeld des Registrierungsformulars zu verweisen.
 * @type {HTMLInputElement}
 */
let Name = [];

/**
 * Lädt die Benutzerliste aus dem Speicher und aktualisiert die globale Variable `users`.
 * 
 * Diese asynchrone Funktion versucht, eine gespeicherte Liste von Benutzern zu laden, indem sie
 * auf einen Speichermechanismus zugreift. Die geladenen
 * Daten werden dann verwendet, um die globale Variable `users` zu aktualisieren. Im Falle eines
 * Fehlers beim Laden der Daten wird eine Fehlermeldung in der Konsole ausgegeben.
 * 
 * @async
 * @function loadUsers
 * @returns {Promise<void>} Eine Promise, die erfüllt wird, wenn die Benutzer geladen und die
 * globale Variable `users` aktualisiert wurde. Gibt nichts zurück, aber fängt mögliche Fehler ab
 * und zeigt diese in der Konsole an.
 */
async function loadUsers() {
  try {
    users = JSON.parse(await getItem('users'));
  } catch (e) {
    console.error('Loading error:', e);
  }
}

/**
 * Führt die Benutzerregistrierung durch das Erfassen der Formulardaten und das Speichern der Benutzerdaten aus.
 * Nach erfolgreicher Registrierung werden das Formular zurückgesetzt und der Benutzer zur Anmeldeseite weitergeleitet.
 * 
 * @async
 * @function register
 * @description Registriert einen neuen Benutzer mit den eingegebenen Daten aus dem Registrierungsformular.
 * Deaktiviert den Registrierungsbutton während des Registrierungsvorgangs, um Mehrfachregistrierungen zu vermeiden.
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
 * Setzt das Registrierungsformular nach der Registrierung zurück.
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
 * Überprüft, ob die Passwörter bei der Registrierung übereinstimmen.
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
 * Führt den Login-Prozess durch.
 */
async function login() {
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let user = users.find(u => u.email == email.value && u.password == password.value);
  if (user) {
    await setItem('user', JSON.stringify(user));
    window.location.href = '/index.html';
  } else {
    loginError();
  }
}

/**
 * Leert die Arrays, die den aktuellen Benutzer betreffen, und leitet zur Login-Seite um.
 */
function logOut() {  
  Name = [];
  currentUser = [];
  deleteUser();
  window.location.href = '/landingpage.html';
}

/**
 * Legt den aktuellen Benutzer nach dem Login fest.
 */
async function setCurrentUser() {   
  const userData = await getItem('user');
  let message = document.getElementById('welcome-message');
  try {
    const jsonUserData = JSON.parse(userData);
    currentUser.push(jsonUserData);
    message.innerHTML = currentUser[0]['name'];
    capitalisedName();
  } catch (error) {
    console.error("Es ist ein fehler aufgetreten.", error);
  }
}

/**
 * Legt den Namen des aktuellen Benutzers fest.
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
 * Filtert den Namen des Benutzers heraus.
 */
function getNamefromArray() {
  let message = document.getElementById('welcome-message');
  message.innerHTML = currentUser[0]['name'];
}

/**
 * Setzt den ersten Buchstaben des angemeldeten Benutzers groß und zeigt sie auf dem Benutzer-Button an.
 */
function capitalisedName() {    
  let capitalisedName = document.getElementById('user-name-capitalized');
  Name.push(currentUser[0]['name']);
  parts = Name[0].split(" ");
  neededStr = parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
  capitalisedName.innerHTML = neededStr
}

/**
 * Zeigt eine Fehlermeldung an, falls Benutzername oder Passwort falsch sind.
 */
function loginError() {       
  let message = document.getElementById('login-error-message');
  message.classList.remove('d-none');
  message.classList.add('d-flex');

}

/**
 * Funktion hinter der Checkbox "Angemeldet bleiben".
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