// creates a list of containers, where the title of each container is a letter
function setLetterContainersHTML(contactList, key) {
    contactList.innerHTML += /*html*/ `
    <div class="letter-container">
        <h2 class="contact-letter">${key}</h2>
        <div class="contact-list-separator-bar-container">
            <span class="contact-list-separator-bar"></span>
        </div>
        <div id="cont${key}" class="cont"></div>
    </div>
    `
}

// Display the values (contacts) that are inside every Keys
function getShowContactHTML(i, cont, contact, casualColor) {
    cont.innerHTML += /*html*/ `
    <div id="under-container${i}" class="under-container">
        <div class="contact-badge" style="background:#${casualColor}"><span class="firstLetters">${capitalizedLetters}</span></div>
         <div class="name-and-email-container">
           <span class="contact-list-name">${contact.completeName}</span>
           <span class="contact-list-email">${contact.email}</span>
         </div>
    </div>
`
}