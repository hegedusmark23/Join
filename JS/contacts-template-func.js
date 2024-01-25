// creates a list of containers, where the title of each container is a letter
function setLetterContainersHTML(contactList, key) {
    contactList.innerHTML += /*html*/ `
    <div id="letter-container${key}" class="letter-container">
        <h2 class="contact-letter">${key}</h2>
        <div class="contact-list-separator-bar-container">
            <span class="contact-list-separator-bar"></span>
        </div>
        <div id="cont${key}" class="cont"></div>
    </div>
    `
}

// Display the values (contacts) that are inside each Keys
function getShowContactHTML(i, key, cont, contact, casualColor) {
    cont.innerHTML += /*html*/ `
    <div tabindex="0" onblur="backgroundAndTextOriginal('${key}',${i})" onfocus="backgroundBlackAndWhiteText('${key}',${i});" onclick="showContactOnclick('${key}', ${i})" id="under-container${key}${i}" class="under-container">
        <div class="contact-badge-bg-container"><div id="contact-badge${i}" class="contact-badge" style="background:#${casualColor}"><span class="firstLetters">${capitalizedLetters}</span></div></div>
         <div id="name-and-email-container${i}" class="name-and-email-container">
           <span id="contact-list-name${key}${i}" class="contact-list-name">${contact.completeName}</span>
           <span id="contact-list-email${key}${i}" class="contact-list-email">${contact.email}</span>
         </div>
    </div>
`
}