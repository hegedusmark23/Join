
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
let windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
let truncedEmail;


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
        const response = await getItem('contacts');
        if (response) {
            letterContainer = JSON.parse(response);
            console.log('Kontakte geladen:', letterContainer);
        } else {
            console.log('Keine Kontakte gefunden.');
        }
    } catch (e) {
        console.error('Fehler beim Laden der Kontakte:', e);
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
    if (windowWidth <= 1050) {
        document.getElementById('contact-book').classList.add('d-none');
        document.getElementById('contact-view-section').classList.remove('mobile-d-none');
        await showAlreadyCreatedContactInTheView();
    } else {
        await showAlreadyCreatedContactInTheView();
    }
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
        let name = contact.completeName;
        let email = contact.email;
        badgeColor = contact.badgeColor;
        capitalizeLetters(name);
        cont.innerHTML += getShowContactInTheListHTML(i, key, name, email);
        truncEmailMobile(key, i)
    }
}

function truncEmailMobile(key, i){
    let email = document.getElementById(`contact-list-email${key}${i}`)
    let emailText = email.innerText;
    if(emailText.length > 21 && windowWidth <= 400){
       let truncedEmail = emailText.slice(0, 21);
       email.innerText = truncedEmail + '...'
    }
}

function capitalizeLetters(completeName) {
    let name = completeName.split(" "); // mettere sempre uno spazio in mezzo quando si vuol creare due stringe intere separate
    let words = name.map((word) => {
        return word.charAt(0);
    });
    capitalizedLetters = words.join("");

}

function showContact(key, i) {
    let name = letterContainer[key][i]['completeName'];
    let email = letterContainer[key][i]['email'];
    let phone = letterContainer[key][i]['phone'];
    badgeColor = letterContainer[key][i]['badgeColor'];
    capitalizeLetters(name);
    if (windowWidth <= 1050) {
        showContactMobileVersion(key, i, name, email, phone, badgeColor);
    } else {
        showContactDesktopVersion(key, i, name, email, phone, badgeColor);
    }

}

function showContactMobileVersion(key, i, name, email, phone, badgeColor) {
    let contactViewContainer = document.getElementById('contact-view-container');
    document.getElementById('contact-book').classList.add('d-none')
    document.getElementById('contact-view-section').classList.remove('mobile-d-none');
    contactViewContainer.innerHTML = contactViewContainerHTML(key, i, name, email, phone, badgeColor);
    contactViewContainer.classList.remove('translateX');
}

function showContactDesktopVersion(key, i, name, email, phone, badgeColor) {
    let contactViewContainer = document.getElementById('contact-view-container')
    contactViewContainer.innerHTML = contactViewContainerHTML(key, i, name, email, phone, badgeColor);
    contactViewContainer.classList.remove('translateX')
}

function backToContactList() {
    document.getElementById('contact-view-section').classList.add('mobile-d-none');
    document.getElementById('contact-book').classList.remove('d-none')
}

function showPopUpEditDelete(event) {
    document.getElementById('contact-view-icons-container').classList.remove('translateXPopUpEditDelete');
    document.getElementById('three-vertical-dots-container').style.backgroundColor = '#29ABE2';
    event.stopPropagation();
}

function hidePopUpEditDelete(event) {
    document.getElementById('contact-view-icons-container').classList.add('translateXPopUpEditDelete');
    setTimeout(removeBgColorOnPopUpClosed, 800);
    event.stopPropagation();
}

function removeBgColorOnPopUpClosed() {
    document.getElementById('three-vertical-dots-container').style.backgroundColor = '#2A3647';
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
    let successButton = document.getElementById('successfulButton');
    if(windowWidth <= 420){
        successButton.classList.remove('translateSuccButtonMobile')
    } else {
        successButton.classList.remove('translateSuccButton');
    }
    setTimeout(hideSuccessfulContactAddedButton, 2000);
}

function hideSuccessfulContactAddedButton() {
    let successButton = document.getElementById('successfulButton');
    if(windowWidth <= 420){
        successButton.classList.add('translateSuccButtonMobile')
    } else{
        successButton.classList.add('translateSuccButton');
    }
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
    document.getElementById(`contact-list-email${key}${i}`).style.color = '#29ABE2'
}




function hideEditContactOverlay(event) {
    document.getElementById('edit-contact-overlay').classList.add('d-none');
    doNotClose(event)
}
function showAddContactOverlay() {
    document.getElementById('add-contact-overlay').classList.remove('d-none');
    document.getElementById('add-new-contact-btn-mobile').style.backgroundColor = '#29ABE2'
}

function hideAddContactOverlay() {
    document.getElementById('add-contact-overlay').classList.add('d-none');
    setTimeout(originalBgColorOfAddContactBtnMobile, 800)
    doNotClose(event)
}

function originalBgColorOfAddContactBtnMobile() {
    document.getElementById('add-new-contact-btn-mobile').style.backgroundColor = '#2A3647'
}

function doNotClose(event) {
    event.stopPropagation()
}


document.addEventListener('DOMContentLoaded', () => {
    loadItems().then(() => {
        renderAssignees();
    });
});




