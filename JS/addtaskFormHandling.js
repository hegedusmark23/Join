/**
 * Repräsentiert die aktuell ausgewählte oder zu bearbeitende Aufgabe.
 * @type {Task}
 */
let currentTask = new Task();

/**
 * Gibt an, ob ein Dropdown-Menü angeklickt wurde, um seinen Zustand zu steuern.
 * @type {boolean}
 */
let dropdownClicked = false;

/**
 * Initialisiert Event-Listener für Prioritäts-Buttons.
 */
function handlePrioButtons() {
    const prioButtons = document.querySelectorAll('.addtask-buttons');
    const colors = getPrioColors();

    prioButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            handlePrioButtonClick(event, prioButtons, colors);
        });
    });
}

/**
 * Gibt die Farbkodierungen für verschiedene Prioritäten zurück.
 * @returns {Object} Ein Objekt mit Farbwerten für jede Priorität.
 */
function getPrioColors() {
    return {
        urgent: '#ff3d00',
        medium: '#ffa800',
        low: '#7ae229'
    };
}

/**
 * Verarbeitet Klick-Events auf Prioritäts-Buttons.
 * @param {Event} event - Das Klick-Event.
 * @param {NodeListOf<Element>} prioButtons - Liste aller Prioritäts-Buttons.
 * @param {Object} colors - Farben für jede Priorität.
 */
function handlePrioButtonClick(event, prioButtons, colors) {
    const button = event.target;
    const priority = button.id.replace('addtask-prio-', '');

    toggleButtonActiveState(button, prioButtons, colors, priority);
}

/**
 * Wechselt den Aktivzustand des angeklickten Buttons und aktualisiert die Priorität.
 * @param {Element} button - Der angeklickte Button.
 * @param {NodeListOf<Element>} prioButtons - Liste aller Prioritäts-Buttons.
 * @param {Object} colors - Farben für jede Priorität.
 * @param {string} priority - Die Priorität, die dem Button entspricht.
 */
function toggleButtonActiveState(button, prioButtons, colors, priority) {
    if (button.classList.contains('is-active')) {
        deactivateButtons(prioButtons);
        prio = null; // Setze die globale Variable 'prio' zurück
    } else {
        activateButton(button, prioButtons, colors[priority]);
        prio = priority; // Aktualisiere die globale Variable 'prio'
    }
}

/**
 * Deaktiviert alle Prioritäts-Buttons.
 * @param {NodeListOf<Element>} buttons - Liste der Buttons.
 */
function deactivateButtons(buttons) {
    buttons.forEach(btn => {
        btn.classList.remove('is-active');
        btn.style.backgroundColor = '';
    });
}

/**
 * Aktiviert einen spezifischen Button und setzt die Farbe basierend auf der Priorität.
 * @param {Element} button - Der zu aktivierende Button.
 * @param {NodeListOf<Element>} buttons - Liste aller Buttons, um sie zu deaktivieren.
 * @param {string} color - Die Farbe, die dem Button zugewiesen werden soll.
 */
function activateButton(button, buttons, color) {
    deactivateButtons(buttons);
    button.classList.add('is-active');
    button.style.backgroundColor = color;
}


/**
 * Initialisiert das Verhalten des Eingabefeldes für Subtasks.
 * 
 * Diese Funktion fügt Event-Listener zum Subtask-Eingabefeld und dem Clear-Button hinzu.
 * Bei Fokussierung des Eingabefeldes werden bestimmte Icons angezeigt und beim Klicken des Clear-Buttons
 * wird das Feld geleert und die Icons zurückgesetzt. Die Funktion überprüft auch, ob alle relevanten
 * Elemente im DOM vorhanden sind.
 */
function inputSubtask() {
    let inputField = document.getElementById('subtask');
    let clearButton = document.querySelector('.first-img-container');
    let iconsBefore = document.querySelector('.subtask-icons-before');
    let iconsAfter = document.querySelector('.subtask-icons-after');
    if (inputField && clearButton && iconsBefore && iconsAfter) {
        inputField.addEventListener('focus', () => { // Event-Listener für den Fokus auf das Inputfeld
            iconsBefore.style.display = 'none';
            iconsAfter.style.display = 'flex';
        });
        clearButton.addEventListener('click', () => {  // Event-Listener für das Clear-Button
            inputField.value = '';
            setTimeout(() => {
                iconsBefore.style.display = 'block';
                iconsAfter.style.display = 'none';
                inputField.blur();
            }, 10); // Kleine Verzögerung von 10 Millisekunden
        });
    } else {
        console.info('Eines oder mehrere Subtask-bezogene Elemente wurden nicht im DOM gefunden.');
    }
}

