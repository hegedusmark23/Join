
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


document.addEventListener("DOMContentLoaded", function() {
  playAnimations();
});

document.addEventListener("DOMContentLoaded", function() {
  playAnimations();
});

function playAnimations() {
  const elements = document.querySelectorAll('.tasks-headline-container, .navbar, .header, .welcome-section');
  
  elements.forEach(element => {
      element.style.animation = getAnimationStyle(element);
      element.classList.add('animated'); // Assuming 'animated' class triggers the animations in your CSS
  });

  // Optional: Remove event listener after animations played once
  document.removeEventListener("DOMContentLoaded", playAnimations);
}

function getAnimationStyle(element) {
  switch (element.className) {
      case 'tasks-headline-container':
      case 'navbar':
      case 'header':
          return 'invisVisMobile 1s linear';
      case 'welcome-section':
          return 'welcomeMessageMobile 0.9s linear';
      default:
          return '';
  }
}

  // Optional: Remove event listener after animations played once
  
