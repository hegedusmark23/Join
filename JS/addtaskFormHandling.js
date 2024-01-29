// Zustandsvariablen
let dropdownClicked = false;

// Prio Buttons steuern
function handlePrioButtons() {
    const prioButtons = document.querySelectorAll('.addtask-buttons');
    const colors = {
        urgent: '#ff3d00',
        medium: '#ffa800',
        low: '#7ae229'
    };

    prioButtons.forEach(button => {
        button.addEventListener('click', function handleClick(event) {
            const button = event.target;
            const priority = button.id.replace('addtask-prio-', '');

            if (button.classList.contains('is-active')) {
                button.classList.remove('is-active');
                button.style.backgroundColor = '';
                prio = null; // Wenn kein Button aktiv ist, ist die Priorität nicht gesetzt
            } else {
                prioButtons.forEach(btn => {
                    btn.classList.remove('is-active');
                    btn.style.backgroundColor = '';
                });
                button.classList.add('is-active');
                button.style.backgroundColor = colors[priority];
                prio = priority; // Aktualisiere die globale Variable 'prio'
            }
        });
    });
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

function addSubTask() {
    // Event-Listener für den "Add"-Button
    let addButton = document.querySelector('.second-img-container');
    addButton.addEventListener('click', renderSubtask);

    // Event-Listener für das Drücken der Return-Taste im Eingabefeld
    let inputField = document.getElementById('subtask');
    inputField.addEventListener('keypress', (event) => {
        if (event.keyCode === 13 || event.which === 13) {
            event.preventDefault(); // Verhindert das standardmäßige Verhalten der Return-Taste
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
    let subtaskId = liElement.dataset.subtaskId;
    liElement.classList.remove('edit-mode'); // Entfernt die Klasse

    // Aktualisiere das subtasks-Array
    let subtaskIndex = subtasks.findIndex(subtask => subtask.id.toString() === subtaskId);
    if (subtaskIndex !== -1) {
        subtasks[subtaskIndex].text = newSubtaskText;
    }

    // Aktualisiere die Anzeige
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
// Assignee DropDown
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

// Category DropDown
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




    