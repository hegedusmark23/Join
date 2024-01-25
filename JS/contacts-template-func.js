// creates a list of containers, where the title of each container is a letter
function setLetterContainersHTML(key) {
    return /*html*/ `
      <div id="letter-container${key}" class="letter-container">
          <h2 class="contact-letter">${key}</h2>
          <div class="contact-list-separator-bar-container">
              <span class="contact-list-separator-bar"></span>
          </div>
          <div id="cont${key}" class="cont"></div>
      </div>
      `
  
  }
  
  // Display the values (contacts) that are inside each Keys. Fill the list of containers with contacts
  function getShowContactHTML(i, key, contact, casualColor) {
    return /*html*/ `
      <div tabindex="0" onblur="backgroundAndTextOriginal('${key}',${i})" onfocus="backgroundBlackAndWhiteText('${key}',${i});" onclick="showContactOnclick('${key}', ${i})" id="under-container${key}${i}" class="under-container">
          <div class="contact-badge-bg-container"><div id="contact-badge${i}" class="contact-badge" style="background:#${casualColor}"><span class="firstLetters">${capitalizedLetters}</span></div></div>
           <div id="name-and-email-container${i}" class="name-and-email-container">
             <span id="contact-list-name${key}${i}" class="contact-list-name">${contact.completeName}</span>
             <span id="contact-list-email${key}${i}" class="contact-list-email">${contact.email}</span>
           </div>
      </div>
  `
  }
  
  // Show the already created contact in the view when the user clicks on "Create Contact" button
  // row 127 in contacts.js
  function showAlreadyCreatedContactInTheViewHTML(i, key, capitalizedLetters, name, email, phone) {
    return /*html*/ `
      <div id="contact-view-name-container${key}${i}" class="contact-view-name-container">
          <div id="contact-view-badge-container${key}${i}" class="contact-view-badge-container">
            <span class="contact-view-badge">${capitalizedLetters}</span>
          </div>
          <div class="contact-view-edit-delete-container">
              <h2 id="contact-view-name${key}${i}" class="contact-view-name">${name}</h2>
              <div class="contact-view-icons-container">
                <span onclick="showEditContactOverlay('${key}', ${i})" id="contact-view-edit-container${key}${i}" class="contact-view-edit-container">
                  <img src="./assets/icons/pen.svg" alt="">Edit
                </span> 
                <span onclick="deleteContact('${key}', ${i})" id="contact-view-delete-container${key}${i}" class="contact-view-delete-container">
                  <img src="./assets/icons/trashbin.svg" alt="">Delete
                </span>
              </div>
          </div>
      </div>
      <h3 class="contact-information-title">Contact Information</h3>
      <div class="contact-view-information-container">
          <div class="contact-view-email-container">
              <h3>Email</h3>
             <a class="contact-view-email">${email}</a>
          </div>
          <div class="contact-view-phone-container">
              <h3>Phone</h3>
              <span class="contact-view-phone">${phone}</span>
          </div>
      </div>
      `
  }
  
  function contactViewContainerHTML(key, i, name, email, phone) {
    return /*html*/ `
    <div id="contact-view-name-container${key}${i}" class="contact-view-name-container">
        <div id="contact-view-badge-container${key}${i}" class="contact-view-badge-container">
          <span class="contact-view-badge">${capitalizedLetters}</span>
        </div>
        <div class="contact-view-edit-delete-container">
            <h2 id="contact-view-name${key}${i}" class="contact-view-name">${name}</h2>
            <div class="contact-view-icons-container">
              <span onclick="showEditContactOverlay('${key}', ${i})" id="contact-view-edit-container${key}${i}" class="contact-view-edit-container">
                <img src="./assets/icons/pen.svg" alt="">Edit
              </span> 
              <span onclick="deleteContact('${key}', ${i})" id="contact-view-delete-container${key}${i}" class="contact-view-delete-container">
                <img src="./assets/icons/trashbin.svg" alt="">Delete
              </span>
            </div>
        </div>
    </div>
    <h3>Contact Information</h3>
    <div id="contact-view-information-container${key}${i}" class="contact-view-information-container">
        <div class="contact-view-email-container">
            <h3>Email</h3>
           <a id="contact-view-email${key}${i}" class="contact-view-email">${email}</a>
        </div>
        <div class="contact-view-phone-container">
            <h3>Phone</h3>
            <span id="contact-view-phone${key}${i}" class="contact-view-phone">${phone}</span>
        </div>
    </div>
    `
  }
  
  // Show the "Edit Contact" pop-up to change the settings of a contact;
  function editContactOverlayHTML(key, i) {
    return /*html*/ `
    <div onclick="doNotClose(event)" id="contact-dialog${key}${i}" class="contact-dialog">
            <div class="contacts-left-container">
                <div class="logo-and-title-container">
                    <span><img class="contact-dialog-logo" src="./assets/img/logo-small-white.png" alt=""></span>
                    <h2 class="add-contact-title">Edit Contact</h2>
                    <span class="border-bar"></span>
                </div>
            </div>
            <div class="contact-right-container">
                <div id="edit-contact-badge-container${key}${i}" class="edit-contact-badge-container" style="background:#${casualColor}">
                    <span>${capitalizedLetters}</span>
                </div>
                <div class="input-and-btn-container">
                    <span class="cross-icon-container"><img onclick="hideEditContactOverlay(event)" class="cross-icon" src="./assets/icons/cross.svg"
                            alt=""></span>
                    <div class="inputs-container">
                        <input id="input-name${key}${i}" class="input-name" type="text" id="name" placeholder="Name and Lastname">
                        <input id="input-email${key}${i}" class="input-email" type="email" id="email" placeholder="E-Mail Address">
                        <input id="input-phone${key}${i}" class="input-phone" type="text" id="phone" placeholder="Phone">
                    </div>
                    <div class="contact-btn-container">
                        <button class="add-contact-btn1" onclick="emptyInputs()">Delete
                            <svg class="cross-icon-btn1" width="24" height="25" viewBox="0 0 24 25" fill=""
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.001 12.5001L17.244 17.7431M6.758 17.7431L12.001 12.5001L6.758 17.7431ZM17.244 7.25708L12 12.5001L17.244 7.25708ZM12 12.5001L6.758 7.25708L12 12.5001Z"
                                    stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
  
                        </button>
                        <button class="add-contact-btn2" onclick="saveNewContact('${key}', ${i})">Save<img
                                class="check-icon-btn2" src="./assets/icons/check.svg" alt=""></button>
                    </div>
                </div>
            </div>
        </div>
    `;
  }
  