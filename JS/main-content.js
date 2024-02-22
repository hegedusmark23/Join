
function generateLegalNoticeContent() {
  let container = document.querySelector('section');
  container.innerHTML = legalNoticeHTML();
}

function generatePrivacyPolicyContent() {
  let container = document.querySelector('section');
  container.innerHTML = privacyPolicyHTML();
}

function generateHelpContent() {
  let container = document.querySelector('section');
  container.innerHTML = helpHTML();
}


function changePencilImgColor() {                //Changes the color of an icon on hover
  var image = document.getElementById("pencil-icon");
  var button = document.getElementById("pencil-button");
  button.addEventListener('mouseover', function () {
    image.src = "./assets/img/pencil-blue.png"
  })
  button.addEventListener('mouseout', function () {
    image.src = "./assets/img/pencil-white.png"
  })
}

function changeCheckImgColor() {         //Changes the color of an icon on hover
  var image = document.getElementById("check-icon");
  var button = document.getElementById("check-button");
  button.addEventListener('mouseover', function () {
    image.src = "./assets/img/check-blue.png"
  })
  button.addEventListener('mouseout', function () {
    image.src = "./assets/img/check-white.png"
  })
}


function showMenu() {
  var x = document.getElementById("popup-menu");
  var computedStyle = window.getComputedStyle(x);
  if (computedStyle.display === "none" || x.style.display === "none") {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }
}

function closeMenu() {
  let menu = document.getElementById('popup-menu');
  menu.style.display = "none";
}

function signUpMessage() {    // A messeage does appear after a succesfull registration.
  let message = document.getElementById('signup-message');
  setTimeout(function () {
    message.classList.remove('d-none');
    message.classList.add('d-flex');
  }, 500)
}

function redirectToLogin() {   // Redirects to the Login page after registration.
  setTimeout(function () {
    window.location.href = '/landingpage.html'
  }, 1500)
}


function timeDynamicWelcome() {      //Daytime dependant Welcome message.
  let welcome = document.getElementById('daytime')
  let date = new Date();
  let hour = date.getHours();
  if (hour < 12) {
    welcome.innerHTML = 'Good Morning,';
  } else if (hour < 17) {
    welcome.innerHTML = 'Good Afternoon,';
  } else {
    welcome.innerHTML = 'Good Evening,';
  }
}



function revealPassword() {         //Reveals the password on the login page.
  var x = document.getElementById("password");
  if (x.type === "password" && x.value.length > 2) {
    x.style.background = "url(/assets/img/visibility.png)";
    x.type = "text";
  } else {
    x.style.background = "url(/assets/img/lock-icon.png)";
    x.type = "password";
  }
  x.style.backgroundRepeat = "no-repeat";
  x.style.backgroundPosition = "center";
  x.style.backgroundPositionX = "calc(100% - 12px)";
}


function guestLogin() {
  // window.location.href = '/guest.index.html'
  window.location.href = '/guest.index.html'
}


function startAnimations() {
  // Get elements by class name and add animation class
  var elements = document.getElementsByClassName('tasks-headline-container');
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.add('invisVisMobile');
  }

  elements = document.getElementsByClassName('navbar');
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.add('invisVisMobile');
  }

  elements = document.getElementsByClassName('header');
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.add('invisVisMobile');
  }

  // Add animation class to welcome-section
  document.querySelector('.welcome-section').classList.add('welcomeMessageMobile');
}

function buttonFocus() {
  let summaryNav = document.getElementById("summary-nav");
  let addTaskNav = document.getElementById("addTask-nav");
  let boardNav = document.getElementById("board-nav");
  let contactsNav = document.getElementById("contacts-nav");
  setTimeout(buttonFocus, 100);
  if (window.location.href === "http://127.0.0.1:5500/index.html" && summaryNav) {
    summaryNav.style.backgroundColor = "#091931";
  } if (window.location.href === "http://127.0.0.1:5500/addtask.html" && addTaskNav) {
    addTaskNav.style.backgroundColor = "#091931";
  } if (window.location.href === "http://127.0.0.1:5500/board.html" && boardNav) {
    boardNav.style.backgroundColor = "#091931";
  } if (window.location.href === "http://127.0.0.1:5500/addcontacts.html" && contactsNav) {
    contactsNav.style.backgroundColor = "#091931";
  }
}