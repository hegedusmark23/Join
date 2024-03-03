
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

/**
 * Changes the color of an icon on hover
*/
function changePencilImgColor() {                
  var image = document.getElementById("pencil-icon");
  var button = document.getElementById("pencil-button");
  button.addEventListener('mouseover', function () {
    image.src = "./assets/img/pencil-blue.png"
  })
  button.addEventListener('mouseout', function () {
    image.src = "./assets/img/pencil-white.png"
  })
}

function changeCheckImgColor() {         
  var image = document.getElementById("check-icon");
  var button = document.getElementById("check-button");
  button.addEventListener('mouseover', function () {
    image.src = "./assets/img/check-blue.png"
  })
  button.addEventListener('mouseout', function () {
    image.src = "./assets/img/check-white.png"
  })
}

/**
 * Opens the animated Menu.
 */
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

/**  
 * A messeage does appear after a succesfull registration.
 */
function signUpMessage() {    
  let message = document.getElementById('signup-message');
  setTimeout(function () {
    message.classList.remove('d-none');
    message.classList.add('d-flex');
  }, 500)
}
/**
 * Redirects to the Login page after registration.
 */
function redirectToLogin() {   
  setTimeout(function () {
    window.location.href = '/landingpage.html'
  }, 1500)
}

/**
 * Daytime dependent Welcome message.
 */
function timeDynamicWelcome() {      
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


/**
 * Reveals the password on the login page.
 */
function revealPassword() {         
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
  window.location.href = '/guest.index.html'
}

/**
 * Marks the severe buttons, dependent on wich site the user currently on.
 */
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

/**
 * These funktions handle the number of tasks displayed on the Summary page.
 */
function numberOfAllTasks() {
  let allTasks = document.getElementById('numberOfTasksInBoard');
  allTasks.innerHTML = tasks.length;
}


function sortTasksByStateToDo() {
  let toDo = document.getElementById('numberOfToDos');
  let result = tasks.filter((task) => task.state.includes("toDo")).length;
  toDo.innerHTML = result;
}

function sortTasksByStateInProgress() {
  let inProgress = document.getElementById('numberOfTasksInProgress');
  let result = tasks.filter((task) => task.state.includes("in-progress")).length;
  inProgress.innerHTML = result;
}

function sortTasksByStateDone() {
  let done = document.getElementById('numberOfDone');
  let result = tasks.filter((task) => task.state.includes("done")).length;
  done.innerHTML = result;
}

function sortTasksByStateAwaitingFeedback() {
  let awaitingFeedback = document.getElementById('awaitingFeedback');
  let result = tasks.filter((task) => task.state.includes("await-feedback")).length;
  awaitingFeedback.innerHTML = result;
}


function sortTasksByPrioUrgent() {
  let Urgent = document.getElementById('numberOfUrgent');
  let urgentDate = document.getElementById('urgentDate');
  let urgentTasks = tasks.filter((task) => task.prio === "urgent");
  let shortestDueDateTask = urgentTasks.reduce((minTask, currentTask) => {
    if (minTask.dueDate && currentTask.dueDate) {
      return minTask.dueDate < currentTask.dueDate ? minTask : currentTask;
    } else {
      return currentTask.dueDate ? currentTask : minTask;
    }
  }, urgentTasks[0]);
  Urgent.innerHTML = urgentTasks.length;
  urgentDate.innerHTML = shortestDueDateTask ? shortestDueDateTask.dueDate : "No urgent task.";
}

function hideWelcomeMessageMobile(){
  if (window.innerWidth < 800) {
    document.getElementById('welcome-section').classList.add("d-none")
}
}

  function mobileWelcomeAnimation(){
    if (window.innerWidth < 485) {
      document.getElementById('tasks-headline-container').classList.add("welcomMessageAnimationInvis");
      document.getElementById('navbar').classList.add("welcomMessageAnimationInvis");
      document.getElementById('header').classList.add("welcomMessageAnimationInvis");
      document.getElementById('welcome-section').classList.add("welcomMessageAnimation");
      document.getElementById('welcome-section').classList.add("d-none")
    }
  }
