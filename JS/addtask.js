// Globale Variable
let title = null;
let description = null;
let dueDate = null;
let prio = null;
let subtasks = [];
let assignedTo = [];
let category = null;

let tasks = [];

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
    users.forEach(user => user.added = false); // Setzt den 'added'-Status jedes Benutzers zurück
    document.getElementById('dropdown-assignees').textContent = 'Select contacts to assign';
    updateSelectedAssigneesDisplay(); // Aktualisiert die Anzeige der ausgewählten Benutzer
    renderAssignees(); // Rendert die Benutzerliste im Dropdown neu

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

// Die anderen Inputfelder prüfen
function checkInputFields() {
    const title = document.getElementById('addtask-title');
    const dueDate = document.getElementById('dueDate');
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

function saveInputFields() {
    // Event-Listener für Titel
    const titleInput = document.getElementById('addtask-title');
    titleInput.addEventListener('input', () => {
        title = titleInput.value;
    });

    // Event-Listener für Beschreibung
    const descriptionInput = document.getElementById('description');
    descriptionInput.addEventListener('input', () => {
        description = descriptionInput.value;
    });

    // Event-Listener für das Fälligkeitsdatum
    const dueDateInput = document.getElementById('dueDate');
    dueDateInput.addEventListener('input', () => {
        dueDate = dueDateInput.value;
    });
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
    document.getElementById('create-task').addEventListener('click', async () => {
        if (!validateTaskForm()) {
            // Beendet die Funktion, wenn die Validierung fehlschlägt
            console.info('Vaidation failed. No Task created.');
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


function showTaskAddedMessage() {
    const messageElement = document.getElementById('create-task-message');
    messageElement.style.display = 'flex'; // Zeigt die Nachricht an

    // Nachricht nach einer gewissen Zeit ausblenden
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 1500); // Warte 1,5 Sekunden, bevor die Nachricht ausgeblendet wird
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
    setupAssigneeDropdownToggleListener();
    setupAssigneeGlobalClickListener();
    initCategoryDropdown();
    setupCategoryDropdownEventListeners();
});