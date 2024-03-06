//! Allgemeine Eventlistner

/**
 * Adds an event listener that reacts to clicks on subtask checkboxes.
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
 * Initialises the EventListener to open the AddTask modal
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
 * Initialises the EventListener to close the AddTask modal
 */
function setupCloseAddTaskModalListener() {
    const closeAddTaskButton = document.getElementById('close-modal-button-addtask');
    if (closeAddTaskButton) {
        closeAddTaskButton.addEventListener('click', () => closeModal('addtask-modal'));
    }
}

/**
 * Opens a modal based on the transferred ID
 * @param {string} modalId - The ID of the modal to be opened
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block'; // Ensures that the modal is visible
      setTimeout(() => {
        modal.classList.add('modal-open'); // Adds the class to gently fade in the modal
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
          modalContent.classList.add('addtask-modal-content'); // Specific class for animation
        }
      }, 10);
    }
  }

/**
 * Closes a modal based on the transferred ID and ensures that the content is gently faded out
 * @param {string} modalId - The ID of the modal that is to be closed
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const modalContent = modal.querySelector('.modal-content-tasks'); // Access to the content of the modal
    if (modal && modalContent) {
        modal.classList.remove('modal-open'); // Removes the class that displays the modal
        modalContent.classList.add('modal-close'); // Adds the class that extends the content

        setTimeout(() => {
            modal.style.display = 'none'; // Hides the background after the animation
            modalContent.classList.remove('modal-close'); // Prepares the contents for the next opening
        }, 700); // Waiting time corresponds to the duration of the animation
    }
}

/**
 * Adds EventListeners to specific buttons that open the AddTask modal with a predefined status.
 */
function setupTaskStateListeners() {
    const stateMappings = [     // Array with the IDs of the buttons and the corresponding states
        { buttonId: 'addtask-todo', taskState: 'toDo' },
        { buttonId: 'addtask-in-progress', taskState: 'in-progress' },
        { buttonId: 'addtask-await-feedback', taskState: 'await-feedback' }
    ];
    stateMappings.forEach(mapping => {     // Add an EventListener for each mapping
        const button = document.getElementById(mapping.buttonId);
        if (button) {
            button.addEventListener('click', () => {
                openCreateTaskModalWithState(mapping.taskState);
            });
        }
    });
}

/**
 * Opens the AddTask modal and sets the status of the new task based on the transferred parameter
 * @param {string} taskState - The status to be assigned to the new task
 */
function openCreateTaskModalWithState(taskState) {
    insertDynamicContentIntoModal(taskState);
    openModal('addtask-modal');
    setupModalEventListeners(taskState);
    initializeBoard();
}

/**
 * Sets up event listeners for closing and creating a task. Uses the transferred task state.
 * @param {string} taskState - The status of the task to be created
 */
function setupModalEventListeners(taskState) { // Event listener for the close button
    const closeModalButton = document.getElementById('close-modal-button-addtask-board');
    if (closeModalButton) {
        closeModalButton.addEventListener('click', function() {
            clearModalContent();
            reinitializeEventListenersForEditModal();
        });
    }
    const createTaskButton = document.getElementById('create-task-board'); // Event listener for the create button
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
 * Initialises EventListener for each board card to open the detail modal when clicked
 */
function setupTaskClickListeners() {
    document.querySelectorAll('.board-card').forEach(card => {
        card.addEventListener('click', function () {
            const taskId = this.getAttribute('data-task-id');
            const task = tasks.find(task => task.id.toString() === taskId); // `tasks` should be your array of task objects
            if (task) {
                openTaskDetailModal(task);
            }
        });
    });
}

/**
 * Initialises the EventListener for the close button of the task detail modal
 */
function setupCloseTaskDetailModalListener() {
    const closeTaskDetailButton = document.getElementById('close-modal-button-detail');
    if (closeTaskDetailButton) {
        closeTaskDetailButton.addEventListener('click', () => closeModal('task-detail-modal'));
    }
}

/**
 * Sets up an event delegation for the close button in the detail modal.
 */
function setupModalCloseDelegation() {
    const modal = document.getElementById('task-detail-modal');
    modal.addEventListener('click', function(event) {
        if (event.target.closest('#close-modal-button-detail')) { // Check whether the clicked element is the close button or an element within the close button
            closeModal('task-detail-modal');
        }
    });
}

/**
 * Sets up an EventListener that reacts to clicks within the modal to update subtask statuses.
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
 * Initialises the EventListener for the "Delete" button to delete the current task.
 */
function setupDeleteTaskListener() {
    const deleteButton = document.getElementById('delete-task-button');
    if (deleteButton) {
        deleteButton.addEventListener('click', deleteCurrentTask);
    } else {
        console.info('Delete-Button wurde nicht gefunden.');
    }
}

//! Create Tasks Eventlistner (board_editTasks.js)

/**
 * Sets up the event delegation for the close button in the modal for editing tasks.
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
 * Event listener for editing tasks.
 */
function setupEditTaskListener() {
    document.addEventListener('click', function(event) {
        const editButton = event.target.closest('#edit-task');
        if (editButton) {  // Extrahieren der Task-ID
                        const taskHeaderElement = document.querySelector('.task-details-header');
            if (taskHeaderElement && taskHeaderElement.id) {
                const taskId = taskHeaderElement.id.replace('task-', '');
                console.log('Task ID gefunden:', taskId);
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
 * Sets up the event listener for the save button in the editing modal.
 */
function setupSaveTaskEditListener() {
    const saveButton = document.getElementById('save-task-edit');
    if (saveButton) {
        saveButton.addEventListener('click', async function() { // The ID of the task to be processed is saved as the data attribute of the Save button.
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
 * Sets up the event listener for the close button in the editing modal.
 */
function setupModalCloseDelegationEdit() {
    const closeModalButton = document.getElementById('close-modal-button-edittask');
    if (closeModalButton) {
        closeModalButton.addEventListener('click', function() { // Ensures that the dropdown is closed
            toggleAssigneeDropdown(false);
            clearEditModalContent();
            reinitializeEventListenersForEditModal();
        });
    }
    else {
        return;
    }
}

