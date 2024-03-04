/**
 * This function returns the HTML structure of the main container of each contact, where the container name is the key of the JSON letterContainer and the contacts contained therein have the same initial letter as the containing key
 * @param {string} key - parameter corresponding to the main container in which the contact is contained
 * @param {number} i - Index of each contact contained in the main letter container
 */
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


/**
 * This function displays the values (contacts) that are in the individual keys. Fill the list of containers with contacts
 * @param {number} i - Index of each contact contained in the main container
 * @param {string} key - parameter corresponding to the main container in which the contact is contained
 * @param {string} name - Contact's name
 * @param {string} email - Contact's E-Mail
 * @returns {string} - the HTML structure of the subordinate container
 */
function getShowContactInTheListHTML(i, key, name, email) {
  return /*html*/ `
      <div tabindex="0" onblur="backgroundAndTextOriginal('${key}',${i})" onfocus="backgroundBlackAndWhiteText('${key}',${i});" onclick="showContact('${key}', ${i})" id="under-container${key}${i}" class="under-container">
          <div class="contact-badge-bg-container"><div id="contact-badge${key}${i}" class="contact-badge" style="background:${badgeColor}"><span class="firstLetters">${capitalizedLetters}</span></div></div>
           <div id="name-and-email-container${i}" class="contact-list-name-and-email-container">
             <span id="contact-list-name${key}${i}" class="contact-list-name">${name}</span>
             <span id="contact-list-email${key}${i}" class="contact-list-email">${email}</span>
           </div>
      </div>
  `
}

/**
 * Display of the already created contact in the contact view when the user clicks on the "Add Contact" button
 * @param {number} i - Index of each contact contained in the main container
 * @param {string} key - parameter corresponding to the main container in which the contact is contained 
 * @param {string} capitalizedLetters - the initials of the Contact's full name
 * @param {string} name - Contact's name
 * @param {string} email - Contact's E-Mail
 * @param {string} phone - Contact's phone number
 * @param {string} badgeColor - Contact's badge color
 * @returns {string} the HTML structure that displays the newly created contact in the contact view
 */
function showAlreadyCreatedContactInTheViewHTML(i, key, capitalizedLetters, name, email, phone, badgeColor) {
  return /*html*/ `
      <div onclick="hidePopUpEditDelete(event)" id="contact-view-name-container${key}${i}" class="contact-view-name-container">
          <div id="contact-view-badge-container${key}${i}" class="contact-view-badge-container" style="background:${badgeColor}">
            <span class="contact-view-badge">${capitalizedLetters}</span>
          </div>
          <div class="contact-view-edit-delete-container">
            <h2 id="contact-view-name${key}${i}" class="contact-view-name">${name}</h2>
            <div id="contact-view-icons-container" class="contact-view-icons-container mobile-d-none">
              <span onclick="showEditContactOverlay('${key}', ${i})" id="contact-view-edit-container${key}${i}" class="contact-view-edit-container">
              <svg class="pencil-edit" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <mask id="mask0_145734_3876" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
               <rect width="24" height="24" fill="#D9D9D9"/>
               </mask>
               <g mask="url(#mask0_145734_3876)">
               <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"/>
               </g>
              </svg>
              <p class="edit">Edit</p>
              </span> 
              <span onclick="deleteContact('${key}', ${i})" id="contact-view-delete-container${key}${i}" class="contact-view-delete-container">
              <svg class="trashbin-edit" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_145734_4140" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_145734_4140)">
                <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
                </g>
              </svg>
              <p class="delete">Delete</p>
              </span>
            </div>
            <div id="contact-view-icons-container-mobile" class="contact-view-icons-container-mobile">
              <span onclick="showEditContactOverlay('${key}', ${i})" id="contact-view-edit-container${key}${i}" class="contact-view-edit-container">
              <svg class="pencil-edit" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <mask id="mask0_145734_3876" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
               <rect width="24" height="24" fill="#D9D9D9"/>
               </mask>
               <g mask="url(#mask0_145734_3876)">
               <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"/>
               </g>
              </svg>
              <p class="edit">Edit</p>
              </span> 
              <span onclick="deleteContact('${key}', ${i})" id="contact-view-delete-container${key}${i}" class="contact-view-delete-container">
              <svg class="trashbin-edit" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_145734_4140" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_145734_4140)">
                <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
                </g>
              </svg>
              <p class="delete">Delete</p>
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
    </div>
    <div class="successfulButtonContainer">
       <span id="successfulButton" class="successfulButton translateSuccButton translateSuccButtonMobile">
         Contact successfully created
       </span>
    </div>
      `

}

/**
 * Diese Funktion zeigt in der Kontakt-Ansicht einen aus der Kontaktliste ausgewählten Kontakt an
 * @param {string} key - parameter corresponding to the main container in which the contact is contained 
 * @param {number} i - Index of each contact contained in the main container
 * @param {string} name - Contact's name
 * @param {string} email - Contact's E-Mail
 * @param {string} phone - Contact's phone number
 * @param {string} badgeColor - Contact's badge color 
 * @returns {string} the HTML structure of the contact data displayed in the contact view
 */
