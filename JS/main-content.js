
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

function showMenu() {
  let menu = document.getElementById('popup-menu');
  let button = document.getElementById('user-button');

  button.addEventListener('click', function () {
    menu.classList.remove('d-none');
    menu.classList.add('d-flex');
  });
  
  button.addEventListener('click', function (event) {
    if (event.target !== button)
      menu.classList.remove('d-flex');
    menu.classList.add('d-none');
  });
}

function closeMenu() {
  let menu = document.getElementById('popup-menu');
  menu.classList.remove('d-flex');
  menu.classList.add('d-none');
}