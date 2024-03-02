//! Allgemeine Eventlistner

/**
 * Fügt einen Event Listener hinzu, der auf Klicks auf Subtask-Checkboxen reagiert.
 */
function addSubtaskEventListener() {
    document.body.addEventListener('click', async (event) => {
        const checkboxContainer = event.target.closest('.dropdown-content-checkbox');
        if (checkboxContainer) {
            const taskId = checkboxContainer.getAttribute('data-task-id');
            const subtaskId = checkboxContainer.getAttribute('data-subtask-id');
            if (taskId && subtaskId) {
                const updatedTask = await toggleSubtaskCompleted(parseInt(taskId), parseInt(subtaskId));
                if (updatedTask) {
                }
            }
        }
    });
}

//! Create Tasks Eventlistner (board_createTasks.js)

/**
 * Initialisiert den EventListener zum Öffnen des AddTask-Modals.
 */
function setupOpenAddTaskModalListener() {
    const openAddTaskButton = document.getElementById('open-modal-button');
    if (openAddTaskButton) {
        openAddTaskButton.addEventListener('click', () => {
            insertDynamicContentIntoModal();
            openModal('addtask-modal');
            setupModalEventListeners();
        });
    }
}

/**
 * Initialisiert den EventListener zum Schließen des AddTask-Modals.
 */
function setupCloseAddTaskModalListener() {
    const closeAddTaskButton = document.getElementById('close-modal-button-addtask');
    if (closeAddTaskButton) {
        closeAddTaskButton.addEventListener('click', () => closeModal('addtask-modal'));
    }
}

/**
 * Öffnet ein Modal auf Basis der übergebenen ID.
 * @param {string} modalId - Die ID des Modals, das geöffnet werden soll.
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block'; // Stellt sicher, dass das Modal sichtbar ist
      setTimeout(() => {
        modal.classList.add('modal-open'); // Fügt die Klasse hinzu, um das Modal sanft einzublenden
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
          modalContent.classList.add('addtask-modal-content'); // Spezifische Klasse für Animation
        }
      }, 10);
    }
  }

/**
 * Schließt ein Modal auf Basis der übergebenen ID und sorgt für eine sanfte Ausblendung des Inhalts.
 * @param {string} modalId - Die ID des Modals, das geschlossen werden soll.
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const modalContent = modal.querySelector('.modal-content-tasks'); // Zugriff auf den Inhalt des Modals
    if (modal && modalContent) {
        modal.classList.remove('modal-open'); // Entfernt die Klasse, die das Modal einblendet
        modalContent.classList.add('modal-close'); // Fügt die Klasse hinzu, die den Inhalt ausfährt

        setTimeout(() => {
            modal.style.display = 'none'; // Versteckt den Hintergrund nach der Animation
            modalContent.classList.remove('modal-close'); // Bereitet den Inhalt für die nächste Öffnung vor
        }, 700); // Wartezeit entspricht der Dauer der Animation
    }
}

/**
 * Fügt EventListener zu spezifischen Buttons hinzu, die das AddTask-Modal mit einem vordefinierten Status öffnen.
 */
function setupTaskStateListeners() {
    const stateMappings = [     // Array mit den IDs der Buttons und den entsprechenden States
        { buttonId: 'addtask-todo', taskState: 'toDo' },
        { buttonId: 'addtask-in-progress', taskState: 'in-progress' },
        { buttonId: 'addtask-await-feedback', taskState: 'await-feedback' }
    ];
    stateMappings.forEach(mapping => {     // Für jedes Mapping einen EventListener hinzufügen
        const button = document.getElementById(mapping.buttonId);
        if (button) {
            button.addEventListener('click', () => {
                openCreateTaskModalWithState(mapping.taskState);
            });
        }
    });
}

/**
 * Öffnet das AddTask-Modal und setzt den Status des neuen Tasks basierend auf dem übergebenen Parameter.
 * @param {string} taskState - Der Zustand, der dem neuen Task zugewiesen werden soll.
 */
function openCreateTaskModalWithState(taskState) {
    insertDynamicContentIntoModal(taskState);
    openModal('addtask-modal');
    setupModalEventListeners(taskState);
    initializeBoard();
}

/**
 * Richtet Event-Listener für das Schließen und Erstellen eines Tasks ein. Verwendet den übergebenen Task-Zustand.
 * @param {string} taskState - Der Zustand des zu erstellenden Tasks.
 */
function setupModalEventListeners(taskState) { // Event-Listener für den Schließen-Button
    const closeModalButton = document.getElementById('close-modal-button-addtask-board');
    if (closeModalButton) {
        closeModalButton.addEventListener('click', function() {
            clearModalContent();
            reinitializeEventListenersForEditModal();
        });
    }
    const createTaskButton = document.getElementById('create-task-board'); // Event-Listener für den Erstellen-Button
    if (createTaskButton) {
        createTaskButton.addEventListener('click', function() {
            createTaskModal(taskState)
        });
    } else {
        console.info('Create Task button not found');
    }
}

//! Detailmodal Eventlistners (board_showTaskDetails.js)
/**
 * Initialisiert EventListener für jede Board-Karte, um das Detail-Modal beim Klicken zu öffnen.
 */
