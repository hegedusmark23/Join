
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
 *   Diese Funktion erstellt für jeden im Alphabet-Array enthaltenen Buchstaben eine Schlüssel-Wert-Eigenschaft im lettersContainer-Objekt, wobei jeder Schlüssel ein leeres Array ist
 * @param {string} letter - der Parameter letter enthält den Buchstaben, der aus dem Alphabet-Array iteriert wird
*/
alphabet.forEach((letter) => {
    letterContainer[letter] = [];
})


/**
 * Diese asynchrone Funktion schließt den Header und die Sidebar in die Seite addcontacts.html ein. Mit der Funktion loadItems werden dann alle zuvor im Remote Storage gespeicherten Kontakte übernommen und nach der Umkehrung von Text in Code wieder in den Json "lettersContainer" eingefügt. Schließlich iteriert die Funktion setLettersContainers() die Schlüssel des lettersContainer-Arrays in den Container "contact-list", um die Buchstaben A bis Z in der Kontaktliste anzuzeigen;
 */
async function renderContact() {
    includeHTML();
    await loadItems();
    await setLettersContainers();
}

/**
 * Diese Funktion holt die Kontaktdaten aus dem Remote Storage und wandelt sie von Text in Code um, um sie dann in das Array letterContainer einzufügen
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
 * Diese Funktion nimmt eine zufällige Farbe aus dem Array colors, nimmt die Daten (vollständiger Name, E-Mail und Telefonnummer) aus dem Kontaktformular und ruft schließlich die Funktion addContacts() auf;
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
 * Diese asynchrone Funktion erzeugt eine Instanz der Klasse Contact{}, der folgende Parameter zugewiesen werden: Kontaktname, E-Mail, Telefonnummer und Farbe des Kontaktabzeichens. 
 * Nachdem das neue Contact{}-Objekt erstellt wurde, wird es in das Json Array letterContainer eingefügt, und zwar in den Schlüssel, dessen Buchstabe dem Anfangsbuchstaben des neu erstellten Kontakts entspricht
 * Danach wird der neue Zustand des letterContainer-Arrays im Remote Storage gespeichert
 * Wenn die Bildschirmbreite weniger als 1050 px beträgt, das heisst wenn der Benutzer ein Handy oder ein Tablet verwendet, blenden Sie die Kontaktliste aus und zeigen Sie nur den Container mit dem neu erstellten Kontakt an. 
 * Andernfalls, wenn die Breite größer als 1050 px ist, wird der Kontakt im Container angezeigt, ohne dass HTML-Elemente ausgeblendet werden.
 * Schließlich wird die Seite mit der Funktion renderContacts() erneut geladen, um das Json-Array letterContainer mit dem neuen Kontakt neu zu laden und auf der Seite anzuzeigen, alle Formulareingaben werden geleert und das Pop-up-Fenster "Add Contacts" wird ausgeblendet
 * @param {string} completeName - vollständiger Kontaktname
 * @param {string} emailAdress - Kontakt-E-Mail-Adresse
 * @param {string} phone - Kontakt-Telefonnummer
 * @param {string} badgeColor - Farbe des Kontaktabzeichens
 * @param {string} firstLetter - globale Variable, die den Anfangsbuchstaben jedes neu erstellten Kontakts enthäl
 * @param {number} windowWidth - aktuelle Breite des Benutzerbildschirms
 */

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

/**
 * Diese Funktion nimmt alle die Inputsfelder nach Tag-Namen und leert sie
 */
function emptyInputs() {
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i]
        input.value = '';
    }
}

