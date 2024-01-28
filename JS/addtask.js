// Test Array
let users = [
    { initials: "AM", name: "Anton Mayer", added: null, loginState: "loggedIn" },
    { initials: "SH", name: "Sahrah Huber", added: null, loginState: null },
    { initials: "PS", name: "Peter Schmitt", added: null, loginState: null },
    { initials: "TM", name: "Thomas Müller", added: null, loginState: null },
    { initials: "FS", name: "Frank Schulz", added: null, loginState: null },
    { initials: "BV", name: "Bert Vogel", added: null, loginState: null },
    { initials: "DZ", name: "Dominik Ziegler", added: null, loginState: null }
];

// Globale Variable
let title = null;
let description = null;
let assignedTo = [];
let dueDate = null;
let prio = null;
let category = null;
let subtasks = [];

// Zustandsvariablen
let dropdownClicked = false;

function initCategoryDropdown() {
    let categories = ['Technical Task', 'User Story'];
    let dropdownContent = document.getElementById('category');

    categories.forEach((category) => {
        let link = document.createElement('a');
        link.href = '#';
        link.textContent = category;
        link.addEventListener('click', function(event) {
            event.preventDefault();
            selectCategory(this.textContent);
        });
        dropdownContent.appendChild(link);
    });
}

function selectCategory(categoryName) {
    let dropdownButton = document.getElementById('dropdown-categories');
    dropdownButton.textContent = categoryName;
    toggleDropdown();
    
    category = categoryName; // Speichert die ausgewählte Kategorie
    validateDropdownSelection(); // Validiert die Auswahl
}

// Toggle-Funktion für Dropdowns
function toggleDropdownDirectly() {
    let dropdownContent = document.getElementById('category');
    let isOpen = dropdownContent.style.display === 'block';

    dropdownContent.style.display = isOpen ? 'none' : 'block';

    // Umkehren des aktuellen Zustands der Pfeile basierend auf dem neuen Zustand des Dropdowns
    // Dies muss möglicherweise deinem aktuellen Setup entsprechend angepasst werden.
    const arrowsDown = document.querySelectorAll('.arrowDown');
    const arrowsUp = document.querySelectorAll('.arrowUp');
    arrowsDown.forEach(arrow => arrow.style.display = isOpen ? 'block' : 'none');
    arrowsUp.forEach(arrow => arrow.style.display = isOpen ? 'none' : 'block');
    
    if (!isOpen) {
        validateDropdownSelection();
    }
}

// Funktion zum Setup der Event-Listener für Dropdown
function setupDropdownEventListeners() {
    // Hinzufügen des Event-Listeners zum Dropdown-Button
    document.getElementById('dropdown-categories').addEventListener('click', toggleDropdownDirectly);

    // Hinzufügen von Event-Listenern zu den Pfeilen (optional)
    document.querySelectorAll('.arrowDown, .arrowUp').forEach(arrow => {
        arrow.addEventListener('click', toggleDropdownDirectly);
    });
}

function validateDropdownSelection() {
    let errorMsg = document.getElementById('dropdown-categories-error-msg');
    if (category) {
        errorMsg.style.visibility = 'hidden';
    } else {
        errorMsg.style.visibility = 'visible';
    }
}

// Schaltet die Pfeil- und Hintergrundicons beim Öffnen/Schließen des Dropdowns
function toggleDropdownArrows(isOpen) {
    const arrowsDown = document.querySelectorAll('.arrowDown');
    const arrowsUp = document.querySelectorAll('.arrowUp');

    arrowsDown.forEach(arrow => {
        arrow.style.display = isOpen ? 'block' : 'none';
    });

    arrowsUp.forEach(arrow => {
        arrow.style.display = isOpen ? 'none' : 'block';
    });
}

