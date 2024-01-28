let assignedTo = [];
let category = null;

// Zustandsvariablen
let dropdownClicked = false;

// Test Array
let users = [
    { initials: "AM", name: "Anton Mayer", added: false, loginState: "loggedIn", color: "#FF5733" },
    { initials: "SH", name: "Sahrah Huber", added: false, loginState: null, color: "#9df400 " },
    { initials: "PS", name: "Peter Schmitt", added: false, loginState: null, color: "#FFC300" },
    { initials: "TM", name: "Thomas Müller", added: false, loginState: null, color: "#581845" },
    { initials: "FS", name: "Frank Schulz", added: false, loginState: null, color: "#C70039" },
    { initials: "BV", name: "Bert Vogel", added: false, loginState: null, color: "#900C3F" },
    { initials: "DZ", name: "Dominik Ziegler", added: false, loginState: null, color: "#34495E" }
];

// Schaltet das Dropdown-Menü um und steuert die Anzeige der Pfeil-Icons
function toggleAssigneeDropdown() {
    let dropdownContent = document.getElementById('assign-to');
    let isDropdownOpen = dropdownContent.style.display === 'block';
    dropdownContent.style.display = isDropdownOpen ? 'none' : 'block';

    let arrowsDown = document.querySelectorAll('.arrowDown');
    let arrowsUp = document.querySelectorAll('.arrowUp');
    arrowsDown.forEach(arrow => arrow.style.display = isDropdownOpen ? 'block' : 'none');
    arrowsUp.forEach(arrow => arrow.style.display = isDropdownOpen ? 'none' : 'block');
}

// Aktualisiert den Zuweisungsstatus eines Benutzers und aktualisiert die Anzeige
function updateAssignee(user) {
    if (user.added) {
        // Benutzer hinzufügen, wenn er noch nicht im Array ist
        if (!assignedTo.includes(user.name)) {
            assignedTo.push(user.name);
        }
    } else {
        // Benutzer entfernen, wenn er im Array ist
        assignedTo = assignedTo.filter(name => name !== user.name);
    }

    updateSelectedAssigneesDisplay();
}

// Fügt dem Dropdown-Button einen Event-Listener hinzu, um das Dropdown-Menü zu steuern
function setupAssigneeDropdownToggleListener() {
    let dropdownButton = document.getElementById('dropdown-assignees');
    dropdownButton.addEventListener('click', toggleAssigneeDropdown);
}

// Richtet einen globalen Event-Listener ein, um das Dropdown-Menü zu schließen, wenn außerhalb geklickt wird
function setupAssigneeGlobalClickListener() {
    document.addEventListener('click', function(event) {
        let dropdownContent = document.getElementById('assign-to');
        let dropdownControl = document.getElementById('dropdown-assignees').parentNode;

        if (!dropdownControl.contains(event.target) && dropdownContent.style.display === 'block') {
            dropdownContent.style.display = 'none';
            let arrowsDown = document.querySelectorAll('.arrowDown');
            let arrowsUp = document.querySelectorAll('.arrowUp');
            arrowsDown.forEach(arrow => arrow.style.display = 'block');
            arrowsUp.forEach(arrow => arrow.style.display = 'none');
        }
    });
}

// Ändert den 'added'-Status eines Benutzers und rendert die Benutzerliste neu
function toggleAssigneeStatus(index) {
    users[index].added = !users[index].added;
    updateAssignee(users[index]);
    renderAssignees();
}

