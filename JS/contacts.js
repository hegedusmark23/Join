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

/**
 *   This function creates a key-value property in the lettersContainer object for each letter contained in the alphabet array, where each key is an empty array
 * @param {string} letter - the parameter "letter" contains the letter that is iterated from the alphabet array
*/
alphabet.forEach((letter) => {
    letterContainer[letter] = [];
})


/**
 * This asynchronous function includes the header and the sidebar in the addcontacts.html page. With the function loadItems, all contacts previously saved in the remote storage are then transferred and inserted back into the json "lettersContainer" after reversing text to code. Finally, the setLettersContainers() function iterates the keys of the lettersContainer array into the "contact-list" container to display the letters A to Z in the contact list;
 */
async function renderContact() {
    includeHTML();
    await loadItems();
    await setLettersContainers();
}

/**
 * This function retrieves the contact data from the remote storage and converts it from text to code in order to insert it into the letterContainer array
 */
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

/**
 * This function takes a random color from the colors array, takes the data (full name, email and phone number) from the contact form and finally calls the addContacts() function;
 */
async function getContact() {
    let color = Math.floor(Math.random() * colors.length);
    let completeName = document.getElementById('name').value;
    let emailAdress = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    badgeColor = colors[color]
    firstLetter = completeName.charAt(0).toUpperCase();
    addContacts(completeName, emailAdress, phone, badgeColor);
}

/**
 * This asynchronous function creates an instance of the Contact{} class to which the following parameters are assigned: Contact name, email, phone number and contact badge color.
 * After the new Contact{} object has been created, it is inserted into the Json array letterContainer in the key whose letter corresponds to the first letter of the newly created contact
 * The new state of the letterContainer array is then saved in the remote storage
 * If the screen width is less than 1050 px, i.e. if the user is using a cell phone or tablet, hide the contact list and only display the container with the newly created contact 
 * Otherwise, if the width is greater than 1050 px, the contact is displayed in the container without HTML elements being hidden.
 * Finally, the page is reloaded with the renderContacts() function to reload the Json array letterContainer with the new contact and display it on the page, all form inputs are cleared and the "Add Contacts" pop-up window is hidden
 * @param {string} completeName - Complete contact name;
 * @param {string} emailAdress - Contact's E-Mail address;
 * @param {string} phone - Contact's phone number
 * @param {string} badgeColor - Contact's badge color;
 * @param {string} firstLetter - global variable that contains the first letter of each newly created contact.
 * @param {number} windowWidth - Current width of the user screen
 */

async function addContacts(completeName, emailAdress, phone, badgeColor) {
    let contact = new Contact(completeName, emailAdress, phone, badgeColor);
    letterContainer[firstLetter].push(contact);
    await setItem('contacts', JSON.stringify(letterContainer));
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

/**
 * This function takes all the input fields by tag name and empties them
 */
function emptyInputs() {
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i]
        input.value = '';
    }
}

/**
 * This function runs through the Json array letterContainer and creates a container for each key with the letter title assigned to the current key. The keys in the array are now containers that contain the contact with the first letter that corresponds to the container name
 */
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

/**
 * This function runs through the array of the current key and shows all contacts with the initial letter corresponding to the key in the sub-container.
 * @param {string} key - Schlüssel des letterContainer-Objekts, das einem Buchstaben entspricht
 */

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

/**
 * This function checks whether the email address of each iterated contact is longer than 21 characters. If the screen width is less than or equal to 400 pixels and the length of the email is greater than 21, the email is truncated and three ellipses are added to the email string
 * @param {string} key - parameter corresponding to the main container in which the contact is contained
 * @param {number} i - Index of each contact contained in the main letter container
 */

function truncEmailMobile(key, i) {
    let email = document.getElementById(`contact-list-email${key}${i}`)
    let emailText = email.innerText;
    if (emailText.length > 21 && windowWidth <= 400) {
        let truncedEmail = emailText.slice(0, 21);
        email.innerText = truncedEmail + '...'
    }
}

/**
 * This function takes the two initials of the contact's full name
 * @param {string} completeName -Contact's complete name
 */
function capitalizeLetters(completeName) {
    let name = completeName.split(" ");
    let words = name.map((word) => {
        return word.charAt(0);
    });
    capitalizedLetters = words.join("");

}

/**
 * This function shows the selected contact in the contact view
 * @param {string} key - parameter corresponding to the main container in which the contact is contained
 * @param {number} i - Index of each contact contained in the main letter container
 */
