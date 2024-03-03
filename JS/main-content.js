/**
 * Generiert den Inhalt für den rechtlichen Hinweis.
 */
function generateLegalNoticeContent() {
  let container = document.querySelector('section');
  container.innerHTML = legalNoticeHTML();
}

/**
 * Generiert den Inhalt für die Datenschutzrichtlinie.
 */
function generatePrivacyPolicyContent() {
  let container = document.querySelector('section');
  container.innerHTML = privacyPolicyHTML();
}

/**
 * Generiert den Inhalt für die Hilfeseite.
 */
function generateHelpContent() {
  let container = document.querySelector('section');
  container.innerHTML = helpHTML();
}

/**
 * Ändert die Farbe eines Icons beim Überfahren mit der Maus.
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

/**
 * Ändert die Farbe eines Icons beim Überfahren mit der Maus.
 */
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
 * Öffnet das animierte Menü.
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

/**
 * Schließt das Menü.
 */
function closeMenu() {
  let menu = document.getElementById('popup-menu');
  menu.style.display = "none";
}

/**
 * Zeigt eine Nachricht nach erfolgreicher Registrierung an.
 */
function signUpMessage() {
  let message = document.getElementById('signup-message');
  setTimeout(function () {
    message.classList.remove('d-none');
    message.classList.add('d-flex');
  }, 500)
}

/**
 * Leitet nach der Registrierung zur Login-Seite um.
 */
function redirectToLogin() {
  setTimeout(function () {
    window.location.href = '/landingpage.html'
  }, 1500)
}

/**
 * Generiert eine tageszeitabhängige Willkommensnachricht.
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
 * Zeigt das Passwort auf der Login-Seite.
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

/**
 * Führt den Gast-Login durch.
 */
function guestLogin() {
  window.location.href = '/guest.index.html'
}

/**
 * Markiert die Navigationsbuttons abhängig von der aktuellen Seite.
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
 * Zählt die Gesamtanzahl der Aufgaben auf der Zusammenfassungsseite.
 */
function numberOfAllTasks() {
  let allTasks = document.getElementById('numberOfTasksInBoard');
  allTasks.innerHTML = tasks.length;
}

/**
 * Sortiert die Aufgaben nach dem Status "ToDo".
 */
function sortTasksByStateToDo() {
  let toDo = document.getElementById('numberOfToDos');
  let result = tasks.filter((task) => task.state.includes("toDo")).length;
  toDo.innerHTML = result;
}

/**
 * Sortiert die Aufgaben nach dem Status "In Progress".
 */
function sortTasksByStateInProgress() {
  let inProgress = document.getElementById('numberOfTasksInProgress');
  let result = tasks.filter((task) => task.state.includes("in-progress")).length;
  inProgress.innerHTML = result;
}

/**
 * Sortiert die Aufgaben nach dem Status "Done".
 */
function sortTasksByStateDone() {
  let done = document.getElementById('numberOfDone');
  let result = tasks.filter((task) => task.state.includes("done")).length;
  done.innerHTML = result;
}

/**
 * Sortiert die Aufgaben nach dem Status "Awaiting Feedback".
 */
function sortTasksByStateAwaitingFeedback() {
  let awaitingFeedback = document.getElementById('awaitingFeedback');
  let result = tasks.filter((task) => task.state.includes("await-feedback")).length;
  awaitingFeedback.innerHTML = result;
}

/**
 * Sortiert die Aufgaben nach der Priorität "Urgent".
 */
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

function hideWelcomeMessageMobile() {
  if (window.innerWidth < 800) {
    document.getElementById('welcome-section').classList.add("d-none")
  } if (window.innerWidth > 800){
    document.getElementById('welcome-section').classList.add("d-flex")
  }
}

function mobileWelcomeAnimation() {
  if (window.innerWidth < 485) {
    document.getElementById('tasks-headline-container').classList.add("welcomMessageAnimationInvis");
    document.getElementById('navbar').classList.add("welcomMessageAnimationInvis");
    document.getElementById('header').classList.add("welcomMessageAnimationInvis");
    //document.getElementById('daytime').style.font-size = "30px";
    //document.getElementById('welcome-message').style.font-size = "30px";
    document.getElementById('welcome-section').style.display = "flex";
    document.getElementById('welcome-section').style.position = "absolute";
    document.getElementById('welcome-section').style.top = "45%";
    setTimeout(() => {
    document.getElementById('welcome-section').style.display = "none";
  }, 900);
  }
}
