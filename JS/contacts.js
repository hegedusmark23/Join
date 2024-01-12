let contacts = []

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
}

function emptyInputs() {
    let inputs = document.getElementsByTagName("input");
    for(let i = 0; i < inputs.length; i++){
        let inp = inputs[i]
        inp.value = '';
    }
    
}