/**
 * Fügt einem Subtask hinzu und initialisiert das Verhalten des "Add"-Buttons und des Eingabefeldes.
 * 
 * Diese Funktion fügt Event-Listener zum "Add"-Button und zum Subtask-Eingabefeld hinzu. Beim Klicken des
 * "Add"-Buttons oder beim Drücken der Return-Taste im Eingabefeld wird eine neue Subtask hinzugefügt.
 * Die Funktion überprüft auch, ob der "Add"-Button und das Eingabefeld im DOM vorhanden sind.
 */
function addSubTask() {
    let addButton = document.querySelector('.second-img-container');
    let inputField = document.getElementById('subtask');
    if (addButton && inputField) {
        addButton.addEventListener('click', renderSubtask); // Event-Listener für den "Add"-Button
        inputField.addEventListener('keypress', (event) => { // Event-Listener für das Drücken der Return-Taste im Eingabefeld
            if (event.keyCode === 13 || event.which === 13) {
                event.preventDefault(); // Verhindert das standardmäßige Verhalten der Return-Taste
                renderSubtask();
            }
        });
    } else {
        console.info('Eines oder mehrere Elemente für das Hinzufügen von Subtasks wurden nicht im DOM gefunden.');
    }
}

/**
 * Verarbeitet die Eingabe eines Subtasks, erstellt ein neues Subtask-Objekt,
 * fügt es zur Liste hinzu und stellt es im DOM dar.
 */
function renderSubtask() {
    let inputField = document.getElementById('subtask');
    let newSubtaskText = inputField.value.trim();
    if (newSubtaskText) {
        let newSubtask = createSubtaskObject(newSubtaskText);
        subtasks.push(newSubtask);
        addSubtaskToDOM(newSubtask);
    }
    inputField.value = ''; // Leeren des Inputfeldes
    setTimeout(resetSubtaskField, 0); // Verzögertes Zurücksetzen des Inputfeldes und der Icons
}

/**
 * Erstellt ein Subtask-Objekt mit einer eindeutigen ID und dem eingegebenen Text.
 * @param {string} text - Der Text des neuen Subtasks.
 * @returns {Object} Das erstellte Subtask-Objekt.
 */
function createSubtaskObject(text) {
    return {
        id: Date.now(), // Erzeugt eine einfache eindeutige ID
        text: text,
        completed: null // Initialzustand: nicht abgeschlossen
    };
}

/**
 * Fügt ein Subtask-Objekt zum DOM hinzu.
 * @param {Object} subtask - Das Subtask-Objekt, das hinzugefügt werden soll.
 */
function addSubtaskToDOM(subtask) {
    let listContainer = document.getElementById('subtasks-list-container').querySelector('ul');
    let newLi = document.createElement('li');
    newLi.dataset.subtaskId = subtask.id;
    newLi.innerHTML = `
        <div class="subtask-item-wrapper">
            <p>${subtask.text}</p>
            <div class="subtask-icons">
                <img class="edit-subtask" src="./assets/img/edit_task.png">
                <img class="divider-subtask" src="./assets/img/divider_small.png">
                <img class="delete-subtask" src="./assets/img/delete-subtask.svg">
            </div>
        </div>
    `;
    listContainer.appendChild(newLi);
}

/**
 * Setzt das Eingabefeld für Subtasks und die dazugehörigen Icons zurück.
 */
function resetSubtaskField() {
    let inputField = document.getElementById('subtask');
    let iconsBefore = document.querySelector('.subtask-icons-before');
    let iconsAfter = document.querySelector('.subtask-icons-after');
    inputField.value = '';
    iconsBefore.style.display = 'block';
    iconsAfter.style.display = 'none';
    inputField.blur()
}

/**
 * Aktiviert den Bearbeitungsmodus für einen spezifischen Subtask.
 * @param {HTMLElement} liElement - Das Listenelement, das den Subtask repräsentiert.
 */
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

/**
 * Speichert die Änderungen an einem Subtask und aktualisiert die Darstellung.
 * @param {HTMLElement} liElement - Das Listenelement, das den Subtask repräsentiert.
 */
