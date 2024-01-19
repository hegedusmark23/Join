
let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ä', 'Ö', 'Ü',];
let letterContainer = {};
let colors = ['9327FF', '6E52FF', 'FC71FF', 'FFBB2B', '1FD7C1']
let firstLetter;
let capitalizedLetters;

alphabet.forEach((letter) => {
    letterContainer[letter] = [];
})

function renderContact() {
    setLettersContainers();
}


function setLettersContainers() {
    let contactList = document.getElementById('contacts-list');
    contactList.innerHTML = '';
    for (let key in letterContainer) {
        if (letterContainer.hasOwnProperty(key)) {
            setLetterContainersHTML(contactList, key)
        }
        showContacts(key);
    }
}

function showContacts(key) {
    let cont = document.getElementById(`cont${key}`);
    cont.innerHTML = '';
    let contacts = letterContainer[key];
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i]
        capitalizeLetters(contact.completeName)
        let color = Math.floor(Math.random() * colors.length);
        let casualColor = colors[color];
        getShowContactHTML(i, cont, contact, casualColor);
    }
}



function getContact() {
    let completeName = document.getElementById('name').value;
    let emailAdress = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    firstLetter = completeName.charAt(0).toUpperCase();
    addContacts(completeName, emailAdress, phone)
}

function addContacts(completeName, emailAdress, phone) {
    let contact = new Contact(completeName, emailAdress, phone);
    if (alphabet.includes(firstLetter)) {
        letterContainer[firstLetter].push(contact);
        renderContact();
    }
    emptyInputs()
    hideAddContactOverlay()
}

function emptyInputs() {
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        let inp = inputs[i]
        inp.value = '';
    }
}

function capitalizeLetters(completeName) {
    let name = completeName.split(" "); // mettere sempre uno spazio in mezzo quando si vuol creare due parole intere separate
    let words = name.map((word) => {
        return word.charAt(0);
    });
    capitalizedLetters = words.join("");
    console.log(capitalizedLetters);

}

capitalizeLetters('Mario Rossi');










function showAddContactOverlay() {
    document.getElementById('add-contact-overlay').classList.remove('d-none');
}

function hideAddContactOverlay() {
    document.getElementById('add-contact-overlay').classList.add('d-none');
    doNotClose(event)
}

function doNotClose(event) {
    event.stopPropagation()
}