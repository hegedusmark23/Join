
let letterContainer = {};
let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ä', 'Ö', 'Ü',];
let colors = ['#9327FF', '#6E52FF', '#FC71FF', '#FFBB2B', '#1FD7C1', '#462F8A'];
let firstLetter;
let capitalizedLetters;
let inputName;
let inputEmail;
let inputPhone;
let badge;
let badgeColor;


alphabet.forEach((letter) => {
    letterContainer[letter] = [];
})

async function renderContact() {
    includeHTML();
    await loadItems();
    await setLettersContainers();
}

async function loadItems() {
    try {
        letterContainer = JSON.parse(await getItem('contacts'));
    } catch (e) {
        console.warn(e);
    }
}

async function getContact() {
    let color = Math.floor(Math.random() * colors.length);
    let completeName = document.getElementById('name').value;
    let emailAdress = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    badgeColor = colors[color]
    firstLetter = completeName.charAt(0).toUpperCase();
    addContacts(completeName, emailAdress, phone, badgeColor);
}

async function addContacts(completeName, emailAdress, phone, badgeColor) {
    let contact = new Contact(completeName, emailAdress, phone, badgeColor);
    if (alphabet.includes(firstLetter)) {
        letterContainer[firstLetter].push(contact);
        await setItem('contacts', JSON.stringify(letterContainer));
    }
    await showAlreadyCreatedContactInTheView();
    await renderContact();
    emptyInputs();
    hideAddContactOverlay();
}

function emptyInputs() {
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i]
        input.value = '';
    }
}

async function setLettersContainers() {
    let contactList = document.getElementById('contacts-list');
    contactList.innerHTML = '';
    for (let key in letterContainer) {
        if (letterContainer.hasOwnProperty(key)) {
            contactList.innerHTML += setLetterContainersHTML(key);
        }
        showContactsInTheList(key);
    }
}

function showContactsInTheList(key) {
    let cont = document.getElementById(`cont${key}`);
    cont.innerHTML = '';
    let contacts = letterContainer[key];
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        capitalizeLetters(contact.completeName);
        cont.innerHTML += getShowContactInTheListHTML(i, key, contact);
    }
}



function capitalizeLetters(completeName) {
    let name = completeName.split(" "); // mettere sempre uno spazio in mezzo quando si vuol creare due stringe intere separate
    let words = name.map((word) => {
        return word.charAt(0);
    });
    capitalizedLetters = words.join("");

}

function showContactOnclick(key, i) {
    let contactViewContainer = document.getElementById('contact-view-container')
    let name = letterContainer[key][i]['completeName'];
    let email = letterContainer[key][i]['email'];
    let phone = letterContainer[key][i]['phone'];
    badgeColor = letterContainer[key][i]['badgeColor'];
    capitalizeLetters(name);
    contactViewContainer.innerHTML = contactViewContainerHTML(key, i, name, email, phone, badgeColor);
    contactViewContainer.classList.remove('translateX')
}


async function showAlreadyCreatedContactInTheView() {
    let key = firstLetter;
    let i = letterContainer[key].length - 1;
    let contactViewContainer = document.getElementById('contact-view-container');
    contactViewContainer.classList.remove('translateX');
    let name = letterContainer[key][i]['completeName'];
    let email = letterContainer[key][i]['email'];
    let phone = letterContainer[key][i]['phone'];
    badgeColor = letterContainer[key][i]['badgeColor']
    capitalizeLetters(name);
    contactViewContainer.innerHTML = showAlreadyCreatedContactInTheViewHTML(i, key, capitalizedLetters, name, email, phone, badgeColor);
    setTimeout(successfulContactAddedButton, 1000);
}

async function successfulContactAddedButton() {
    let successButton = document.getElementById('succesfulButtonContainer');
    successButton.classList.remove('translateSuccButton');
    setTimeout(hideSuccessfulContactAddedButton, 2000);
}

function hideSuccessfulContactAddedButton() {
    let successButton = document.getElementById('succesfulButtonContainer');
    successButton.classList.add('translateSuccButton');
}

function showEditContactOverlay(key, i) {
    let name = letterContainer[key][i]['completeName'];
    let email = letterContainer[key][i]['email'];
    let phone = letterContainer[key][i]['phone'];
    badgeColor = letterContainer[key][i]['badgeColor'];
    capitalizeLetters(name);
    let editContactOverlay = document.getElementById('edit-contact-overlay');
    editContactOverlay.classList.remove('d-none');
    editContactOverlay.innerHTML = editContactOverlayHTML(key, i,);
    getTheInputs(key, i);
    displayTheContactDataInTheInputs(name, email, phone, badgeColor);
}

function getTheInputs(key, i) {
    inputName = document.getElementById(`input-name${key}${i}`);
    inputEmail = document.getElementById(`input-email${key}${i}`);
    inputPhone = document.getElementById(`input-phone${key}${i}`);
    badge = document.getElementById(`edit-contact-badge-container${key}${i}`)
}

function displayTheContactDataInTheInputs(name, email, phone, badgeColor) {
    inputName.value = name;
    inputEmail.value = email;
    inputPhone.value = phone;
    badge.style.backgroundColor = badgeColor
}

async function saveNewContact(key, i) {
    let contactViewContainer = document.getElementById('contact-view-container');
    contactViewContainer.classList.remove('translateX');
    letterContainer[key][i]['completeName'] = inputName.value;
    letterContainer[key][i]['email'] = inputEmail.value;
    letterContainer[key][i]['phone'] = inputPhone.value;
    letterContainer[key][i]['badgeColor'] = badgeColor;
    capitalizeLetters(inputName.value);
    await setItem('contacts', JSON.stringify(letterContainer)); // salviamo all'interno del remote storage il nuovo contatto modificato, in modo che sia visibile nella lista quando andremo ad iterare sul JSON, e quando chiameremo getItem;
    contactViewContainer.innerHTML = showAlreadyCreatedContactInTheViewHTML(i, key, capitalizedLetters, inputName.value, inputEmail.value, inputPhone.value, badgeColor);
    document.getElementById('edit-contact-overlay').classList.add('d-none');
    await renderContact();
}

async function deleteContact(key, i) {
    letterContainer[key].splice(i, 1);
    document.getElementById('contact-view-container').innerHTML = '';
    await setItem('contacts', JSON.stringify(letterContainer));
    renderContact();
    hideEditContactOverlay();
}






function backgroundBlackAndWhiteText(key, i) {
    document.getElementById(`under-container${key}${i}`).classList.add('black-container');
    document.getElementById(`contact-list-name${key}${i}`).style.color = '#fff';
    document.getElementById(`contact-list-email${key}${i}`).style.color = '#fff';
}

function backgroundAndTextOriginal(key, i) {
    document.getElementById(`under-container${key}${i}`).classList.remove('black-container');
    document.getElementById(`contact-list-name${key}${i}`).style.color = '#000';
    document.getElementById(`contact-list-email${key}${i}`).style.color = '#000'
}




function hideEditContactOverlay(event) {
    document.getElementById('edit-contact-overlay').classList.add('d-none');
    doNotClose(event)
}
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