function saveSubtask(liElement) {
    let inputElement = liElement.querySelector('input.input-subtask');
    let newSubtaskText = inputElement.value;
    let subtaskId = liElement.dataset.subtaskId;
    liElement.classList.remove('edit-mode');
    let subtaskIndex = subtasks.findIndex(subtask => subtask.id.toString() === subtaskId);
    if (subtaskIndex !== -1) {
        subtasks[subtaskIndex].text = newSubtaskText;
    }
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

/**
 * Initialisiert Event-Listener für Subtask-Aktionen wie Löschen, Bearbeiten und Speichern.
 */
function setupEventListenersSubtasks() {
    let listContainer = getSubtaskListContainer();
    if (!listContainer) return;

    setupDeleteSubtaskListener(listContainer);
    setupEditSubtaskListener(listContainer);
    setupSaveSubtaskListener(listContainer);
    setupDoubleClickToEditListener(listContainer);
}

/**
 * Ermittelt und gibt das Container-Element für Subtasks zurück.
 * @returns {HTMLElement | null} Das UL-Element, das die Subtasks enthält, oder null, wenn es nicht gefunden wurde.
 */
function getSubtaskListContainer() {
    let listContainerElement = document.getElementById('subtasks-list-container');
    if (!listContainerElement) {
        console.info('Container für Subtasks wurde nicht im DOM gefunden.');
        return null;
    }
    let listContainer = listContainerElement.querySelector('ul');
    if (!listContainer) {
        console.info('UL-Element für Subtasks wurde nicht im DOM gefunden.');
        return null;
    }
    return listContainer;
}

/**
 * Fügt einen Event-Listener für das Löschen von Subtasks hinzu.
 * @param {HTMLElement} listContainer - Der Container, der die Subtask-Listenelemente enthält.
 */
function setupDeleteSubtaskListener(listContainer) {
    listContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-subtask')) {
            deleteSubtask(event, listContainer);
        }
    });
}

/**
 * Fügt einen Event-Listener für das Bearbeiten von Subtasks hinzu.
 * @param {HTMLElement} listContainer - Der Container, der die Subtask-Listenelemente enthält.
 */
function setupEditSubtaskListener(listContainer) {
    listContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-subtask')) {
            let liToEdit = event.target.closest('li');
            if (liToEdit) editSubtask(liToEdit);
        }
    });
}

/**
 * Fügt einen Event-Listener für das Speichern von Subtasks hinzu.
 * @param {HTMLElement} listContainer - Der Container, der die Subtask-Listenelemente enthält.
 */
function setupSaveSubtaskListener(listContainer) {
    listContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('save-subtask')) {
            let liToSave = event.target.closest('li');
            if (liToSave) saveSubtask(liToSave);
        }
    });
}

/**
 * Fügt einen Event-Listener hinzu, um Subtasks durch Doppelklicken zu bearbeiten.
 * @param {HTMLElement} listContainer - Der Container, der die Subtask-Listenelemente enthält.
 */
function setupDoubleClickToEditListener(listContainer) {
    listContainer.addEventListener('dblclick', function(event) {
        let liToEdit = event.target.closest('li');
        if (liToEdit && !liToEdit.classList.contains('edit-mode')) {
            editSubtask(liToEdit);
        }
    });
}

/**
 * Behandelt das Löschen eines Subtasks.
 * @param {Event} event - Das Click-Event, das die Löschaktion ausgelöst hat.
 * @param {HTMLElement} listContainer - Der Container, der die Subtask-Listenelemente enthält.
 */
function deleteSubtask(event, listContainer) {
    let liToDelete = event.target.closest('li');
    if (liToDelete && listContainer.contains(liToDelete)) {
        let subtaskId = liToDelete.dataset.subtaskId;
        if (subtaskId) {
            subtasks = subtasks.filter(subtask => subtask.id.toString() !== subtaskId);
        }
        listContainer.removeChild(liToDelete);
    }
}

// Assignee DropDown

/**
 * Schaltet das Dropdown-Menü für Zuweisungen um und steuert die Anzeige der Pfeil-Icons.
 */
