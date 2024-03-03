//! Prio Buttons

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

//! Subtasks

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