function setupTaskClickListeners() {
    document.querySelectorAll('.board-card').forEach(card => {
        card.addEventListener('click', function () {
            const taskId = this.getAttribute('data-task-id');
            const task = tasks.find(task => task.id.toString() === taskId); // `tasks` sollte dein Array von Task-Objekten sein
            if (task) {
                openTaskDetailModal(task);
            }
        });
    });
}

/**
 * Initialisiert den EventListener für den Schließen-Button des Task-Detail-Modals.
 */
function setupCloseTaskDetailModalListener() {
    const closeTaskDetailButton = document.getElementById('close-modal-button-detail');
    if (closeTaskDetailButton) {
        closeTaskDetailButton.addEventListener('click', () => closeModal('task-detail-modal'));
    }
}

/**
 * Richtet eine Event-Delegation für den Schließ-Button im Detail-Modal ein.
 */
function setupModalCloseDelegation() {
    const modal = document.getElementById('task-detail-modal');
    modal.addEventListener('click', function(event) {
        // Prüfe, ob das geklickte Element der Schließ-Button oder ein Element innerhalb des Schließ-Buttons ist
        if (event.target.closest('#close-modal-button-detail')) {
            closeModal('task-detail-modal');
        }
    });
}

/**
 * Richtet einen EventListener ein, der auf Klicks innerhalb des Modals reagiert, um Subtask-Status zu aktualisieren.
 */
function setupSubtaskCompletionListener() {
    document.addEventListener('click', async function (event) {// Identifizieren ob das Task-Element im Bearbeitungsmodus ist.
        let taskIdElement = document.querySelector('.addTask-content[data-task-id]'); // Überprüfen, ob das geklickte Element oder eines seiner übergeordneten Elemente ein Subtask-Element ist.
        let subtaskElement = event.target.closest('[data-subtask-id]'); // Wenn sowohl ein Task-Element als auch ein Subtask-Element vorhanden ist
        if (taskIdElement && subtaskElement) {
            const taskId = taskIdElement.dataset.taskId;
            const subtaskId = subtaskElement.dataset.subtaskId;
            if (event.target.matches('.subtask-checkbox')) { // Überprüfen, ob der Klick auf eine Checkbox innerhalb des Subtask-Elements erfolgt ist
                const updatedTask = await toggleSubtaskCompleted(parseInt(taskId), parseInt(subtaskId));
                if (updatedTask) {
                    openTaskDetailModal(updatedTask); // Öffne das Modal mit dem aktualisierten Task
                }
            }
        }
    });
}

/**
 * Initialisiert den EventListener für den "Löschen"-Button, um den aktuellen Task zu löschen.
 */
function setupDeleteTaskListener() {
    console.log('Setup Delete Task Listener');
    const deleteButton = document.getElementById('delete-task-button');
    if (deleteButton) {
        deleteButton.addEventListener('click', deleteCurrentTask);
        console.log('Delete-Listener hinzugefügt');
    } else {
        console.info('Delete-Button wurde nicht gefunden.');
    }
}

//! Create Tasks Eventlistner (board_editTasks.js)

/**
 * Richtet die Event-Delegation für den Schließ-Button im Modal zum Bearbeiten von Tasks ein.
 */
function setupModalCloseDelegationAddAtskBoard() {
    const modalAddTaskBtn = document.getElementById('close-modal-button-addtask-board');
    if (modalAddTaskBtn) { // Überprüfung, ob das Element existiert
        modalAddTaskBtn.addEventListener('click', function(event) {
        closeModalAddTaskBoard();
        });
    } else {
        return;
    }
}

/**
 * Event-Listener für das Bearbeiten von Tasks.
 */
function setupEditTaskListener() {
    document.addEventListener('click', function(event) {
        const editButton = event.target.closest('#edit-task');
        if (editButton) {  // Extrahieren der Task-ID
            const taskHeaderElement = document.querySelector('.task-details-header');
            if (taskHeaderElement && taskHeaderElement.id) {
                const taskId = taskHeaderElement.id.replace('task-', '');
                if (taskId) {
                    renderEditTask(taskId);
                    const saveButton = document.getElementById('save-task-edit');
                    if (saveButton) {
                        saveButton.setAttribute('data-task-id', taskId);
                    }
                }
            }
        }
    });
}

/**
 * Richtet den Event-Listener für den Speichern-Button im Bearbeitungsmodal ein.
 */
function setupSaveTaskEditListener() {
    const saveButton = document.getElementById('save-task-edit');
    if (saveButton) {
        saveButton.addEventListener('click', async function() {
            // Die ID des zu bearbeitenden Tasks wird als Data-Attribut des Speichern-Buttons gespeichert.
            const taskId = this.getAttribute('data-task-id');
            if (!taskId) {
                console.error('Task ID fehlt.');
                return;
            }
            try {
                await saveTaskEdit(taskId);
                console.info('Task erfolgreich gespeichert.');
            } catch (error) {
                console.error('Fehler beim Speichern des Tasks:', error);
            }
        });
    } else {
        console.info('Der Speichern-Button noch nicht vorhanden.');
    }
}

/**
 * Richtet den Event-Listener für den Schließ-Button im Bearbeitungsmodal ein.
 */
function setupModalCloseDelegationEdit() {
    const closeModalButton = document.getElementById('close-modal-button-edittask');
    if (closeModalButton) {
        closeModalButton.addEventListener('click', function() {
            clearEditModalContent();
            reinitializeEventListenersForEditModal();
        });
    }
    else {
        return;
    }
}
