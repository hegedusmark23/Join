
function generateSummaryContent() {
  let container = document.getElementById('main-content');
  let background = document.getElementById('summary-nav');
  container.innerHTML = summaryHTML();
  background.classList.add('selected-nav-link-background');
}

function generateLegalNoticeContent() {
  let container = document.getElementById('main-content');
  container.innerHTML = legalNoticeHTML();
}

function generatePrivacyPolicyContent() {
  let container = document.getElementById('main-content');
  container.innerHTML = privacyPolicyHTML();
}

function generateHelpContent() {
  let container = document.getElementById('main-content');
  container.innerHTML = helpHTML();
}

function changePencilImgColor() {                //Changes the color of an icon on hover
  var image = document.getElementById("pencil-icon");
  var button = document.getElementById("pencil-button");
  button.addEventListener('mouseover', function () {
    image.src = "/assets/img/pencil-blue.png"
  })
  button.addEventListener('mouseout', function () {
    image.src = "/assets/img/pencil-white.png"
  })
}

function changeCheckImgColor() {         //Changes the color of an icon on hover
  var image = document.getElementById("check-icon");
  var button = document.getElementById("check-button");
  button.addEventListener('mouseover', function () {
    image.src = "/assets/img/check-blue.png"
  })
  button.addEventListener('mouseout', function () {
    image.src = "/assets/img/check-white.png"
  })
}


function showMenu() {     //Toggles the menu on click
  var x = document.getElementById("popup-menu");
  if (x.style.display === "none") {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }
}

function closeMenu() {
  let menu = document.getElementById('popup-menu');
  menu.classList.remove('d-flex');
  menu.classList.add('d-none');
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

function rememberMe() {
    const rmCheck = document.getElementById("remember"),
      passwordInput = document.getElementById("password"),
      emailInput = document.getElementById("email");
    if (localStorage.checkbox && localStorage.checkbox !== "") {
      rmCheck.setAttribute("checked", "checked");
      passwordInput.value = localStorage.userpassword;
      emailInput.value = localStorage.useremail;
    } else {
      rmCheck.removeAttribute("checked");
      passwordInput.value = "";
      emailInput.value = "";
    }

    /*submitButton.onclick =function() {
      if (rmCheck.checked && emailInput.value !== "") {
        localStorage.userpassword = passwordInput.value;
        localStorage.useremail = emailInput.value;
        localStorage.checkbox = rmCheck.value;
      } else {
        localStorage.userpassword = "";
        localStorage.useremail = "";
        localStorage.checkbox = "";
      }
    }*/
}


function timeDynamicWelcome(){
    let welcome =  document.getElementById('daytime')
    let date = new Date();  
    let hour = date.getHours();
    if (hour > 12) {  
      welcome.innerHTML = 'good morning';
       
    } else if (hour < 17) {  
      welcome.innerHTML = 'good afternoon';  
    } else if ( hour < 17) {  
      console.log('good evening');   
      welcome.innerHTML = 'good evening';
      
    }  
}