function showContact(key, i) {
    let name = letterContainer[key][i]['completeName'];
    let email = letterContainer[key][i]['email'];
    let phone = letterContainer[key][i]['phone'];
    badgeColor = letterContainer[key][i]['badgeColor'];
    capitalizeLetters(name);
    let contactViewContainer = document.getElementById('contact-view-container')
    contactViewContainer.innerHTML = contactViewContainerHTML(key, i, name, email, phone, badgeColor);
    contactViewContainer.classList.remove('translateX');
    document.getElementById('contact-book').classList.add('mobile-d-none')
    document.getElementById('contact-view-section').classList.remove('mobile-d-none');
}


/**
 * This function is only for the mobile version. Hides the contact view and only shows the contact list
 */
function backToContactList() {
    document.getElementById('contact-book').classList.remove('mobile-d-none')
    document.getElementById('contact-view-section').classList.add('mobile-d-none')
}

/**
 * This function is only for the mobile version. By clicking on the button with the ellipsis icon at the bottom right, a small drop-down menu appears with two options: Edit and Delete
 * @param {object} event 
 */
function showPopUpEditDelete(event) {
    document.getElementById('contact-view-icons-container-mobile').classList.remove('translateXPopUpEditDelete');
    document.getElementById('three-vertical-dots-container').style.backgroundColor = '#29ABE2';
    event.stopPropagation();
}

/**
 * This function is only for the mobile version. Click anywhere in the "Contact view" section to hide the drop-down menu
 * @param {object} event 
 */
function hidePopUpEditDelete(event) {
    document.getElementById('contact-view-icons-container-mobile').classList.add('translateXPopUpEditDelete');
    setTimeout(removeBgColorOnPopUpClosed, 800);
    event.stopPropagation();
}

/**
 * This function removes the light blue background color after 800 milliseconds
 */
function removeBgColorOnPopUpClosed() {
    document.getElementById('three-vertical-dots-container').style.backgroundColor = '#2A3647';
}

/**
 * This function displays the newly created contact in the contact view
 */
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
    successfulContactAddedButton();
}

/**
 * This function displays a small banner in the translation and a few milliseconds after a new contact has been created, stating that the contact has been successfully created
 */
function successfulContactAddedButton() {
    let successButton = document.getElementById('successfulButton');
    setTimeout(() => {
        if (windowWidth <= 420) {
            successButton.classList.remove('translateSuccButtonMobile')
        } else {
            successButton.classList.remove('translateSuccButton');
        }
    }, 700)

    setTimeout(hideSuccessfulContactAddedButton, 3000);
}

/**
 * this function moves the banner with the message that the contact has been successfully created out of the viewport again
 */

function hideSuccessfulContactAddedButton() {
    let successButton = document.getElementById('successfulButton');
    if (windowWidth <= 420) {
        successButton.classList.add('translateSuccButtonMobile')
    } else {
        successButton.classList.add('translateSuccButton');
    }
}

/**
 * This function displays the pop-up window for editing or deleting the contact
 * @param {string} key - parameter corresponding to the main container in which the contact is contained
 * @param {number} i - Index of each contact contained in the main letter container
 */
function showEditContactOverlay(key, i) {
    createEditDialogContainer(key, i)
    let name = letterContainer[key][i]['completeName'];
    let email = letterContainer[key][i]['email'];
    let phone = letterContainer[key][i]['phone'];
    badgeColor = letterContainer[key][i]['badgeColor'];
    capitalizeLetters(name);
    let editContactOverlay = document.getElementById(`edit-contact-overlay${key}${i}`);
    editContactOverlay.classList.remove('d-none');
    editContactOverlay.innerHTML = editContactOverlayHTML(key, i,);
    getTheInputs(key, i);
    displayTheContactDataInTheInputs(name, email, phone, badgeColor);
    translateContactDialogPopUpInside(`${key}`, `${i}`)
}

function createEditDialogContainer(key, i) {
    let mainContainer = document.getElementById('add-contacts-contents');
    mainContainer.innerHTML += /*html*/ `
    <div onclick="hideEditContactOverlay('${key}',${i}, event)" id="edit-contact-overlay${key}${i}" class="contact-bg-dialog d-none"></div>
    `
}

/**
 * This function retrieves the value of the input in the "Edit Contact" pop-up window
 * @param {string} key - parameter corresponding to the main container in which the contact is contained
 * @param {number} i - Index of each contact contained in the main letter container
 */
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

/**
 * This function moves the pop-up from outside the dialog to the inside and creates an animation
 * @param {string} key - parameter corresponding to the main container in which the contact is contained
 * @param {number} i - Index of each contact contained in the main letter container
 */

function translateContactDialogPopUpInside(key, i) {
    setTimeout(() => {
        document.getElementById(`contact-dialog${key}${i}`).classList.remove('translateContactDialogPopUp');
    }, 10);
}

