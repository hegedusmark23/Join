/**
 * Setzt Eingabefelder zurück.
 */
function resetInputFields() {
    document.getElementById('addtask-title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('dueDate').value = '';
}

/**
 * Setzt globale Variablen zurück.
 */
function resetGlobalVariables() {
    title = null;
    description = null;
    dueDate = null;
    prio = null;
    category = null; // Löscht die Auswahl in der Kategorie
    assignedTo = []; // Leert das Array der zugewiesenen Benutzer
}

/**
 * Setzt Dropdown-Felder und deren Zustände zurück.
 */
function resetDropdowns() {
    document.getElementById('dropdown-categories').textContent = 'Select task category';
    document.getElementById('dropdown-categories-error-msg').style.visibility = 'hidden';
    document.getElementById('dropdown-assignees').textContent = 'Select contacts to assign';
    const dropdownContent = document.getElementById('category');
    dropdownContent.style.display = 'none';
    toggleCategoryDropdownArrows(true);
}

/**
 * Setzt die Anzeige von Assignees und Subtasks zurück.
 */
function resetAssigneesAndSubtasks() {
    updateSelectedAssigneesDisplay();
    renderAssignees();
    resetAssigneeSelection();
    subtasks = [];
    const subtasksList = document.querySelector('#subtasks-list-container ul');
    if (subtasksList) {
        subtasksList.innerHTML = '';
    }
}

/**
 * Setzt die visuellen Zustände der UI-Elemente zurück.
 */
function resetUIElements() {
    const prioButtons = document.querySelectorAll('.addtask-buttons');
    prioButtons.forEach(button => {
        button.classList.remove('is-active');
        button.style.backgroundColor = '';
    });
    const inputField = document.getElementById('subtask');
    inputField.value = '';
    document.querySelector('.subtask-icons-before').style.display = 'block';
    document.querySelector('.subtask-icons-after').style.display = 'none';
    document.getElementById('title-error-msg').style.visibility = 'hidden';
    document.getElementById('duedate-error-msg').style.visibility = 'hidden';
}

/**
 * Setzt alle Eingaben und ausgewählten Zustände im Formular zurück.
 */
function clearAllInputs() {
    resetInputFields();
    resetGlobalVariables();
    resetDropdowns();
    resetAssigneesAndSubtasks();
    resetUIElements();
}

/**
 * Setzt den 'added'-Status aller Kontakte zurück und aktualisiert die UI entsprechend.
 * Diese Funktion durchläuft alle Kontakte im letterContainer und setzt deren 'added'-Status zurück.
 * Anschließend wird das Array der zugewiesenen Benutzer geleert und die UI-Elemente,
 * die die zugewiesenen Kontakte und deren Auswahlzustand darstellen, werden aktualisiert.
 */
function resetAssigneeSelection() {
    // Durchläuft den letterContainer und setzt den 'added'-Status jedes Kontakts zurück
    Object.values(letterContainer).forEach(contacts => {
        contacts.forEach(contact => {
            contact.added = false; // Setzt den Zustand zurück
        });
    });
    assignedTo = []; // Leert das Array der zugewiesenen Benutzer
    renderAssignees(); // Rendert die Benutzerliste im Dropdown neu, um den zurückgesetzten Zustand widerzuspiegeln
    updateSelectedAssigneesDisplay();    // Aktualisiert die Anzeige der ausgewählten Benutzer
}


/**
 * Fügt Event Listener für Fokus und Blur zu einem Eingabefeld hinzu.
 * @param {HTMLElement} inputElement - Das Eingabefeld, für das Listener hinzugefügt werden.
 * @param {HTMLElement} errorMsgElement - Das Element für Fehlermeldungen, das ein- oder ausgeblendet wird.
 */
function addFocusAndBlurListeners(inputElement, errorMsgElement) {
    let focused = false;
    inputElement.addEventListener('focus', () => {
        focused = true;
    });
    inputElement.addEventListener('blur', () => {
        // Zeigt die Fehlermeldung an, wenn das Feld leer ist und fokussiert wurde.
        errorMsgElement.style.visibility = inputElement.value.trim() === "" && focused ? 'visible' : 'hidden';
    });
}

/**
 * Überprüft, ob alle benötigten Eingabeelemente und Fehlermeldungselemente vorhanden sind.
 * @returns {boolean} Gibt zurück, ob alle Elemente vorhanden sind.
 */
function validateInputElements() {
    const elements = [
        document.getElementById('addtask-title'),
        document.getElementById('dueDate'),
        document.getElementById('title-error-msg'),
        document.getElementById('duedate-error-msg')
    ];
    if (elements.some(element => element === null)) {
        console.info('Eines oder mehrere benötigte Elemente für checkInputFields() fehlen im DOM.');
        return false;
    }
    return true;
}

/**
 * Überprüft die Eingabefelder und fügt entsprechende Event Listener hinzu.
 */
function checkInputFields() {
    if (!validateInputElements()) return;

    const title = document.getElementById('addtask-title');
    const dueDate = document.getElementById('dueDate');
    const titleErrorMsg = document.getElementById('title-error-msg');
    const dueDateErrorMsg = document.getElementById('duedate-error-msg');

    addFocusAndBlurListeners(title, titleErrorMsg);
    addFocusAndBlurListeners(dueDate, dueDateErrorMsg);
}

/**
 * Fügt Event-Listener zu den Eingabefeldern für Titel, Beschreibung und Fälligkeitsdatum hinzu.
 * Bei jeder Eingabe werden die globalen Variablen `title`, `description` und `dueDate` aktualisiert.
 * Falls ein Eingabefeld nicht im DOM gefunden wird, wird eine Informationsmeldung in der Konsole ausgegeben.
 */
function saveInputFields() {
    // Event-Listener für Titel
    const titleInput = document.getElementById('addtask-title');
    if (titleInput) {
        titleInput.addEventListener('input', () => {
            title = titleInput.value;
        });
    } else {
        console.info('Titel-Inputfeld nicht gefunden.');
    }
    // Event-Listener für Beschreibung
    const descriptionInput = document.getElementById('description');
    if (descriptionInput) {
        descriptionInput.addEventListener('input', () => {
            description = descriptionInput.value;
        });
    } else {
        console.info('Beschreibungs-Inputfeld nicht gefunden.');
    }
    // Event-Listener für das Fälligkeitsdatum
    const dueDateInput = document.getElementById('dueDate');
    if (dueDateInput) {
        dueDateInput.addEventListener('input', () => {
            dueDate = dueDateInput.value;
        });
    } else {
        console.info('Fälligkeitsdatum-Inputfeld nicht gefunden.');
    }
}

/**
 * Lädt die gespeicherten Tasks aus dem Speicher und zeigt sie an.
 * Diese asynchrone Funktion versucht, die gespeicherten Tasks unter dem Schlüssel 'tasks' abzurufen.
 * Bei Erfolg werden die Tasks deserialisiert (von einem JSON-String in ein Objekt umgewandelt) und 
 * in die globale Variable `tasks` geladen. Anschließend wird `showTasks` aufgerufen, um die Tasks anzuzeigen.
 * Bei einem Fehler wird eine Fehlermeldung in der Konsole ausgegeben.
 */
async function loadTasks() {
    try {
        // Versuch, die gespeicherten Tasks abzurufen
        const storedTasks = await getItem('tasks');
        // Überprüfung, ob gespeicherte Tasks existieren
        if (storedTasks) {
            // Deserialisierung der gespeicherten Tasks und Zuweisung zur globalen Variable `tasks`
            tasks = JSON.parse(storedTasks);
        }
        // Aufruf der Funktion, um die geladenen Tasks anzuzeigen
        showTasks();
    } catch (error) {
        // Ausgabe einer Fehlermeldung im Falle eines Fehlers beim Laden der Tasks
        console.error('Fehler beim Laden der Tasks:', error);
    }
}

/**
 * Erstellt eine Aufgabe basierend auf den Eingabewerten des Formulars und speichert sie.
 */
async function createTask() {
    const createTaskButton = document.getElementById('create-task');
    if (!createTaskButton) {
        console.info('Create-Task-Button wurde nicht im DOM gefunden.');
        return; // Beendet die Funktion frühzeitig, wenn das Button-Element nicht existiert
    }
    createTaskButton.addEventListener('click', async () => {
        if (!validateTaskForm()) {
            console.info('Validation failed. No Task created.');
            return;
        }
        let newTask = createNewTaskInstance(); // Erstellen einer neuen Task-Instanz
        try {
            tasks.push(newTask);// Hinzufügen des neuen Tasks zum Array
            await setItem('tasks', JSON.stringify(tasks)); // Speichern des aktualisierten Arrays
            showTaskAddedMessage();
            clearAllInputs();
        } catch (error) {
            console.error('Fehler beim Speichern des Tasks:', error);
        }
        identifier++
    });
}

/**
 * Erstellt eine neue Task-Instanz mit den aktuellen Werten aus den Eingabefeldern und globalen Variablen.
 * Weist der neuen Instanz Kategorie und Subtasks zu und inkrementiert den globalen Identifier.
 * @returns {Task} Die erstellte Task-Instanz.
 */
function createNewTaskInstance() {
    let newTask = new Task(
        Date.now(), // Eindeutige ID
        title,
        description,
        assignedTo,
        dueDate,
        prio,
        new Date().toISOString(), // Erstellungsdatum
        STORAGE_TOKEN, // Storage-Token
        identifier
    );
    // Hinzufügen von Kategorie und Subtasks
    newTask.category = category;
    newTask.subtask = subtasks;
    return newTask; // Gibt das erstellte Task-Objekt zurück
}

/**
 * Überprüft die Gültigkeit der Eingabefelder im Aufgabenformular und zeigt Fehlermeldungen an, falls erforderlich.
 * @returns {boolean} Gibt `true` zurück, wenn das Formular gültig ist, sonst `false`.
 */
function validateTaskForm() {
    let isValid = true;

    // Funktion zum Überprüfen eines einzelnen Feldes
    function validateField(inputId, errorMsgId) {
        const input = document.getElementById(inputId);
        const errorMsg = document.getElementById(errorMsgId);
        if (input && errorMsg) {
            if (input.value.trim() === "") {
                errorMsg.style.visibility = 'visible';
                isValid = false;
            } else {
                errorMsg.style.visibility = 'hidden';
            }
        }
    }

    // Überprüfe die einzelnen Felder
    validateField('addtask-title', 'title-error-msg');
    validateField('dueDate', 'duedate-error-msg');
    validateField('dropdown-categories', 'dropdown-categories-error-msg'); // Beispiel, benötigt Anpassung je nach Implementierung

    return isValid;
}

/**
 * Zeigt eine Benachrichtigungsnachricht an, dass eine Aufgabe erfolgreich hinzugefügt wurde.
 * 
 * Diese Funktion zeigt eine Benachrichtigungsnachricht im UI an und verbirgt sie automatisch
 * nach einer kurzen Verzögerung. Die Funktion kann optional so angepasst werden, dass sie
 * unterschiedlich aussieht, je nachdem, ob sie innerhalb eines Modals aufgerufen wird oder nicht.
 * 
 * @param {boolean} [fromModal=false] - Gibt an, ob die Funktion innerhalb eines Modals aufgerufen wird.
 * Wenn `true`, wird eine zusätzliche CSS-Klasse angewendet, um den Hintergrundstil der Nachricht anzupassen.
 */
function showTaskAddedMessage(fromModal = false) {
    const messageElement = document.getElementById('create-task-message');
    if (messageElement) {
        messageElement.style.display = 'flex'; 
        if (fromModal) {
            messageElement.classList.add('no-background');
        } else {
            messageElement.classList.remove('no-background');
        }
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 2000);
    } else {
        console.error('Element für Task-Hinzugefügt-Nachricht wurde nicht gefunden.');
    }
}

