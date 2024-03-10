
/**
 * Resets input fields.
 */
function resetInputFields() {
    document.getElementById('addtask-title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('dueDate').value = '';
}

/**
 * Resets global variables.
 */
function resetGlobalVariables() {
    title = null;
    description = null;
    dueDate = null;
    prio = null;
    category = null; // Deletes the selection in the category
    assignedTo = []; // Empties the array of assigned users
}

/**
 * Resets dropdown fields and their states.
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
 * Resets the display of assignees and subtasks.
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
 * Resets the visual states of the UI elements.
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
 * Resets all entries and selected states in the form.
 */
function clearAllInputs() {
    resetInputFields();
    resetGlobalVariables();
    resetDropdowns();
    resetAssigneesAndSubtasks();
    resetUIElements();
}

/**
 * 
Resets the 'added' status of all contacts and updates the UI accordingly.
 * This function loops through all contacts in the letterContainer and resets their 'added' status.
 * The array of assigned users is then emptied and the UI elements,
 * representing the assigned contacts and their selection status are updated.
 */
function resetAssigneeSelection() {
    // Loops through the letterContainer and resets the 'added' status of each contact
    Object.values(letterContainer).forEach(contacts => {
        contacts.forEach(contact => {
            contact.added = false; // Resets the state
        });
    });
    assignedTo = []; // Empties the array of assigned users
    renderAssignees(); // Re-renders the user list in the dropdown to reflect the reset state
    updateSelectedAssigneesDisplay();    // Updates the display of selected users
}


/**
 * Adds event listeners for focus and blur to an input field.
 * @param {HTMLElement} inputElement - The input field for which listeners will be added.
 * @param {HTMLElement} errorMsgElement - The error message element to show or hide.
 */
function addFocusAndBlurListeners(inputElement, errorMsgElement) {
    let focused = false;
    inputElement.addEventListener('focus', () => {
        focused = true;
    });
    inputElement.addEventListener('blur', () => {
        // Displays the error message if the field is empty and has been focused.
        errorMsgElement.style.visibility = inputElement.value.trim() === "" && focused ? 'visible' : 'hidden';
    });
}

/**
 * Checks whether all required input elements and error message elements are present.
 * @returns {boolean} Returns whether all elements are present.
 */
function validateInputElements() {
    const elements = [
        document.getElementById('addtask-title'),
        document.getElementById('dueDate'),
        document.getElementById('title-error-msg'),
        document.getElementById('duedate-error-msg')
    ];
    if (elements.some(element => element === null)) {
        console.info('One or more required elements for checkInputFields() are missing from the DOM.');
        return false;
    }
    return true;
}

/**
 * Checks the input fields and adds appropriate event listeners.
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
 * Adds event listeners to the title, description, and due date input fields.
 * With each input, the global variables `title`, `description` and `dueDate` are updated.
 * If an input field is not found in the DOM, an informational message is printed in the console.
 */
function saveInputFields() {
    // Event listener for titles
    const titleInput = document.getElementById('addtask-title');
    if (titleInput) {
        titleInput.addEventListener('input', () => {
            title = titleInput.value;
        });
    } else {
        console.info('Title input field not found.');
    }
    // Event listener for description
    const descriptionInput = document.getElementById('description');
    if (descriptionInput) {
        descriptionInput.addEventListener('input', () => {
            description = descriptionInput.value;
        });
    } else {
        console.info('Description input field not found.');
    }
    // Event listener for the due date
    const dueDateInput = document.getElementById('dueDate');
    if (dueDateInput) {
        dueDateInput.addEventListener('input', () => {
            dueDate = dueDateInput.value;
        });
    } else {
        console.info('Due date input field not found.');
    }
}

/**
 * Loads the saved tasks from memory and displays them.
 * This asynchronous function attempts to retrieve the stored tasks under the 'tasks' key.
 * If successful, the tasks are deserialized (converted from a JSON string to an object) and
 * loaded into the global variable `tasks`. Then `showTasks` is called to display the tasks.
 * If an error occurs, an error message is displayed in the console.
 */
async function loadTasks() {
    try {
        // Attempting to retrieve the saved tasks
        const storedTasks = await getItem('tasks');
        const storedIdentifier = await getItem('identifier')
        // Check whether saved tasks exist
        if (storedTasks) {
            // Deserialization of the stored tasks and assignment to the global variable `tasks`
            tasks = JSON.parse(storedTasks);
            identifier = JSON.parse(storedIdentifier)
        }
        // Call the function to display the loaded tasks
        showTasks();
    } catch (error) {
        // Output an error message in the event of an error loading the tasks
        console.error('Error loading tasks:', error);
    }
}

/**
 * Creates a task based on the form's input values ​​and saves it.
 */
async function createTask() {
    const createTaskButton = document.getElementById('create-task');
    if (!createTaskButton) {
        console.info('Create task button not found in DOM.');
        return; //Terminates the function early if the button element does not exist
    }
    createTaskButton.addEventListener('click', async () => {
        if (!validateTaskForm()) {
            console.info('Validation failed. No Task created.');
            return;
        }
        let newTask = createNewTaskInstance(); // Creating a new task instance
        try {
            tasks.push(newTask);// Adding the new task to the array
            await setItem('tasks', JSON.stringify(tasks)); // Saving the updated array
            identifier++;
            await setItem('identifier', JSON.stringify(identifier))
            showTaskAddedMessage();
            clearAllInputs();
        } catch (error) {
            console.error('Error saving task:', error);
        }
    });
}

/**
 * Creates a new task instance with the current values ​​from the input fields and global variables.
 * Assigns category and subtasks to the new instance and increments the global identifier.
 * @returns {Task} The created task instance.
 */
function createNewTaskInstance() {
    const taskStateFromUrl = getTaskStateFromUrl();

    let newTask = new Task(
        Date.now(), // Unique ID
        title,
        description,
        assignedTo,
        dueDate,
        prio,
        new Date().toISOString(), // Creation Date
        STORAGE_TOKEN, // Storage token
        identifier
    );
    // Adding category and subtasks
    newTask.category = category;
    newTask.subtask = subtasks;
    newTask.state = taskStateFromUrl || 'toDo';
    return newTask; // Returns the created Task object
}

/**
 * Checks the validity of the input fields in the task form and displays error messages if necessary.
 * @returns {boolean} Returns `true` if the form is valid, `false` otherwise.
 */
function validateTaskForm() {
    let isValid = true;
    // Validate title
    const titleInput = document.getElementById('addtask-title');
    if (titleInput.value.trim() === "") {
        document.getElementById('title-error-msg').style.visibility = 'visible';
        isValid = false;
    } else {
        document.getElementById('title-error-msg').style.visibility = 'hidden';
    }
    // Validate due date
    const dueDateInput = document.getElementById('dueDate');
    if (dueDateInput.value.trim() === "") {
        document.getElementById('duedate-error-msg').style.visibility = 'visible';
        isValid = false;
    } else {
        document.getElementById('duedate-error-msg').style.visibility = 'hidden';
    }
    // Validate category
    if (!category) { 
        document.getElementById('dropdown-categories-error-msg').style.visibility = 'visible';
        isValid = false;
    } else {
        document.getElementById('dropdown-categories-error-msg').style.visibility = 'hidden';
    }
    return isValid;
}

/**
 * Displays a notification message that a task was added successfully.
 *
 * This feature displays a notification message in the UI and hides it automatically
 * after a short delay. The function can optionally be adapted to:
 * looks different depending on whether it is called within a modal or not.
 *
 * @param {boolean} [fromModal=false] - Indicates whether the function is called within a modal.
 * If `true`, an additional CSS class is applied to customize the background style of the message.
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
        console.error('Item for task added message not found.');
    }
}

/**
 * Checks whether the current page is the "board" page based on the presence of certain elements.
 *
 * This function checks the presence of specific elements in the DOM that are typical for the "board" page.
 * Validation is based on a list of item IDs that are expected when the "Board" page
 * is pictured. The function returns `true` if at least one of the expected elements
 * is found in the DOM, indicating that the current page is the "board" page.
 *
 * @returns {boolean} Returns `true` if the application is on the "board" page, `false` otherwise.
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

    // Check whether at least one of these elements exists.
    return ids.some(id => document.getElementById(id) !== null);
}
/**
 * Initializes the board page when the application is on it.
 *
 * This function uses `checkIfBoardPage` to check if the current page is the board page.
 * If this is the case, the board page is initialized by calling `initializeBoard`.
 * If verification shows it is not the board page, an info message will be sent
 * is output to the console and no further actions are taken to initialize the board page.
 * This function ensures that board-specific initializations are only carried out when
 * if this is actually necessary.
 */
function initializeBoardIfNeeded() {
    if (checkIfBoardPage()) {
        // Run the initialization for the board page.
        initializeBoard();
    } else {
        // Log a message if not the board page.
        console.info('Not on the board side, initialization skipped.');
    }
}

/**
 * Retrieves the task state from the URL query parameters.
 * @returns {string|null} The state of the task as specified in the URL, or null if not specified.
 */
function getTaskStateFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('state');
}

/**
 * Sets up the page based on the task state retrieved from the URL.
 * If a state is specified in the URL, it logs the predefined status and sets the current task state accordingly.
 */
function setupPageBasedOnTaskState() {
    const taskState = getTaskStateFromUrl();
    if (taskState) {
        currentTaskState = taskState;
    }
}
