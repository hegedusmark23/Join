// Globale Variable
let title = null;
let description = null;
let dueDate = null;
let prio = null;
let subtasks = [];
let assignedTo = [];
let category = null;

let tasks = [];

function clearAllInputs() {
    // Eingabefelder zurücksetzen
    document.getElementById('addtask-title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('dueDate').value = '';

    // Globale Variablen zurücksetzen
    title = null;
    description = null;
    dueDate = null;
    prio = null;

    // Dropdown zurücksetzen
    category = null; // Löscht die Auswahl in der Kategorie
    document.getElementById('dropdown-categories').textContent = 'Select task category';
    document.getElementById('dropdown-categories-error-msg').style.visibility = 'hidden'; // Fehlermeldung verbergen

    // Assignee-Dropdown zurücksetzen
    assignedTo = []; // Leert das Array der zugewiesenen Benutzer
    document.getElementById('dropdown-assignees').textContent = 'Select contacts to assign';
    
    // Aktualisiert die Anzeige der ausgewählten Benutzer
    updateSelectedAssigneesDisplay(); 

    // Rendert die Benutzerliste im Dropdown neu
    renderAssignees(); 

    // Setzt den 'added'-Status aller Kontakte zurück und aktualisiert die Anzeige
    resetAssigneeSelection();

    // Den visuellen Zustand des Dropdowns zurücksetzen
    const dropdownContent = document.getElementById('category');
    dropdownContent.style.display = 'none'; // Schließt das Dropdown
    toggleCategoryDropdownArrows(true); // Setzt die Pfeile zurück auf den "geschlossenen" Zustand

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

// Funktion, die den 'added'-Status aller Kontakte zurücksetzt
function resetAssigneeSelection() {
    // Durchläuft den letterContainer und setzt den 'added'-Status jedes Kontakts zurück
    Object.values(letterContainer).forEach(contacts => {
        contacts.forEach(contact => {
            contact.added = false; // Setzt den Zustand zurück
        });
    });

    // Leert das Array der zugewiesenen Benutzer
    assignedTo = [];

    // Rendert die Benutzerliste im Dropdown neu, um den zurückgesetzten Zustand widerzuspiegeln
    renderAssignees();

    // Aktualisiert die Anzeige der ausgewählten Benutzer
    updateSelectedAssigneesDisplay();
}


// Die anderen Inputfelder prüfen
function checkInputFields() {
    const title = document.getElementById('addtask-title');
    const dueDate = document.getElementById('dueDate');
    const titleErrorMsg = document.getElementById('title-error-msg');
    const dueDateErrorMsg = document.getElementById('duedate-error-msg');
    let titleFocused = false;
    let dueDateFocused = false;

    // Überprüfe, ob alle benötigten Elemente existieren
    if (!title || !dueDate || !titleErrorMsg || !dueDateErrorMsg) {
        console.warn('Eines oder mehrere benötigte Elemente für checkInputFields() fehlen im DOM.');
        return; // Bricht die Ausführung ab, wenn ein Element fehlt
    }

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

function saveInputFields() {
    // Event-Listener für Titel
    const titleInput = document.getElementById('addtask-title');
    if (titleInput) {
        titleInput.addEventListener('input', () => {
            title = titleInput.value;
        });
    } else {
        console.warn('Titel-Inputfeld nicht gefunden.');
    }

    // Event-Listener für Beschreibung
    const descriptionInput = document.getElementById('description');
    if (descriptionInput) {
        descriptionInput.addEventListener('input', () => {
            description = descriptionInput.value;
        });
    } else {
        console.warn('Beschreibungs-Inputfeld nicht gefunden.');
    }

    // Event-Listener für das Fälligkeitsdatum
    const dueDateInput = document.getElementById('dueDate');
    if (dueDateInput) {
        dueDateInput.addEventListener('input', () => {
            dueDate = dueDateInput.value;
        });
    } else {
        console.warn('Fälligkeitsdatum-Inputfeld nicht gefunden.');
    }
}

async function loadTasks() {
    try {
        const storedTasks = await getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
        }
        showTasks();
    } catch (error) {
        console.error('Fehler beim Laden der Tasks:', error);
    }
}

async function createTask() {
    const createTaskButton = document.getElementById('create-task');
    if (!createTaskButton) {
        console.warn('Create-Task-Button wurde nicht im DOM gefunden.');
        return; // Beendet die Funktion frühzeitig, wenn das Button-Element nicht existiert
    }

    createTaskButton.addEventListener('click', async () => {
        if (!validateTaskForm()) {
            // Beendet die Funktion, wenn die Validierung fehlschlägt
            console.info('Validation failed. No Task created.');
            return;
        }

        // Erstellen einer neuen Task-Instanz
        let newTask = new Task(
            Date.now(), // Eindeutige ID
            title,
            description,
            assignedTo,
            dueDate,
            prio,
            new Date().toISOString(), // Erstellungsdatum
            STORAGE_TOKEN // Storage-Token
        );

        // Hinzufügen von Kategorie und Subtasks
        newTask.category = category;
        newTask.subtask = subtasks;

        try {
            // Hinzufügen des neuen Tasks zum Array
            tasks.push(newTask);

            // Speichern des aktualisierten Arrays
            await setItem('tasks', JSON.stringify(tasks));

            console.log('Task erfolgreich gespeichert');
            // Animation starten
            showTaskAddedMessage();
            clearAllInputs();
        } catch (error) {
            console.error('Fehler beim Speichern des Tasks:', error);
        }
    });
}

function validateTaskForm() {
    let isValid = true;

    // Titel validieren
    const titleInput = document.getElementById('addtask-title');
    if (titleInput.value.trim() === "") {
        document.getElementById('title-error-msg').style.visibility = 'visible';
        isValid = false;
    } else {
        document.getElementById('title-error-msg').style.visibility = 'hidden';
    }

    // Fälligkeitsdatum validieren
    const dueDateInput = document.getElementById('dueDate');
    if (dueDateInput.value.trim() === "") {
        document.getElementById('duedate-error-msg').style.visibility = 'visible';
        isValid = false;
    } else {
        document.getElementById('duedate-error-msg').style.visibility = 'hidden';
    }

    // Kategorie validieren
    if (!category) { // Nehmen an, dass 'category' global oder irgendwo gesetzt wird
        document.getElementById('dropdown-categories-error-msg').style.visibility = 'visible';
        isValid = false;
    } else {
        document.getElementById('dropdown-categories-error-msg').style.visibility = 'hidden';
    }

    return isValid;
}


function showTaskAddedMessage(fromModal = false) {
    const messageElement = document.getElementById('create-task-message');
    if (messageElement) {
        messageElement.style.display = 'flex'; // Zeigt die Nachricht an

        // Wenn die Funktion aus dem Modal heraus aufgerufen wird, passe die Klasse entsprechend an
        if (fromModal) {
            messageElement.classList.add('no-background'); // Angenommen, 'no-background' entfernt den dunklen Hintergrund
        } else {
            messageElement.classList.remove('no-background');
        }

        // Nachricht nach einer gewissen Zeit ausblenden
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 3000); // Warte 1,5 Sekunden, bevor die Nachricht ausgeblendet wird
    } else {
        console.error('Element für Task-Hinzugefügt-Nachricht wurde nicht gefunden.');
    }
}

async function showTasks() {
    console.log('Das sind die Tasks in meinem Array: ', tasks);
}

document.addEventListener('DOMContentLoaded', () => {
    checkInputFields();
    saveInputFields();
    loadTasks();
    createTask();

    // addtaskFormHandling.js

    handlePrioButtons();
    inputSubtask();
    addSubTask();
    setupEventListenersSubtasks();
    renderAssignees();
    setupAssigneeGlobalClickListener();
    setupAssigneeDropdownToggleListener();
    initCategoryDropdown();
    setupCategoryDropdownEventListeners();
});