//! Allgemeine Eventlistner
/**
 * Setzt den EventListener für den "Create Task"-Button.
 */
function setupCreateTaskListener() {
    const createTaskButton = document.getElementById('create-task');
    if (createTaskButton) {
        createTaskButton.addEventListener('click', async function () {
            try {
                // Schließe das Modal
                closeModal('addtask-modal');
                // Aktualisiere den Board-Inhalt
                await initializeBoard();
                await initializeBoardCard();
            } catch (error) {
                console.error('Fehler beim Speichern des Tasks:', error);
            }
        });
    }
}

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

//! Detailmodal
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