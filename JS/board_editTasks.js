/**
 * Empties the content of the modal for processing a task
 */
function clearEditModalContent() {
    const modal = document.getElementById('task-detail-modal');
    const taskDetailsContainer = modal.querySelector('#task-details-container');
    if (taskDetailsContainer) { // Ensures that the container exists
        // Resets the content of #task-details-container to the initial state
        taskDetailsContainer.innerHTML = ` 
            <div id="task-details">
                
            </div>
        `;
    }
    modal.classList.remove('modal-open'); // Removes the opening class
    modal.style.display = 'none'; // Hides the modal
}

/**
 * Closes the modal for adding a task
 */
function closeModalAddTaskBoard() {
    const modalClose = document.getElementById('addtask-modal');
    if (modalClose) {
        modalClose.classList.remove('modal-open'); // Starts the closing animation for the content
        setTimeout(() => {
            modalClose.style.display = 'none'; // Hides the background after the animation
        }, 200); // Waiting time corresponds to the duration of the animation
    }
}

/**
 * Closes the modal for editing a task
 */
function closeModalTaskEdit() {
    const modalEdit = document.getElementById('task-detail-modal');
    if (modalEdit) {
        modalEdit.classList.remove('modal-open'); // Starts the closing animation for the content
        setTimeout(() => {
            modalEdit.style.display = 'none'; // Hides the background after the animation
        }, 500); // Waiting time corresponds to the duration of the animation
    }
}

/**
 * Generates initials from the full name
 * @param {string} completeName - Full name from which the initials are to be generated
 * @return {string} The generated initials
 */
function generateInitials(completeName) {
    return completeName.split(' ').map(part => part[0]).join('').toUpperCase();
}

/**
 * Extracts the letter and the local index from a global index
 * This is used to localise a specific contact in the nested structure of `letterContainer`
 *
 * @param {number} globalIndex - The global index of the contact across all letters
 * @returns {object} An object with the letter and the local index of the contact. Returns `{ letter: null, index: -1 }` if no contact was found
 */
function extractLetterFromIndex(globalIndex) {
    let runningIndex = 0; // Running index for scrolling through the contacts
    for (let letter in letterContainer) { // Runs through every letter in `letterContainer`
        if (letterContainer.hasOwnProperty(letter)) { // Ensure that the current ownership is a direct ownership of `letterContainer`
            if (globalIndex < runningIndex + letterContainer[letter].length) {   // Check whether the global index is within the length of the current letter group
                return { letter: letter, index: globalIndex - runningIndex }; // Returns the letter and the local index within the letter group
            }
            runningIndex += letterContainer[letter].length; // Updates the current index by the length of the current letter group
        }
    }
    return { letter: null, index: -1 }; // Gibt `{ letter: null, index: -1 }` zurück, falls kein Kontakt gefunden wurde
}

/**
 * Extracts the priority from the active priority button
 * 
 * This function searches for the active priority button in the
 * AddTask modal view and extracts the text content of the button,
 * to determine the selected priority. If no active button
 * button is found, the function returns an empty string.
 * The extracted text is cleaned up (spaces removed and converted to
 * lower case) to ensure a consistent priority specification.
 *
 * @returns {string} The extracted priority in lower case letters or
 *                   an empty string if no priority is selected
 */
function extractPriority() {
    const activeButton = document.querySelector('.addtask-prio-btn .is-active');
    if (!activeButton) return ''; // No active button found, returns an empty string
    let priorityText = activeButton.innerText; // Extracts the text of the button
    priorityText = priorityText.trim().toLowerCase(); // Removes spaces and converts to lower case letters
    return priorityText;
}

/**
 * Extracts form data from the editing modal
 * @returns An object with the data extracted from the form: Title, description, due date, category, priority, assigned persons (assignees) and subtasks.
 */
function extractFormData() {
    return {
        title: document.getElementById('addtask-title') ? document.getElementById('addtask-title').value : '',
        description: document.getElementById('description') ? document.getElementById('description').value : '',
        dueDate: document.getElementById('dueDate') ? document.getElementById('dueDate').value : '',
        category: document.getElementById('dropdown-categories') ? document.getElementById('dropdown-categories').textContent : '',
        prio: extractPriority(), // Implementieren Sie diese Funktion entsprechend Ihrer Logik
        assignTo: extractAssignees(),
        subtask: extractSubtasks()
    };
}

