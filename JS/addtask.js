// Globale Variable

let category = []
let subtasks = [];

// Category DropDown

function categoryDropdown() {
    let categories = ['Technical Task', 'User Story'];
    let dropdownContent = document.getElementById('category');
    let dropdownButton = document.getElementById('dropdown-categories');

    categories.forEach((category, index) => {
        let link = document.createElement('a');
        link.href = '#';
        link.dataset.value = 'option' + (index + 1);
        link.textContent = category;

        // Füge den Klick-Event-Listener direkt hier hinzu
        link.addEventListener('click', function(event) {
            event.preventDefault();
            dropdownButton.textContent = this.textContent;
            // Füge hier weitere Aktionen hinzu, falls nötig
            toggleDropdown();
        });

        dropdownContent.appendChild(link);
    });
}

function setupDropdown(dropdownButtonId, dropdownContentId, errorId, isRequired = false) {
    let isDropdownSelected = false;
    let hasDropdownBeenOpened = false;
    const dropdownButton = document.getElementById(dropdownButtonId);
    const dropdownContent = document.getElementById(dropdownContentId);
    const errorElement = errorId ? document.getElementById(errorId) : null;
    const arrowDown = dropdownButton.nextElementSibling.querySelector('.arrow-dropdown-down');
    const arrowUp = dropdownButton.nextElementSibling.querySelector('.arrow-dropdown-up');
    const iconBgDown = dropdownButton.nextElementSibling.querySelector('.icon-background-down');
    const iconBgUp = dropdownButton.nextElementSibling.querySelector('.icon-background-up');

    // Funktion zum Umschalten des Dropdowns
    function toggleDropdown() {
        const isOpen = dropdownContent.style.display === 'block';
        dropdownContent.style.display = isOpen ? 'none' : 'block';
        arrowDown.style.display = isOpen ? 'block' : 'none';
        arrowUp.style.display = isOpen ? 'none' : 'block';
        iconBgDown.style.display = isOpen ? 'block' : 'none';
        iconBgUp.style.display = isOpen ? 'none' : 'block';
    }

    // Funktion zum Schließen des Dropdowns
    function closeDropdown() {
        dropdownContent.style.display = 'none';
        arrowDown.style.display = 'block';
        arrowUp.style.display = 'none';
        iconBgDown.style.display = 'block';
        iconBgUp.style.display = 'none';
        if (isRequired && !isDropdownSelected && hasDropdownBeenOpened) {
            errorElement.style.display = 'block';
        } else {
            errorElement.style.display = 'none';
        }
    }

    // Event-Listener für das Öffnen und Schließen des Dropdowns
    dropdownButton.addEventListener('click', function(event) {
        event.stopPropagation();
        hasDropdownBeenOpened = true;
        toggleDropdown();
    });

    // Event-Listener für das Auswählen einer Option
    dropdownContent.addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            dropdownButton.textContent = event.target.textContent;
            isDropdownSelected = true;
            closeDropdown();
        }
    });

    // Event-Listener für das Klicken außerhalb des Dropdowns
    window.addEventListener('click', function(event) {
        if (!event.target.closest('.dropdown')) {
            closeDropdown();
        }
    });

    // Event-Listener für das Verlassen des Dropdown-Buttons (Blur-Event)
    dropdownButton.addEventListener('blur', function(event) {
        setTimeout(() => {
            if (!isDropdownSelected && isRequired && hasDropdownBeenOpened) {
                errorElement.style.display = 'block';
            } else {
                errorElement.style.display = 'none';
            }
        }, 100);
    });
}


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
            titleErrorMsg.style.display = 'block';
        } else {
            titleErrorMsg.style.display = 'none';
        }
    });

    dueDate.addEventListener('focus', () => {
        dueDateFocused = true;
    });

    dueDate.addEventListener('blur', () => {
        if (dueDate.value.trim() === "" && dueDateFocused) {
            dueDateErrorMsg.style.display = 'block';
        } else {
            dueDateErrorMsg.style.display = 'none';
        }
    });
}

function clearAllInputs(){
    
    // Eingabefelder zurücksetzten
    let title = document.getElementById('addtask-title');
    let description = document.getElementById('description');
    let dropdownAssigned = document.getElementById('dropdown-assignees');
    let dueDate = document.getElementById('due-date');
    let dropdownCategory = document.getElementById('dropdown-categories')
    
    title.value = '';
    description.value = '';
    dropdownAssigned.textContent = 'Select contacts to assign';
    dueDate.value = '';
    dropdownCategory.textContent = 'Select task category';

    // Prio Buttons zurücksetzen
    const prioButtons = document.querySelectorAll('.addtask-buttons');
    prioButtons.forEach(button => {
        button.classList.remove('is-active');
        button.style.backgroundColor = '';
    });

    // Fehlermeldungen zurücksetzen
    
    let titleErr = document.getElementById('title-error-msg');
    let dueDateErr = document.getElementById('duedate-error-msg');
    let catErr = document.getElementById('dropdown-categories-error-msg');

    titleErr.style.display = 'none';
    dueDateErr.style.display = 'none';
    setTimeout(() => {
        catErr.style.display = 'none';
    }, 0);

    // Subtaskfeld zurücksetzen

    let iconsBefore = document.querySelector('.subtask-icons-before');
    let iconsAfter = document.querySelector('.subtask-icons-after');
    let inputField = document.getElementById('subtask');
    iconsBefore.style.display = 'block';
    iconsAfter.style.display = 'none';
    inputField.value = '';

}

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

function setupEventListeners() {
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
    checkInputFields();
    // Funktion für Pflichtfeld-Dropdown
    setupDropdown('dropdown-categories', 'category', 'dropdown-categories-error-msg', true);
    // Funktion für optionales Dropdown
    setupDropdown('dropdown-assignees', 'assign-to', null);
    inputSubtask();
    addSubTask();
    setupEventListeners();
    categoryDropdown();

    // Prio Buttons einfärben und is-active setzten bzw. entfernen
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
            // Wenn ja, entferne 'is-active' und den Hintergrundstil
            button.classList.remove('is-active');
            button.style.backgroundColor = '';
        } else {
            // Entferne 'is-active' und den Hintergrundstil von allen Buttons
            prioButtons.forEach(btn => {
                btn.classList.remove('is-active');
                btn.style.backgroundColor = '';
            });
    
            // Füge 'is-active' zum geklickten Button hinzu und setze die Hintergrundfarbe
            button.classList.add('is-active');
            const priority = button.id.replace('addtask-prio-', '');
            button.style.backgroundColor = colors[priority];
        }
    }
    
});
