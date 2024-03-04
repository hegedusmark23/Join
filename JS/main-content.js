/**
 * Generates the content for the legal notice.
 */
function generateLegalNoticeContent() {
  let container = document.querySelector('section');
  container.innerHTML = legalNoticeHTML();
}

/**
 * Generates the content for the privacy policy.
 */
function generatePrivacyPolicyContent() {
  let container = document.querySelector('section');
  container.innerHTML = privacyPolicyHTML();
}

/**
 * Generates the content for the help page.
 */
function generateHelpContent() {
  let container = document.querySelector('section');
  container.innerHTML = helpHTML();
}

/**
 * Changes the color of an icon when hovering over it with the mouse.
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
 * Changes the color of an icon when hovering over it with the mouse.
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
 * Opens the animated menu.
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
 * Closes the menu.
 */
function closeMenu() {
  let menu = document.getElementById('popup-menu');
  menu.style.display = "none";
}

/**
 * Displays a message after successful registration.
 */
function signUpMessage() {
  let message = document.getElementById('signup-message');
  setTimeout(function () {
    message.classList.remove('d-none');
    message.classList.add('d-flex');
  }, 500)
}

/**
 * Redirects to the login page after registration.
 */
function redirectToLogin() {
  setTimeout(function () {
    window.location.href = '/landingpage.html'
  }, 1500)
}

/**
 * Generates a time-of-day welcome message.
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
 * Shows the password on the login page.
 */
function revealPassword(inputField) {
  if (inputField.type === "password" && inputField.value.length > 2) {
    inputField.style.background = "url(/assets/img/visibility.png)";
    inputField.type = "text";
  } else {
    inputField.style.background = "url(/assets/img/lock-icon.png)";
    inputField.type = "password";
  }
  inputField.style.backgroundRepeat = "no-repeat";
  inputField.style.backgroundPosition = "center";
  inputField.style.backgroundPositionX = "calc(100% - 12px)";
}


/**
 * Performs guest login.
 */
function guestLogin() {
  window.location.href = '/guest.index.html'
}

/**
 * Marks the navigation buttons depending on the current page.
 */
function buttonFocus() {
  let summaryNav = document.getElementById("summary-nav");
  let addTaskNav = document.getElementById("addTask-nav");
  let boardNav = document.getElementById("board-nav");
  let contactsNav = document.getElementById("contacts-nav");
  setTimeout(buttonFocus, 100);
  if (window.location.href === "https://gruppe-870.developerakademie.net/summary.html" && summaryNav) {
    summaryNav.style.backgroundColor = "#091931";
  } if (window.location.href === "https://gruppe-870.developerakademie.net/addtask.html" && addTaskNav) {
    addTaskNav.style.backgroundColor = "#091931";
  } if (window.location.href === "https://gruppe-870.developerakademie.net/board.html" && boardNav) {
    boardNav.style.backgroundColor = "#091931";
  } if (window.location.href === "https://gruppe-870.developerakademie.net/addcontacts.html" && contactsNav) {
    contactsNav.style.backgroundColor = "#091931";
  }
}

/**
 * @returns the current url.
 */
function getCurrentURL() {
  return window.location.href
}

/**
 * Redirects to the previous page from the generated content.
 */
function closeGeneratedContent() {
  const url = getCurrentURL()
    window.location.href = url;
}

/**
 * Counts the total number of tasks on the summary page.
 */
function numberOfAllTasks() {
  let allTasks = document.getElementById('numberOfTasksInBoard');
  allTasks.innerHTML = tasks.length;
}

/**
 * Sorts the tasks according to “ToDo” status.
 */
function sortTasksByStateToDo() {
  let toDo = document.getElementById('numberOfToDos');
  let result = tasks.filter((task) => task.state.includes("toDo")).length;
  toDo.innerHTML = result;
}

/**
 * Sorts tasks by In Progress status.
 */
function sortTasksByStateInProgress() {
  let inProgress = document.getElementById('numberOfTasksInProgress');
  let result = tasks.filter((task) => task.state.includes("in-progress")).length;
  inProgress.innerHTML = result;
}

/**
 * Sorts the tasks by “Done” status.
 */
function sortTasksByStateDone() {
  let done = document.getElementById('numberOfDone');
  let result = tasks.filter((task) => task.state.includes("done")).length;
  done.innerHTML = result;
}

/**
 * Sorts tasks by Awaiting Feedback status.
 */
function sortTasksByStateAwaitingFeedback() {
  let awaitingFeedback = document.getElementById('awaitingFeedback');
  let result = tasks.filter((task) => task.state.includes("await-feedback")).length;
  awaitingFeedback.innerHTML = result;
}

/**
 * Sorts tasks by Urgent priority.
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

/**
 * Loads an animation below a specific window size.
 */
function mobileWelcomeAnimation() {
  if (window.innerWidth < 485) {
    document.getElementById('tasks-headline-container').classList.add("welcomMessageAnimationInvis");
    document.getElementById('navbar').classList.add("welcomMessageAnimationInvis");
    document.getElementById('header').classList.add("welcomMessageAnimationInvis");
    document.getElementById('welcome-section').style.display = "flex";
    document.getElementById('welcome-section').style.position = "absolute";
    document.getElementById('welcome-section').style.top = "45%";
    setTimeout(() => {
      document.getElementById('welcome-section').style.display = "none";
    }, 900);
  }
}