/**
 * Diese Funktion durchläuft das Json-Array letterContainer und erstellt für jeden Schlüssel einen Container mit dem dem aktuellen Schlüssel zugeordneten Buchstabentitel. Die Schlüssel im Array sind nun Container, die den Kontakt mit dem ersten Buchstaben enthalten, der dem Containernamen entspricht
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
 * diese Funktion durchläuft das Array des aktuellen Schlüssels und zeigt im Sub-Container alle Kontakte mit dem dem Schlüssel entsprechenden Anfangsbuchstaben
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
 * Diese Funktion prüft, ob die E-Mail-Adresse jedes iterierten Kontakts länger als 21 Zeichen ist. Wenn die Bildschirmbreite kleiner oder gleich 400 Pixel ist und die Länge der E-Mail größer als 21 ist, wird die E-Mail abgeschnitten und der E-Mail string werden drei Ellipsen hinzugefügt
 * @param {string} key - parameter, der dem Hauptcontainer entspricht, in dem der Kontakt enthalten ist
 * @param {number} i - Index jedes im Hauptcontainer enthaltenen Kontakts
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
 * Diese Funktion nimmt die beiden Initialen des vollständigen Namens des Kontakts
 * @param {string} completeName - Vollständiger Name des Kontakts
 */
function capitalizeLetters(completeName) {
    let name = completeName.split(" "); // mettere sempre uno spazio in mezzo quando si vuol creare due stringe intere separate
    let words = name.map((word) => {
        return word.charAt(0);
    });
    capitalizedLetters = words.join("");

}

/**
 * Diese Funktion zeigt den ausgewählten Kontakt in der Contact-View
 * @param {string} key - parameter, der dem Hauptcontainer entspricht, in dem der Kontakt enthalten ist
 * @param {number} i - Index jedes im Hauptcontainer enthaltenen Kontakts
 */
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

/**
 * Diese Funktion zeigt den ausgewählten Kontakt in der mobilen Version an
 * @param {string} key - parameter, der dem Hauptcontainer entspricht, in dem der Kontakt enthalten ist
 * @param {number} i - Index jedes im Hauptcontainer enthaltenen Kontakts 
 * @param {string} name - Name des ausgewählten Kontakts
 * @param {string} email - E-Mail des ausgewählten Kontakts
 * @param {string} phone - Phone des ausgewählten Kontakts
 * @param {string} badgeColor Farbe des Kontaktabzeichens des ausgewählten Kontakts
 */
function showContactMobileVersion(key, i, name, email, phone, badgeColor) {
    let contactViewContainer = document.getElementById('contact-view-container');
    document.getElementById('contact-book').classList.add('d-none')
    document.getElementById('contact-view-section').classList.remove('mobile-d-none');
    contactViewContainer.innerHTML = contactViewContainerHTML(key, i, name, email, phone, badgeColor);
    contactViewContainer.classList.remove('translateX');
}


/**
* Diese Funktion zeigt den ausgewählten Kontakt in der Desktop-Version an
* @param {string} key - parameter, der dem Hauptcontainer entspricht, in dem der Kontakt enthalten ist
* @param {number} i - Index jedes im Hauptcontainer enthaltenen Kontakts 
* @param {string} name - Name des ausgewählten Kontakts
* @param {string} email - E-Mail des ausgewählten Kontakts
* @param {string} phone - Phone des ausgewählten Kontakts
* @param {string} badgeColor Farbe des Kontaktabzeichens des ausgewählten Kontakts
*/
function showContactDesktopVersion(key, i, name, email, phone, badgeColor) {
    let contactViewContainer = document.getElementById('contact-view-container')
    contactViewContainer.innerHTML = contactViewContainerHTML(key, i, name, email, phone, badgeColor);
    contactViewContainer.classList.remove('translateX')
}

/**
 * Diese Funktion ist nur für die mobile Version. Blendet die Kontaktansicht aus und zeigt nur die Kontaktliste an
 */
function backToContactList() {
    document.getElementById('contact-view-section').classList.add('mobile-d-none');
    document.getElementById('contact-book').classList.remove('d-none')
}

/**
 * Diese Funktion ist nur für die mobile Version. Durch Klicken auf dem Button mit den Ellipsen Icon unten rechts erscheint ein kleines Dropdown-Menü mit zwei Optionen: Edit und Delete
 * @param {object} event 
 */
function showPopUpEditDelete(event) {
    document.getElementById('contact-view-icons-container').classList.remove('translateXPopUpEditDelete');
    document.getElementById('three-vertical-dots-container').style.backgroundColor = '#29ABE2';
    event.stopPropagation();
}