/**
 * This function moves the pop-up window from inside the dialog to outside and hides it
 * @param {string} key - parameter corresponding to the main container in which the contact is contained
 * @param {number} i - Index of each contact contained in the main letter container
 */

function hideEditContactOverlay(key, i, event) {
    document.getElementById(`contact-dialog${key}${i}`).classList.add('translateContactDialogPopUp');
    setTimeout(() => {
        document.getElementById(`edit-contact-overlay${key}${i}`).classList.add('d-none');
    }, 500);
    doNotClose(event)
}

/**
 * This function saves the new data entered in the "Edit Contact" form and creates a new contact with this new data
 * @param {string} key - parameter corresponding to the main container in which the contact is contained
 * @param {number} i - Index of each contact contained in the main letter container
 */
async function saveNewContact(key, i) {
    let contactViewContainer = document.getElementById('contact-view-container');
    contactViewContainer.classList.remove('translateX');
    letterContainer[key][i]['completeName'] = inputName.value;
    letterContainer[key][i]['email'] = inputEmail.value;
    letterContainer[key][i]['phone'] = inputPhone.value;
    letterContainer[key][i]['badgeColor'] = badgeColor;
    capitalizeLetters(inputName.value);
    await setItem('contacts', JSON.stringify(letterContainer));
    contactViewContainer.innerHTML = showAlreadyCreatedContactInTheViewHTML(i, key, capitalizedLetters, inputName.value, inputEmail.value, inputPhone.value, badgeColor);
    document.getElementById('edit-contact-overlay').classList.add('d-none');
    await renderContact();
}

/**
 * This function deletes the selected contact by clicking on it. If the screen width is 1050 pixels or less, it hides the contact view container and returns to the contact list, otherwise it empties the contact view container
 * @param {string} key - parameter corresponding to the main container in which the contact is contained
 * @param {number} i - Index of each contact contained in the main letter container
 */
async function deleteContact(key, i) {
    letterContainer[key].splice(i, 1);
    if (windowWidth <= 1050) {
        backToContactList();
    } else {
        document.getElementById('contact-view-container').innerHTML = '';
    }
    await setItem('contacts', JSON.stringify(letterContainer));
    renderContact();
    hideEditContactOverlay();
}


/**
 * If the contact container is in focus, the background is black and the text is white.
 * @param {string} key - parameter corresponding to the main container in which the contact is contained
 * @param {number} i - Index of each contact contained in the main letter container
 */
function backgroundBlackAndWhiteText(key, i) {
    document.getElementById(`under-container${key}${i}`).classList.add('black-container');
    document.getElementById(`contact-list-name${key}${i}`).style.color = '#fff';
    document.getElementById(`contact-list-email${key}${i}`).style.color = '#fff';
}

/**
 * If the contact container loses focus, the container returns to its original colors
 * @param {string} key - parameter corresponding to the main container in which the contact is contained
 * @param {number} i - Index of each contact contained in the main letter container
 */
function backgroundAndTextOriginal(key, i) {
    document.getElementById(`under-container${key}${i}`).classList.remove('black-container');
    document.getElementById(`contact-list-name${key}${i}`).style.color = '#000';
    document.getElementById(`contact-list-email${key}${i}`).style.color = '#29ABE2'
}

/**
 * This function displays the pop-up window with the form for creating a new contact
 */
function showAddContactOverlay() {
    document.getElementById('add-contact-overlay').classList.remove('d-none');
    document.getElementById('add-new-contact-btn').style.backgroundColor = '#29ABE2'
    document.getElementById('add-new-contact-btn-mobile').style.backgroundColor = '#29ABE2'
    setTimeout(() => {
        document.getElementById('contact-dialog').classList.remove('translateContactDialogPopUp');
    }, 10)
}

/**
 * This function hides the pop-up window with the form for creating a new contact
 */
function hideAddContactOverlay(event) {
    document.getElementById('contact-dialog').classList.add('translateContactDialogPopUp');
    setTimeout(() => {
        document.getElementById('add-contact-overlay').classList.add('d-none');
        document.getElementById('add-new-contact-btn').style.backgroundColor = '#2A3647';
        document.getElementById('add-new-contact-btn-mobile').style.backgroundColor = '#2A3647'
    }, 200)
    setTimeout(originalBgColorOfAddContactBtnMobile, 800);
    event.stopPropagation();
}

/**
 * This function restores the original color of the button after 800 milliseconds when the "Add contact" pop-up window is hidden
 */
function originalBgColorOfAddContactBtnMobile() {
    document.getElementById('add-new-contact-btn-mobile').style.backgroundColor = '#2A3647'
}

/**
 * This function cancels the forwarding of events to superordinate or subordinate containers
 * @param {object} event 
 */
function doNotClose(event) {
    event.stopPropagation()
}