function toggleAssigneeDropdown() {
    let dropdownContent = document.getElementById('assign-to');
    let isDropdownOpen = dropdownContent.style.display === 'block';
    dropdownContent.style.display = isDropdownOpen ? 'none' : 'block';

    // Pfeil-Icons umschalten
    let arrowsDown = document.querySelectorAll('.arrowDown');
    let arrowsUp = document.querySelectorAll('.arrowUp');
    arrowsDown.forEach(arrow => arrow.style.display = isDropdownOpen ? 'block' : 'none');
    arrowsUp.forEach(arrow => arrow.style.display = isDropdownOpen ? 'none' : 'block');
}

/**
 * Aktualisiert den Zuweisungsstatus eines Benutzers und die Anzeige der ausgewählten Benutzer.
 * @param {Object} user - Das Benutzerobjekt, dessen Zuweisungsstatus aktualisiert werden soll.
 */
function updateAssignee(user) {
    if (user.added) {
        if (!assignedTo.includes(user.name)) { // Benutzer hinzufügen, wenn er noch nicht im Array ist
            assignedTo.push(user.name);
        }
    } else {
        assignedTo = assignedTo.filter(name => name !== user.name); // Benutzer entfernen, wenn er im Array ist
    }
    updateSelectedAssigneesDisplay();
}

/**
 * Fügt dem Dropdown-Button einen Event-Listener hinzu, um das Dropdown-Menü für Zuweisungen zu steuern.
 * Schließt das Dropdown-Menü, wenn außerhalb des Dropdown-Bereichs geklickt wird.
 */
function setupAssigneeGlobalClickListener() {
    const dropdownContent = document.getElementById('assign-to');
    const dropdownButton = document.getElementById('dropdown-assignees');
    if (!dropdownContent || !dropdownButton) {
        console.info('Dropdown-Elemente wurden nicht im DOM gefunden.');
        return; // Beendet die Funktion frühzeitig, wenn die Elemente nicht existieren
    }
    document.addEventListener('click', function(event) {
        let isClickInsideDropdown = dropdownButton.contains(event.target) || dropdownContent.contains(event.target);

        if (!isClickInsideDropdown && dropdownContent.style.display === 'block') {
            toggleAssigneeDropdown(); // Schließt das Dropdown, wenn außerhalb geklickt wird
        }
    });
}

/**
 * Aktualisiert den 'added'-Status eines Benutzers im letterContainer und assignedTo Array.
 * @param {string|object} letter - Der Buchstabe des Kontakts oder ein Objekt mit letter und index.
 * @param {number} index - Der Index des Kontakts im letterContainer.
 */
function updateAssigneeStatus(letter, index) {
    if (typeof letter === 'object' && letter !== null) { // Überprüfung, ob der erste Parameter ein Objekt ist
        index = letter.index;
        letter = letter.letter;
    }
    const contact = letterContainer[letter][index];
    contact.added = !contact.added;

    updateAssignedTo(contact);
}

/**
 * Fügt den Kontakt dem assignedTo Array hinzu oder entfernt ihn.
 * @param {Object} contact - Das Kontaktobjekt.
 */
function updateAssignedTo(contact) {
    const foundIndex = assignedTo.findIndex(c => c.name === contact.completeName);
    if (contact.added) {
        if (foundIndex === -1) {
            assignedTo.push({
                name: contact.completeName,
                initials: generateInitials(contact.completeName),
                color: contact.badgeColor
            });
        }
    } else {
        if (foundIndex !== -1) {
            assignedTo.splice(foundIndex, 1);
        }
    }
}

/**
 * Hauptfunktion zum Umschalten des 'added'-Status eines Benutzers und Neu-Rendern der Anzeige.
 * @param {string|object} letter - Der Buchstabe des Kontakts oder ein Objekt mit letter und index.
 * @param {number} index - Der Index des Kontakts im letterContainer.
 */
function toggleAssigneeStatus(letter, index) {
    updateAssigneeStatus(letter, index); // Aktualisiert den 'added'-Status
    updateSelectedAssigneesDisplay(); // Aktualisiert die Anzeige der ausgewählten Benutzer
    renderAssignees(); // Rendert die Benutzerliste im Dropdown neu
}

// Initialen generieren
function generateInitials(completeName) {
    const nameParts = completeName.split(' ');
    const initials = nameParts.map(part => part[0]).join('');
    return initials.toUpperCase();
}