/**
 * Diese Funktion ist nur für die mobile Version. Durch Klicken auf eine beliebige Stelle im Abschnitt „Kontaktansicht“ wird das Dropdown-Menü ausgeblendet
 * @param {object} event 
 */
function hidePopUpEditDelete(event) {
    document.getElementById('contact-view-icons-container').classList.add('translateXPopUpEditDelete');
    setTimeout(removeBgColorOnPopUpClosed, 800);
    event.stopPropagation();
}

/**
 * Diese Funktion entfernt die hellblaue Hintergrundfarbe nach 800 Millisekunden
 */
function removeBgColorOnPopUpClosed() {
    document.getElementById('three-vertical-dots-container').style.backgroundColor = '#2A3647';
}

/**
 * Diese Funktion zeigt den neu angelegten Kontakt in der Kontaktansicht an
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
 * Diese Funktion zeigt in der Übersetzung und einige Millisekunden nach der Erstellung eines neuen Kontakts ein kleines Banner an, das besagt, dass der Kontakt erfolgreich erstellt wurde
 */
function successfulContactAddedButton() {
    let successButton = document.getElementById('successfulButton');
    setTimeout(()=> {
        if (windowWidth <= 420) {
            successButton.classList.remove('translateSuccButtonMobile')
        } else {
            successButton.classList.remove('translateSuccButton');
        }
    }, 700)

    setTimeout(hideSuccessfulContactAddedButton, 2000);
}

function hideSuccessfulContactAddedButton() {
    let successButton = document.getElementById('successfulButton');
    if (windowWidth <= 420) {
        successButton.classList.add('translateSuccButtonMobile')
    } else {
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
    translateContactDialogPopUpInside(`${key}`, `${i}`)
}

function translateContactDialogPopUpInside(key, i) {
    if (windowWidth > 1050) {
        setTimeout(() => {
            document.getElementById(`contact-dialog${key}${i}`).classList.remove('translateContactDialogPopUp');
        }, 10);
    } else {
        setTimeout(() => {
            document.getElementById(`contact-dialog${key}${i}`).classList.remove('translateContactDialogPopUp-Mobile');
        }, 10)
    }
}

function hideEditContactOverlay(key, i, event) {
    if (windowWidth > 1050) {
        document.getElementById(`contact-dialog${key}${i}`).classList.add('translateContactDialogPopUp');
        setTimeout(() => {
            document.getElementById('edit-contact-overlay').classList.add('d-none');
        }, 500)
    } else {
        document.getElementById(`contact-dialog${key}${i}`).classList.add('translateContactDialogPopUp-Mobile');
        setTimeout(() => {
            document.getElementById('edit-contact-overlay').classList.add('d-none');
        }, 200);
    }
    doNotClose(event)
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
    if (windowWidth <= 1050) {
        backToContactList();
    } else {
        document.getElementById('contact-view-container').innerHTML = '';
    }
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


function showAddContactOverlay() {
    if (windowWidth > 1050) {
        document.getElementById('add-contact-overlay').classList.remove('d-none');
        setTimeout(() => {
            document.getElementById('contact-dialog').classList.remove('translateContactDialogPopUp');
        }, 10)
    } else {
        document.getElementById('add-contact-overlay').classList.remove('d-none');
        setTimeout(() => {
            document.getElementById('contact-dialog').classList.remove('translateContactDialogPopUp-Mobile');
        }, 100)
        document.getElementById('add-new-contact-btn-mobile').style.backgroundColor = '#29ABE2'
    }
}

function hideAddContactOverlay() {
    if (windowWidth > 1050) {
        document.getElementById('contact-dialog').classList.add('translateContactDialogPopUp');
        setTimeout(() => {
            document.getElementById('add-contact-overlay').classList.add('d-none');
        }, 200)
    } else {
        document.getElementById('contact-dialog').classList.add('translateContactDialogPopUp-Mobile');
        setTimeout(() => {
            document.getElementById('add-contact-overlay').classList.add('d-none');
        }, 100)
        setTimeout(originalBgColorOfAddContactBtnMobile, 800);
    }
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