/**
 * Extracts the assigned persons (assignees) from the editing modal.
 * @returns An array of objects, each representing an assigned person with name, initials and colour
 */
function extractAssignees() {
    return Array.from(document.querySelectorAll('.dropdown-content-container.user-checked')).map(assigneeContainer => {
        const name = assigneeContainer.querySelector('.dropdown-content-name').textContent;
        const color = assigneeContainer.querySelector('.dropdown-content-circle').style.backgroundColor;
        const initials = assigneeContainer.querySelector('#user-initials').textContent;
        return { name, initials, color };
    });
}

/**
 * Extracts subtasks from the editing modal
 * @returns An array of objects, each representing a subtask with text, ID and completion status.
 */
function extractSubtasks() {
    return Array.from(document.querySelectorAll('#subtasks-list-container ul li')).map(subtaskItem => {
        const text = subtaskItem.querySelector('p').textContent;
        const id = subtaskItem.dataset.subtaskId ? parseInt(subtaskItem.dataset.subtaskId) : Date.now();
        const completed = subtaskItem.classList.contains('subtask-completed') ? 'done' : '';
        return { id, text, completed };
    });
}

/**
 * Saves the edited task details and updates the UI accordingly.
 * @param {number} taskId The ID of the task being processed.
 */
async function saveTaskEdit(taskId) {
    setTimeout(async () => {
        const formData = extractFormData();
        const taskIndex = tasks.findIndex(task => task.id === parseInt(taskId));
        if (taskIndex === -1) {
            console.error('Task not found.');
            return;
        }
        updateTask(taskIndex, formData); // Update the task in the array
        try {
            await saveTasksAndReloadUI(taskIndex); // Saving the tasks and updating the UI
        } catch (error) {
            console.error('Error saving tasks:', error);
        }
    }, 100);
}

/**
 * Updates a task in the tasks array based on the transferred form data. 
 * Ensures that priority, assignees and subtasks are only updated if changes have been made.
 * 
 * @param {number} taskIndex - The index of the task in the tasks array.
 * @param {object} formData - The data extracted from the form and used to update the task
 */
function updateTask(taskIndex, formData) {
    let updatedTask = { ...tasks[taskIndex] }; // Prepares the task object to be updated
    if ('prio' in formData && formData.prio !== '') { // Checks and updates the priority of the task, if available in the formData
        updatedTask.prio = formData.prio;
    }
    if ('assignTo' in formData && formData.assignTo.length > 0) { // If assignTo is not in the formData or no assignee has been selected, do not overwrite
        updatedTask.assignTo = formData.assignTo;
    }
    if ('subtask' in formData) { // Special handling for subtasks to ensure that 'completed' states are retained
        updatedTask.subtask = formData.subtask.map(formDataSubtask => {
            let existingSubtask = updatedTask.subtask.find(subtask => subtask.id === formDataSubtask.id);
            if (existingSubtask) {
                return {
                    ...existingSubtask,
                    text: formDataSubtask.text,
                };
            } else {
                return formDataSubtask;
            }
        });
    }
    Object.keys(formData).forEach(key => { // Update other fields of the task, excluding the fields already processed
        if (!['prio', 'assignTo', 'subtask'].includes(key)) {
            updatedTask[key] = formData[key];
        }
    });
    tasks[taskIndex] = updatedTask; // Updates the task in the tasks array
}


/**
* Saves the updated tasks array in memory and updates the UI.
 * Calls functions to close the edit modal, reinitialise event listeners, open the detail view of the updated task and update the board cards.
 * @param {number} taskIndex The index of the updated task in the tasks array
 */
async function saveTasksAndReloadUI(taskIndex) {
    await setItem('tasks', tasks);
    clearEditModalContent();
    reinitializeEventListenersForEditModal();
    openTaskDetailModal(tasks[taskIndex]); // Opens the detailed view with the updated data
    await initializeBoardCard(); // Updating the board cards
}