// Rendert die Benutzerliste im Dropdown-Menü
function renderAssignees() {
    let dropdownContent = document.getElementById('assign-to');
    if (!dropdownContent) {
        console.info('Dropdown-Container für Assignees wurde nicht im DOM gefunden.');
        return; // Beendet die Funktion frühzeitig, wenn das Element nicht existiert
    }

    dropdownContent.innerHTML = ''; // Löscht den aktuellen Inhalt

    Object.keys(letterContainer).forEach(letter => {
        letterContainer[letter].forEach((contact, index) => {
            const initials = generateInitials(contact.completeName); // Initialen generieren
            let userContainer = document.createElement('div');
            userContainer.className = 'dropdown-content-container' + (contact.added ? ' user-checked' : '');

            // Erstellung des Checkbox SVG basierend auf dem 'added' Zustand
            const checkboxSVG = contact.added ? 
                `<svg id="checkbox-checked-active" style="display:block" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.3882 11V17C20.3882 18.6569 19.045 20 17.3882 20H7.38818C5.73133 20 4.38818 18.6569 4.38818 17V7C4.38818 5.34315 5.73133 4 7.38818 4H15.3882" stroke="#fff" stroke-width="2" stroke-linecap="round"></path>
                    <path d="M8.38818 12L12.3882 16L20.3882 4.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>` : 
                `<svg id="checkbox-unchecked-normal" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4.38818" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"></rect>
                </svg>`;

            userContainer.innerHTML = `
                <div class="dropdown-content-binding">
                    <div class="dropdown-content-circle" style="background-color:${contact.badgeColor};">
                        <p id="user-initials">${initials}</p>
                    </div>
                    <div class="dropdown-content-name">
                        <a id="user-name" href="#" data-value="option${index + 1}">${contact.completeName}</a>
                    </div>
                </div>
                <div class="dropdown-content-checkbox">${checkboxSVG}</div>
            `;

            // Event-Listener für den Klick hinzufügen
            userContainer.addEventListener('click', function() {
                toggleAssigneeStatus(letter, index, contact);
            });

            dropdownContent.appendChild(userContainer);
        });
    });
}

// Event-Listener für den Dropdown-Button einrichten
function setupAssigneeDropdownToggleListener() {
    let dropdownButton = document.getElementById('dropdown-assignees');
    if (!dropdownButton) {
        console.info('Dropdown-Button für Assignees wurde nicht im DOM gefunden.');
        return; // Beendet die Funktion frühzeitig, wenn das Element nicht existiert
    }

    dropdownButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Verhindert das Schließen des Dropdowns beim Klicken auf den Button
        toggleAssigneeDropdown();
    });
}

// Aktualisiert die Anzeige der ausgewählten Benutzer
function updateSelectedAssigneesDisplay() {
    let selectedAssigneesDiv = document.getElementById('selected-assignees');
    selectedAssigneesDiv.innerHTML = ''; // Löscht den aktuellen Inhalt

    Object.values(letterContainer).forEach(contacts => {
        contacts.forEach(contact => {
            if (contact.added) {
                const initials = generateInitials(contact.completeName);
                let assigneeCircle = document.createElement('div');
                assigneeCircle.className = 'dropdown-content-circle';
                assigneeCircle.style.backgroundColor = contact.badgeColor;
                assigneeCircle.textContent = initials;

                selectedAssigneesDiv.appendChild(assigneeCircle);
            }
        });
    });
}

// Category DropDown
function initCategoryDropdown() {
    let dropdownContent = document.getElementById('category');
    if (!dropdownContent) {
        console.info('Dropdown-Container für Kategorien wurde nicht im DOM gefunden.');
        return; // Beendet die Funktion frühzeitig, wenn das Element nicht existiert
    }

    let categories = ['Technical Task', 'User Story'];
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
    const dropdownCategoriesButton = document.getElementById('dropdown-categories');
    if (!dropdownCategoriesButton) {
        console.info('Dropdown-Button für Kategorien wurde nicht im DOM gefunden.');
        return; // Beendet die Funktion frühzeitig, wenn das Button-Element nicht existiert
    }

    // Hinzufügen des Event-Listeners zum Dropdown-Button
    dropdownCategoriesButton.addEventListener('click', toggleCategoryDropdown);

    // Hinzufügen von Event-Listenern zu den Pfeilen (optional)
    // Stellen Sie sicher, dass die Pfeile existieren, bevor Sie versuchen, Event-Listener hinzuzufügen
    document.querySelectorAll('.arrowDown, .arrowUp').forEach(arrow => {
        if (arrow) {
            arrow.addEventListener('click', toggleCategoryDropdown);
        }
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




    