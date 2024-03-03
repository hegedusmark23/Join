/** 
 * @global
 * @desc Der Titel der Aufgabe, die hinzugefügt wird. `null`, bis eine Eingabe erfolgt.
 * @type {string|null}
 */
let title = null;

/** 
 * @global
 * @desc Die Beschreibung der Aufgabe. `null`, bis eine Eingabe erfolgt.
 * @type {string|null}
 */
let description = null;

/** 
 * @global
 * @desc Das Fälligkeitsdatum der Aufgabe. `null`, bis eine Eingabe erfolgt.
 * @type {string|null}
 */
let dueDate = null;

/** 
 * @global
 * @desc Die Priorität der Aufgabe. `null`, bis eine Auswahl erfolgt.
 * @type {string|null}
 */
let prio = null;

/** 
 * @global
 * @desc Eine Liste von Subtasks der Aufgabe. Leer, bis Subtasks hinzugefügt werden.
 * @type {Array<Object>}
 */
let subtasks = [];

/** 
 * @global
 * @desc Eine Liste der dem Task zugewiesenen Personen. Leer, bis Zuweisungen erfolgen.
 * @type {Array<Object>}
 */
let assignedTo = [];

/** 
 * @global
 * @desc Die Kategorie der Aufgabe. `null`, bis eine Auswahl erfolgt.
 * @type {string|null}
 */
let category = null;

/** 
 * @global
 * @desc Ein Zähler zur Erstellung eindeutiger Identifikatoren für neue Aufgaben.
 * @type {number}
 */
let identifier = 0;

/** 
 * @global
 * @desc Eine Liste aller Aufgaben. Leer, bis Aufgaben hinzugefügt werden.
 * @type {Array<Object>}
 */
let tasks = [];

/**
 * Initialisiert die Hauptfunktionen der Anwendung.
 * Lädt dynamische HTML-Inhalte, begrüßt den Benutzer basierend auf der Tageszeit,
 * fokussiert den Hauptbutton und sortiert die Aufgaben in verschiedene Kategorien.
 * Die Sortierung erfolgt mit einer Verzögerung, um sicherzustellen, dass alle
 * Daten geladen wurden.
 */
async function init(){
    mobileWelcomeAnimation();
    await includeHTML(); // Lädt dynamische HTML-Komponenten
    timeDynamicWelcome(); // Zeigt eine begrüßende Nachricht basierend auf der Tageszeit
    buttonFocus(); // Setzt den Fokus auf den Hauptbutton der Seite
    // Verzögert die Ausführung der Sortierfunktionen, um das Laden der Daten abzuwarten
    setTimeout(() => {
        sortTasksByStateToDo();
        sortTasksByStateInProgress();
        numberOfAllTasks(); // Aktualisiert die Anzeige der Gesamtanzahl der Aufgaben
        sortTasksByStateAwaitingFeedback();
        sortTasksByStateDone();
        sortTasksByPrioUrgent(); // Sortiert die Aufgaben nach Dringlichkeit
    }, 250);
}

/**
 * Initialisiert die Registrierungsfunktion der Anwendung.
 * Lädt vorhandene Benutzerdaten beim Start der Registrierungsseite.
 */
async function initRegister(){
    await loadUsers(); // Lädt vorhandene Benutzer aus dem Speicher
}

async function showTasks() {
    console.log('Das sind die Tasks in meinem Array: ', tasks);
}

function reinitializeEventListenersForEditModal() {
    checkInputFields();
    saveInputFields();
    handlePrioButtons();
    inputSubtask();
    addSubTask();
    setupEventListenersSubtasks();
    renderAssignees();
    setupAssigneeGlobalClickListener();
    setupAssigneeDropdownToggleListener();
    initCategoryDropdown();
    setupCategoryDropdownEventListeners();
    setupModalCloseDelegationEdit();
    setupDeleteTaskListener();
    initializeBoardIfNeeded();
    createTask();
    setupOpenAddTaskModalListener();
    setupCloseAddTaskModalListener();
    setupEditTaskListener();
    setupModalCloseDelegationAddAtskBoard();
    setupSaveTaskEditListener();

}

document.addEventListener('DOMContentLoaded', () => {
    // Initialisierungen, die auf allen Seiten durchgeführt werden sollten
        checkInputFields();
        saveInputFields();
        loadTasks();
        createTask();
        // Funktionen, die sowohl auf der "Add Task"-Seite als auch auf der "Board"-Seite benötigt werden
      if (window.location.href === "http://127.0.0.1:5500/addtask.html") {
          handlePrioButtons();
          inputSubtask();
          addSubTask();
          setupEventListenersSubtasks();
          renderAssignees();
          setupAssigneeGlobalClickListener();
          setupAssigneeDropdownToggleListener();
          initCategoryDropdown();
          setupCategoryDropdownEventListeners();
      }
    // Hilfsfunktion, um zu überprüfen, "Board"-Seite aktiv
    function isBoardPage() {
        return document.getElementById('board-card-background-1') !== null;
  
    }
    // Funktionen spezifisch für die "Board"-Seite
    function initializeBoardPage() {
        initializeBoardCard();
        setupTaskClickListeners();
        setupCloseTaskDetailModalListener();
        setupOpenAddTaskModalListener();
        setupCloseAddTaskModalListener();
        setupModalCloseDelegation();
        setupEditTaskListener();
        setupModalCloseDelegationEdit();
        setupModalCloseDelegationAddAtskBoard();
        setupDeleteTaskListener();
        setupSaveTaskEditListener();
        setupModalEventListeners();
        setupTaskStateListeners();
    }

    // Bedingte Initialisierung basierend auf der aktuellen Seite
    if (isBoardPage()) {
        initializeBoardPage();
    } else {
        console.log('Nicht auf der Board-Seite, spezifische Board-Initialisierungen werden übersprungen.');
    }
});