/**
 * Überprüft, ob die aktuelle Seite die "Board"-Seite ist, basierend auf dem Vorhandensein bestimmter Elemente.
 * 
 * Diese Funktion prüft das Vorhandensein spezifischer Elemente im DOM, die typisch für die "Board"-Seite sind.
 * Die Überprüfung basiert auf einer Liste von Element-IDs, die erwartet werden, wenn die "Board"-Seite
 * dargestellt wird. Die Funktion gibt `true` zurück, wenn mindestens eines der erwarteten Elemente
 * im DOM gefunden wird, was darauf hindeutet, dass die aktuelle Seite die "Board"-Seite ist.
 * 
 * @returns {boolean} Gibt `true` zurück, wenn sich die Anwendung auf der "Board"-Seite befindet, sonst `false`.
 */
function checkIfBoardPage() {
    const ids = [
        'board-card-background-1',
        'board-card-background-2',
        'board-card-background-3',
        'board-card-background-4',
        'toDo',
        'in-progress',
        'await-feedback',
        'done'
    ];

    // Überprüfe, ob mindestens eines dieser Elemente existiert.
    return ids.some(id => document.getElementById(id) !== null);
}
/**
 * Initialisiert die Board-Seite, wenn sich die Anwendung auf dieser befindet.
 * 
 * Diese Funktion nutzt `checkIfBoardPage` um zu überprüfen, ob die aktuelle Seite die Board-Seite ist.
 * Ist dies der Fall, wird die Board-Seite initialisiert, indem `initializeBoard` aufgerufen wird.
 * Wenn die Überprüfung ergibt, dass es sich nicht um die Board-Seite handelt, wird eine Info-Nachricht
 * in der Konsole ausgegeben, und es werden keine weiteren Aktionen zur Initialisierung der Board-Seite unternommen.
 * Diese Funktion stellt sicher, dass Board-spezifische Initialisierungen nur dann ausgeführt werden,
 * wenn dies auch tatsächlich notwendig ist.
 */
function initializeBoardIfNeeded() {
    if (checkIfBoardPage()) {
        // Führe die Initialisierung für die Board-Seite aus.
        initializeBoard();
    } else {
        // Logge eine Nachricht, falls nicht die Board-Seite.
        console.info('Nicht auf der Board-Seite, Initialisierung übersprungen.');
    }
}