function clearAllInputs() {
    // Eingabefelder zurücksetzen
    document.getElementById('addtask-title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('due-date').value = '';

    // Dropdown zurücksetzen
    category = null; // Löscht die Auswahl in der Kategorie
    document.getElementById('dropdown-categories').textContent = 'Select task category';
    document.getElementById('dropdown-categories-error-msg').style.visibility = 'hidden'; // Fehlermeldung verbergen

    // Den visuellen Zustand des Dropdowns zurücksetzen
    const dropdownContent = document.getElementById('category');
    dropdownContent.style.display = 'none'; // Schließt das Dropdown
    toggleDropdownArrows(true); // Setzt die Pfeile zurück auf den "geschlossenen" Zustand

    // Subtasks aus dem Array und dem DOM löschen
    subtasks = []; // Löscht alle Subtasks, falls vorhanden
    const subtasksList = document.querySelector('#subtasks-list-container ul');
    if (subtasksList) {
        subtasksList.innerHTML = ''; // Entfernt alle Subtask-Listenelemente aus dem DOM
    }
    
    // Prioritäts-Buttons zurücksetzen
    const prioButtons = document.querySelectorAll('.addtask-buttons');
    prioButtons.forEach(button => {
        button.classList.remove('is-active');
        button.style.backgroundColor = '';
    });

    // Subtask Feld zurücksetzen
    const inputField = document.getElementById('subtask');
    inputField.value = '';
    document.querySelector('.subtask-icons-before').style.display = 'block';
    document.querySelector('.subtask-icons-after').style.display = 'none';

    // Fehlermeldungen für andere Felder zurücksetzen
    document.getElementById('title-error-msg').style.visibility = 'hidden';
    document.getElementById('duedate-error-msg').style.visibility = 'hidden';
}

// Die anderen Inputfelder prüfen
function checkInputFields() {
    const title = document.getElementById('addtask-title');
    const dueDate = document.getElementById('due-date');
    const titleErrorMsg = document.getElementById('title-error-msg');
    const dueDateErrorMsg = document.getElementById('duedate-error-msg');
    let titleFocused = false;
    let dueDateFocused = false;

    title.addEventListener('focus', () => {
        titleFocused = true;
    });

    title.addEventListener('blur', () => {
        if (title.value.trim() === "" && titleFocused) {
            titleErrorMsg.style.visibility = 'visible';
        } else {
            titleErrorMsg.style.visibility = 'hidden';
        }
    });

    dueDate.addEventListener('focus', () => {
        dueDateFocused = true;
    });

    dueDate.addEventListener('blur', () => {
        if (dueDate.value.trim() === "" && dueDateFocused) {
            dueDateErrorMsg.style.visibility = 'visible';
        } else {
            dueDateErrorMsg.style.visibility = 'hidden';
        }
    });
}

// Prio Buttons steuern
function handlePrioButtons(){
    // Prio Buttons einfärben und is-active setzen bzw. entfernen
    const prioButtons = document.querySelectorAll('.addtask-buttons');
    const colors = {
        urgent: '#ff3d00',
        medium: '#ffa800',
        low: '#7ae229'
    };

    // Iteriere durch jeden Button und füge den Event-Listener hinzu
    prioButtons.forEach(button => {
        button.addEventListener('click', handleClick);
    });

    function handleClick(event) {
        const button = event.target;

        // Überprüfen, ob der geklickte Button bereits 'is-active' hat
        if (button.classList.contains('is-active')) {
            button.classList.remove('is-active');
            button.style.backgroundColor = '';
        } else {
            prioButtons.forEach(btn => {
                btn.classList.remove('is-active');
                btn.style.backgroundColor = '';
            });
            button.classList.add('is-active');
            const priority = button.id.replace('addtask-prio-', '');
            button.style.backgroundColor = colors[priority];
        }
    }
}

// Subtasks
function inputSubtask() {
    let inputField = document.getElementById('subtask');
    let clearButton = document.querySelector('.first-img-container');
    let iconsBefore = document.querySelector('.subtask-icons-before');
    let iconsAfter = document.querySelector('.subtask-icons-after');

    // Event-Listener für den Fokus auf das Inputfeld
    inputField.addEventListener('focus', () => {
        iconsBefore.style.display = 'none';
        iconsAfter.style.display = 'flex';
    });

    // Event-Listener für das Clear-Button
    clearButton.addEventListener('click', () => {
        inputField.value = '';
        setTimeout(() => {
            iconsBefore.style.display = 'block';
            iconsAfter.style.display = 'none';
            inputField.blur();
        }, 10); // Kleine Verzögerung von 10 Millisekunden
    });
    
}

function addSubTask(){
    // Event-Listener für den Button hinzufügen
    let addButton = document.querySelector('.second-img-container');
    addButton.addEventListener('click', renderSubtask);

    // Event-Listener für das Enter-Ereignis im Inputfeld hinzufügen
    let inputField = document.getElementById('subtask');
    inputField.addEventListener('keypress', (event) => {
        if (event.keyCode === 13 || event.which === 13) { // Unterstützung für unterschiedliche Browser
            renderSubtask();
        }
    });
}

function renderSubtask() {
    let inputField = document.getElementById('subtask');
    let newSubtaskText = inputField.value.trim();

    // Fügt nur ein neues Listenelement hinzu, wenn Text vorhanden ist
    if (newSubtaskText) {
        let newSubtask = {
            id: Date.now(), // Erzeugt eine einfache eindeutige ID
            text: newSubtaskText
        };
        subtasks.push(newSubtask);

        // Erstellen des neuen Listenelements
        let newLi = document.createElement('li');
        newLi.dataset.subtaskId = newSubtask.id; // Speichert die ID im Dataset des li-Elements
        newLi.innerHTML = `
            <div class="subtask-item-wrapper">
                <p>${newSubtaskText}</p>
                <div class="subtask-icons">
                    <img class="edit-subtask" src="./assets/img/edit_task.png">
                    <img class="divider-subtask" src="./assets/img/divider_small.png">
                    <img class="delete-subtask" src="./assets/img/delete-subtask.svg">
                </div>
            </div>
        `;

        // Hinzufügen des neuen Listenelements zum UL-Container
        let listContainer = document.getElementById('subtasks-list-container').querySelector('ul');
        listContainer.appendChild(newLi);
    }

    // Leeren des Inputfeldes
    inputField.value = '';
    // Verzögertes Zurücksetzen des Inputfeldes und der Icons
    setTimeout(resetSubtaskField, 0);
}


function resetSubtaskField() {
    let inputField = document.getElementById('subtask');
    let iconsBefore = document.querySelector('.subtask-icons-before');
    let iconsAfter = document.querySelector('.subtask-icons-after');

    inputField.value = '';
    iconsBefore.style.display = 'block';
    iconsAfter.style.display = 'none';

    inputField.blur()
}

// Funktion zum Bearbeiten des Subtasks
function editSubtask(liElement) {
    let subtaskText = liElement.querySelector('p').textContent;
    liElement.classList.add('edit-mode'); // Fügt die Klasse hinzu, um den Bullet Point auszublenden

    liElement.innerHTML = `
        <div class="subtask-item-wrapper-edit">
            <input id="subtask-edit-input" class="input-subtask" type="text" value="${subtaskText}">
            <div class="subtask-icons-edit">
                <img class="delete-subtask" src="./assets/img/delete-subtask.svg">
                <img class="divider-subtask" src="./assets/img/divider_small.png">
                <img class="save-subtask" src="./assets/img/check-small.png">
            </div>
        </div>
    `;
}

// Funktion zum Speichern des Subtasks
function saveSubtask(liElement) {
    let inputElement = liElement.querySelector('input.input-subtask');
    let newSubtaskText = inputElement.value;
    liElement.classList.remove('edit-mode'); // Entfernt die Klasse

    liElement.innerHTML = `
        <div class="subtask-item-wrapper">
            <p>${newSubtaskText}</p>
            <div class="subtask-icons">
                <img class="edit-subtask" src="./assets/img/edit_task.png">
                <img class="divider-subtask" src="./assets/img/divider_small.png">
                <img class="delete-subtask" src="./assets/img/delete-subtask.svg">
            </div>
        </div>
    `;
}

function setupEventListenersSubtasks() {
    // Event-Listener für das Löschen von Subtasks und Doppelklicken auf Subtasks hinzufügen
    let listContainer = document.getElementById('subtasks-list-container').querySelector('ul');

    listContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-subtask')) {
            let liToDelete = event.target.closest('li');
            if (liToDelete) {
                // Überprüft, ob eine ID für den Subtask vorhanden ist
                let subtaskId = liToDelete.dataset.subtaskId;
                if (subtaskId) {
                    // Aktualisiert das subtasks-Array, indem der gelöschte Subtask entfernt wird
                    subtasks = subtasks.filter(subtask => subtask.id.toString() !== subtaskId);
                }

                // Entfernt das <li>-Element aus dem DOM
                listContainer.removeChild(liToDelete);
            }
        }
    });

    // Event-Listener für das Doppelklicken auf Subtasks hinzufügen
    listContainer.addEventListener('dblclick', (event) => {
        let liToEdit = event.target.closest('li');
        if (liToEdit && !liToEdit.classList.contains('edit-mode')) {
            editSubtask(liToEdit);
        }
    });

    listContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-subtask')) {
            let liToDelete = event.target.closest('li');
            if (liToDelete && listContainer.contains(liToDelete)) {
                // Überprüfen, ob wir uns im Bearbeitungsmodus befinden
                let inputElement = liToDelete.querySelector('.input-subtask');
                let subtaskText;
                if (inputElement) {
                    // Im Bearbeitungsmodus, verwenden Sie den Wert des Input-Elements
                    subtaskText = inputElement.value;
                } else {
                    // Nicht im Bearbeitungsmodus, verwenden Sie den Text aus dem <p>-Element
                    let pElement = liToDelete.querySelector('p');
                    subtaskText = pElement ? pElement.textContent : '';
                }
    
                // Entfernen Sie den Subtask aus dem Array, wenn nötig
                subtasks = subtasks.filter(subtask => subtask !== subtaskText);
    
                listContainer.removeChild(liToDelete);
            }
        }

        // Überprüfen, ob der geklickte Button der Bearbeiten-Button ist
        if (event.target.classList.contains('edit-subtask')) {
            let liToEdit = event.target.closest('li');
            if (liToEdit) {
                editSubtask(liToEdit);
            }
        }

        // Überprüfen, ob der geklickte Button der Speichern-Button ist
        if (event.target.classList.contains('save-subtask')) {
            let liToSave = event.target.closest('li');
            if (liToSave) {
                saveSubtask(liToSave);
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initCategoryDropdown();
    checkInputFields();
    handlePrioButtons();
    inputSubtask();
    addSubTask();
    setupEventListenersSubtasks();
    setupDropdownEventListeners();
});