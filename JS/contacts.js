
let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ä', 'Ö', 'Ü',];
let letterContainer = {};
let colors = ['9327FF', '6E52FF', 'FC71FF', 'FFBB2B', '1FD7C1']
let firstLetter;
let capitalizedLetters;

alphabet.forEach((letter) => {
    letterContainer[letter] = [];
})

async function renderContact() {
    await loadItems();
    setLettersContainers();
}

async function loadItems() {
    try {
        letterContainer = JSON.parse(await getItem('contacts'));
    } catch (e) {
        console.warn(e);
    }
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
        getShowContactHTML(i, key, cont, contact, casualColor);
    }
}



async function getContact() {
    let completeName = document.getElementById('name').value;
    let emailAdress = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    firstLetter = completeName.charAt(0).toUpperCase();
    addContacts(completeName, emailAdress, phone)
}

async function addContacts(completeName, emailAdress, phone) {
    let contact = new Contact(completeName, emailAdress, phone);
    if (alphabet.includes(firstLetter)) {
        letterContainer[firstLetter].push(contact);
        await setItem('contacts', JSON.stringify(letterContainer));
    }
    await renderContact();
    emptyInputs();
    hideAddContactOverlay();
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

function showContactOnclick(key, i) {
    let contactViewContainer = document.getElementById('contact-view-container');
    let name = letterContainer[key][i]['completeName'];
    let email = letterContainer[key][i]['email'];
    let phone = letterContainer[key][i]['phone'];
    capitalizeLetters(name);
    contactViewContainer.innerHTML = /*html*/ `
    <div class="contact-view-name-container">
        <div class="contact-view-badge-container">
          <span class="contact-view-badge">${capitalizedLetters}</span>
        </div>
        <div class="contact-view-edit-delete-container">
            <h2 class="contact-view-name">${name}</h2>
            <div class="contact-view-icons-container">
              <span class="contact-view-edit-container">
                <img src="./assets/icons/pen.svg" alt="">Edit
              </span> 
              <span class="contact-view-delete-container">
                <img src="./assets/icons/trashbin.svg" alt="">Delete
              </span>
            </div>
        </div>
    </div>
    <h3>Contact Information</h3>
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
    
    contactViewContainer.classList.remove('translateX')
}

function backgroundBlackAndWhiteText(key, i) {
    document.getElementById(`under-container${key}${i}`).classList.add('black-container');
    document.getElementById(`contact-list-name${key}${i}`).style.color = '#fff';
    document.getElementById(`contact-list-email${key}${i}`).style.color = '#fff';
}

function backgroundAndTextOriginal(key, i) {
    document.getElementById(`under-container${key}${i}`).classList.remove('black-container');
    document.getElementById(`contact-list-name${key}${i}`).style.color = '#000';
    document.getElementById(`contact-list-email${key}${i}`).style.color = '#'
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