function contactViewContainerHTML(key, i, name, email, phone, badgeColor) {
  return /*html*/ `
    <div id="contact-view-name-container${key}${i}" class="contact-view-name-container">
        <div id="contact-view-badge-container${key}${i}" class="contact-view-badge-container" style="background:${badgeColor}">
          <span class="contact-view-badge">${capitalizedLetters}</span>
        </div>
        <div class="contact-view-edit-delete-container">
            <h2 id="contact-view-name${key}${i}" class="contact-view-name">${name}</h2>
            <div id="contact-view-icons-container" class="contact-view-icons-container mobile-d-none">
              <span onclick="showEditContactOverlay('${key}', ${i})" id="contact-view-edit-container${key}${i}" class="contact-view-edit-container">
              <svg class="pencil-edit" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <mask id="mask0_145734_3876" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
               <rect width="24" height="24" fill="#D9D9D9"/>
               </mask>
               <g mask="url(#mask0_145734_3876)">
               <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"/>
               </g>
              </svg>
              <p class="edit">Edit</p>
              </span> 
              <span onclick="deleteContact('${key}', ${i})" id="contact-view-delete-container${key}${i}" class="contact-view-delete-container">
              <svg class="trashbin-edit" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_145734_4140" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_145734_4140)">
                <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
                </g>
              </svg>
              <p class="delete">Delete</p>
              </span>
            </div>
            <div id="contact-view-icons-container-mobile" class="contact-view-icons-container-mobile translateXPopUpEditDelete">
              <span onclick="showEditContactOverlay('${key}', ${i})" id="contact-view-edit-container${key}${i}" class="contact-view-edit-container">
              <svg class="pencil-edit" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <mask id="mask0_145734_3876" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
               <rect width="24" height="24" fill="#D9D9D9"/>
               </mask>
               <g mask="url(#mask0_145734_3876)">
               <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"/>
               </g>
              </svg>
              <p class="edit">Edit</p>
              </span> 
              <span onclick="deleteContact('${key}', ${i})" id="contact-view-delete-container${key}${i}" class="contact-view-delete-container">
              <svg class="trashbin-edit" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_145734_4140" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_145734_4140)">
                <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
                </g>
              </svg>
              <p class="delete">Delete</p>
              </span>
            </div>
        </div>
    </div>
    <h3 class="contact-information-title">Contact Information</h3>
    <div id="contact-view-information-container${key}${i}" class="contact-view-information-container">
        <div class="contact-view-email-container">
            <h3 class="contact-view-email-title">Email</h3>
           <a href="mailto:${email}" id="contact-view-email${key}${i}"  class="contact-view-email">${email}</a>
        </div>
        <div class="contact-view-phone-container">
            <h3 class="contact-view-phone-title">Phone</h3>
            <a href="tel:${phone}" id="contact-view-phone${key}${i}" class="contact-view-phone">${phone}</a>
        </div>
    </div>
    `
}

/**
 * This function displays the "Edit Contact" pop-up to change the settings of a contact or delete it
 * @param {string} key - parameter corresponding to the main container in which the contact is contained 
 * @param {number} i - Index of each contact contained in the main container
 * @param {string} badgeColor - Contact's badge color 
 * @returns {string} - the HTML structure that shows the dialog and the pop-up of the "Edit Contact" area 
 */
function editContactOverlayHTML(key, i, badgeColor) {
  return /*html*/ `
    <div onclick="doNotClose(event)" id="contact-dialog${key}${i}" class="contact-dialog translateContactDialogPopUp translateContactDialogPopUp-Mobile">
            <div class="contacts-left-container">
                <div class="logo-and-title-container">
                    <span><img class="contact-dialog-logo mobile-d-none" src="./assets/img/logo-small-white.png" alt=""></span>
                    <h2 class="edit-contact-title">Edit Contact</h2>
                    <span class="border-bar"></span>
                </div>
            </div>
            <div class="contact-right-container">
            <div class="mobile-badge-container">
            <div id="edit-contact-badge-container${key}${i}" class="edit-contact-badge-container" style="background:${badgeColor}">
                    <span class="initialsLetters">${capitalizedLetters}</span>
                </div>
            </div>
              <form onsubmit="saveNewContact('${key}', ${i}); return false" class="input-and-btn-container">
                    <span onclick="hideEditContactOverlay('${key}', ${i}, event)" class="cross-icon-container"> 
                      <svg class="cross-icon" width="24" height="25" viewBox="0 0 24 25" fill=""
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.001 12.5001L17.244 17.7431M6.758 17.7431L12.001 12.5001L6.758 17.7431ZM17.244 7.25708L12 12.5001L17.244 7.25708ZM12 12.5001L6.758 7.25708L12 12.5001Z"
                                    stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <div class="inputs-container">
                        <input required id="input-name${key}${i}" class="input-name" type="text" id="name" placeholder="Name and Lastname">
                        <input required id="input-email${key}${i}" class="input-email" type="email" id="email" placeholder="E-Mail Address">
                        <input required id="input-phone${key}${i}" class="input-phone" type="text" id="phone" placeholder="Phone">
                    </div>
                    <div class="contact-btn-container">
                        <button class="edit-contact-btn1" onclick="deleteContact('${key}', ${i}, event)">Delete
                            <svg class="cross-icon-btn1" width="24" height="25" viewBox="0 0 24 25" fill=""
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.001 12.5001L17.244 17.7431M6.758 17.7431L12.001 12.5001L6.758 17.7431ZM17.244 7.25708L12 12.5001L17.244 7.25708ZM12 12.5001L6.758 7.25708L12 12.5001Z"
                                    stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
  
                        </button>
                        <button class="add-contact-btn2">Save<img
                                class="check-icon-btn2" src="./assets/icons/check.svg" alt="">
                        </button>
                    </div>
              </form>
            </div>
        </div>
    `;
}
