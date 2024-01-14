let contacts = [];
let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ä', 'Ö', 'Ü',];
let letterContainer = {}

alphabet.forEach((letter) => {
    letterContainer[letter] = [];
})

function renderContact() {
    setLettersContainers();
}

function setLettersContainers() {
    let contactList = document.getElementById('contacts-list');
    contactList.innerHTML = '';
    for (let i = 0; i < alphabet.length; i++) {
        let letter = alphabet[i]
        contactList.innerHTML += /*html*/ `
        <div id="alphabet-letter-container${i}" class="alphabet-letter-container">
            <div id="letter-container${i}" class="letter-container">
                <span id="letter${i}" class="letter">${letter}</span>
            </div>
            <span class="contact-list-separator-bar"></span>
            <div id="contact-container" class="contact-container"></div>
        </div>
            `
    }
}


function getContact() {
    let completeName = document.getElementById('name').value;
    let emailAdress = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    addContacts(completeName, emailAdress, phone)
}

function addContacts(completeName, emailAdress, phone) {
    let contact = new Contact(completeName, emailAdress, phone)
    contacts.push(contact)
    emptyInputs()
    setContact();
    hideAddContactOverlay()
}

function emptyInputs() {
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        let inp = inputs[i]
        inp.value = '';
    }

}



function setContact() {
    let contactList = document.getElementById(`contact-container`);
    contactList.innerHTML = '';
    for (let i = 0; i < letterContainer.length; i++) {
       
        contactList.innerHTML += /*html*/ `
        <div class="contact">
            <div class="profil-badge"><span class="first-name-letters">AM</span></div>
            <div class="contact-name-email-container">
                <span>${name}</span>
                <span>${email}</span>
                <span class="d-none">${phone}</span>
            </div>
        </div>
        `
    }
}












function showAddContactOverlay() {
    document.getElementById('add-contact-overlay').classList.remove('d-none');
}

function hideAddContactOverlay(event) {
    document.getElementById('add-contact-overlay').classList.add('d-none');
    doNotClose(event)
}

function doNotClose(event) {
    event.stopPropagation()
}