// Rendert die Benutzerliste im Dropdown-Menü
function renderAssignees() {
    let dropdownContent = document.getElementById('assign-to');
    dropdownContent.innerHTML = ''; // Löscht den aktuellen Inhalt

    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        let userContainer = document.createElement('div');
        userContainer.className = 'dropdwon-content-container' + (user.added ? ' user-checked' : '');

        userContainer.innerHTML = `
            <div class="dropdown-content-binding">
                <div class="dropdown-content-circle" style="background-color:${user.color};">
                    <p id="user-initials">${user.initials}</p>
                </div>
                <div class="dropdown-content-name">
                    <a id="user-name" href="#" data-value="option${i + 1}">${user.name}</a>
                </div>
            </div>
            <div class="dropdown-content-checkbox">
                ${user.added ? `
                <svg id="checkbox-checked-active" style="display:block" width="25" height="24"
                    viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.3882 11V17C20.3882 18.6569 19.045 20 17.3882 20H7.38818C5.73133 20 4.38818 18.6569 4.38818 17V7C4.38818 5.34315 5.73133 4 7.38818 4H15.3882"
                        stroke="#fff" stroke-width="2" stroke-linecap="round" />
                    <path d="M8.38818 12L12.3882 16L20.3882 4.5" stroke="#fff" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>` : `
                <svg id="checkbox-unchecked-normal" width="25" height="24" viewBox="0 0 25 24"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4.38818" y="4" width="16" height="16" rx="3" stroke="#2A3647"
                        stroke-width="2" />
                </svg>`}
            </div>
        `;

        // Event-Listener für den Klick hinzufügen
        userContainer.addEventListener('click', function() {
            toggleAssigneeStatus(i);
        });

        dropdownContent.appendChild(userContainer);
    }
}

// Aktualisiert die Anzeige der ausgewählten Benutzer
function updateSelectedAssigneesDisplay() {
    let selectedAssigneesDiv = document.getElementById('selected-assignees');
    selectedAssigneesDiv.innerHTML = ''; // Löscht den aktuellen Inhalt

    users.forEach(user => {
        if (user.added) {
            let assigneeCircle = document.createElement('div');
            assigneeCircle.className = 'dropdown-content-circle';
            assigneeCircle.style.backgroundColor = user.color;
            assigneeCircle.textContent = user.initials;

            selectedAssigneesDiv.appendChild(assigneeCircle);
        }
    });
}

//! Category Dropdown

function initCategoryDropdown() {
    let categories = ['Technical Task', 'User Story'];
    let dropdownContent = document.getElementById('category');

    categories.forEach((category) => {
        let link = document.createElement('a');
        link.href = '#';
        link.textContent = category;
        link.addEventListener('click', function(event) {
            event.preventDefault();
            selectCategoryItem(this.textContent);
        });
        dropdownContent.appendChild(link);
    });
}

function selectCategoryItem(categoryName) {
    let dropdownButton = document.getElementById('dropdown-categories');
    dropdownButton.textContent = categoryName;
    toggleCategoryDropdown();
    
    category = categoryName; // Speichert die ausgewählte Kategorie
    validateCategorySelection(); // Validiert die Auswahl
}

// Toggle-Funktion für das Kategorie-Dropdown
function toggleCategoryDropdown() {
    let dropdownContent = document.getElementById('category');
    let isOpen = dropdownContent.style.display === 'block';

    dropdownContent.style.display = isOpen ? 'none' : 'block';

    toggleCategoryDropdownArrows(isOpen);
    
    if (!isOpen) {
        validateCategorySelection();
    }
}

// Funktion zum Setup der Event-Listener für Dropdown
function setupCategoryDropdownEventListeners() {
    // Hinzufügen des Event-Listeners zum Dropdown-Button
    document.getElementById('dropdown-categories').addEventListener('click', toggleCategoryDropdown);

    // Hinzufügen von Event-Listenern zu den Pfeilen (optional)
    document.querySelectorAll('.arrowDown, .arrowUp').forEach(arrow => {
        arrow.addEventListener('click', toggleCategoryDropdown);
    });
}

function validateCategorySelection() {
    let errorMsg = document.getElementById('dropdown-categories-error-msg');
    if (category) {
        errorMsg.style.visibility = 'hidden';
    } else {
        errorMsg.style.visibility = 'visible';
    }
}

// Schaltet die Pfeil- und Hintergrundicons beim Öffnen/Schließen des Dropdowns
function toggleCategoryDropdownArrows(isOpen) {
    const arrowsDown = document.querySelectorAll('.arrowDown');
    const arrowsUp = document.querySelectorAll('.arrowUp');

    arrowsDown.forEach(arrow => arrow.style.display = isOpen ? 'block' : 'none');
    arrowsUp.forEach(arrow => arrow.style.display = isOpen ? 'none' : 'block');
}

document.addEventListener('DOMContentLoaded', () => {
    renderAssignees();
    setupAssigneeDropdownToggleListener();
    setupAssigneeGlobalClickListener();
    initCategoryDropdown();
    setupCategoryDropdownEventListeners();
});


    