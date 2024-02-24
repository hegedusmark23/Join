
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

function numberOfAllTasks() {
  let allTasks = document.getElementById('numberOfTasksInBoard');
  allTasks.innerHTML = tasks.length;
}


function sortTasksByStateToDo() {
  let toDo = document.getElementById('numberOfToDos');
  var result = tasks.filter((task) => task.state.includes("toDo")).length;
  toDo.innerHTML = result;
}

function sortTasksByStateInProgress() {
  let inProgress = document.getElementById('numberOfTasksInProgress');
  var result = tasks.filter((task) => task.state.includes("in-progress")).length;
  inProgress.innerHTML = result;
}

function sortTasksByStateDone() {
  let done = document.getElementById('numberOfDone');
  var result = tasks.filter((task) => task.state.includes("done")).length;
  done.innerHTML = result;
}

function sortTasksByStateAwaitingFeedback() {
  let awaitingFeedback = document.getElementById('awaitingFeedback');
  var result = tasks.filter((task) => task.state.includes("await-feedback")).length;
  awaitingFeedback.innerHTML = result;
}

function sortTasksByPrioUrgent() {
  let urgent = document.getElementById('numberOfUrgent');
  urgentDate = document.getElementById('urgentDate');
  var result = tasks.filter((task) => task.prio.includes("urgent")).length;
  urgent.innerHTML = result;
}