/**
 * Creates the header area of the modal form
 * @returns {string} HTML string of the header area
 */
function createHeaderSection() {
    return /*html*/`
        <div class="addtask-modal-header">
            <div class="addtask-modal-headline">
                Add Task
            </div>
            <div id="close-modal-button-addtask-board" class="add-tasks-modal-close">
                <div class="first-img-container modal-x-tpl">
                    <svg class="first-img" xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24"
                        fill="none">
                        <line x1="7" y1="6" x2="18" y2="17" stroke="#2A3647" stroke-width="2" stroke-linecap="round"></line>
                        <line x1="7" y1="17" x2="18" y2="6" stroke="#2A3647" stroke-width="2" stroke-linecap="round"></line>
                    </svg>
                </div>
            </div>
        </div>
`;
}

/**
 * Creates the left section of the form, including dynamic state assignment
 * @param {string} taskState - The state of the task that is transferred to the modal
 * @returns {string} HTML string of the left form section
 */
function createFormSectionLeft(taskState) {
    return /*html*/`
    <input type="hidden" id="taskState" value="${taskState}">
    <div class="form-section left-section">
        <div class="addtask-selection addtask-custom-label">
            <label>
                <span class="label-text required">Title</span>
                </span>
                <input id="addtask-title" type="text" class="input-addtask-title addtask-title-input"
                    placeholder="Enter a title">
                <p id="title-error-msg" style="visibility: hidden;">This field is required</p>
            </label>
        </div>

        <div class="addtask-selection">
            <label>
                <span>Description</span>
                <textarea class="textarea-description textarea" placeholder="Enter a description" name="decription"
                    id="description"></textarea>
            </label>
        </div>
        <div class="addtask-selection">
            <label>
                <span>Assigned to</span>
                <div class="dropdown">
                    <button id="dropdown-assignees" class="dropbtn">Select contacts to
                        assign</button>
                    <div class="dropdown-ctrl">
                        <div class="icon-background-down arrowDown" style="display: block;">
                        </div>
                        <div class="arrow-dropdown-down arrowDown" style="display: block;">
                        </div>
                        <div class="icon-background-up arrowUp" style="display:none;"></div>
                        <div class="arrow-dropdown-up arrowUp" style="display:none;"></div>
                    </div>
                    <div class="dropdown-content-assign" id="assign-to" style="display: none;">

                    </div>
                </div>
                <div id="selected-assignees">

                </div>
            </label>
        </div>
        <div class="addtask-info info">This field is required</div>
        </div>
        `;
}

/**
 * Creates the right section of the form
 * @returns {string} HTML string of the right-hand section of the form
 */
function createFormSectionRight() {
    return /*html*/`
    <div class="form-section right-section">
                <div class="addtask-selection addtask-custom-label">
                    <label>
                        <span class="required">Due date</span>
                        <input type="date" id="dueDate" name="due-date" class="input-date">
                        <p id="duedate-error-msg" style="visibility: hidden;">This field is required</p>
                    </label>
                </div>

                <label class="addtask-custom-label">Prio</label>
                <div class="addtask-selection">
                    <div class="addtask-prio-btn">
                        <button class="addtask-buttons" id="addtask-prio-urgent">Urgent
                            <img class="icon" src="./assets/img/addtask_prio-urgent-icon.svg" alt="Prio Urgent">
                        </button>
                        <button class="addtask-buttons" id="addtask-prio-medium">Medium
                            <img class="icon" src="./assets/img/addtask_prio-medium-icon.svg" alt="Prio Medium">
                        </button>
                        <button class="addtask-buttons" id="addtask-prio-low">Low
                            <img class="icon" src="./assets/img/addtask_prio-low-icon.svg" alt="Prio Low">
                        </button>
                    </div>
                </div>

                <div class="addtask-selection">
                    <label>
                        <span class="required">Category</span>
                        <div class="dropdown">
                            <button id="dropdown-categories" class="dropbtn">Select task
                                category</button>
                            <div id="dropdown-container" class="dropdown-ctrl">
                                <div class="icon-background-down arrowDown" style="display: block;">
                                </div>
                                <div class="arrow-dropdown-down arrowDown" style="display: block;">
                                </div>
                                <div class="icon-background-up arrowUp" style="display:none;"></div>
                                <div class="arrow-dropdown-up arrowUp" style="display:none;"></div>
                            </div>

                            <div class="dropdown-content" id="category" style="display:none;">
                            </div>
                        </div>
                        <p id="dropdown-categories-error-msg" style="visibility: hidden;">This field is
                            required
                        </p>
                    </label>
                </div>

                <div class="addtask-selection">
                    <label>
                        <span>Subtask</span>
                        <div class="input-area-custom">
                            <input class="custom-input" type="text" id="subtask" name="subtask"
                                placeholder="Add new subtask">
                            <div class="subtask-ctrl">
                                <div class="subtask-icons-before" style="display: block;">
                                    <div class="icon-background-down"></div>
                                    <div class="cross-dropdown-down"></div>
                                </div>
                                <div class="subtask-icons-after" style="display: none;">

                                    <div class="first-img-container">
                                        <svg class="first-img" xmlns="http://www.w3.org/2000/svg" width="25" height="24"
                                            viewBox="0 0 25 24" fill="none">
                                            <line x1="7" y1="6" x2="18" y2="17" stroke="#2A3647" stroke-width="2"
                                                stroke-linecap="round" />
                                            <line x1="7" y1="17" x2="18" y2="6" stroke="#2A3647" stroke-width="2"
                                                stroke-linecap="round" />
                                        </svg>
                                    </div>
                                    <div class="divider-container">
                                        <svg width="2" height="100%" viewBox="0 0 2 25" xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" style="stop-color: #cdcecf; stop-opacity: 0" />
                                                    <stop offset="50%" style="stop-color: #cdcecf; stop-opacity: 1" />
                                                    <stop offset="100%" style="stop-color: #cdcecf; stop-opacity: 0" />
                                                </linearGradient>
                                            </defs>
                                            <rect width="2" height="100%" fill="url(#grad1)" />
                                        </svg>
                                    </div>
                                    <div class="second-img-container">
                                        <svg class="second-img" xmlns="http://www.w3.org/2000/svg" width="25" height="24"
                                            viewBox="0 0 25 24" fill="none">
                                            <path
                                                d="M9.69474 15.15L18.1697 6.675C18.3697 6.475 18.6072 6.375 18.8822 6.375C19.1572 6.375 19.3947 6.475 19.5947 6.675C19.7947 6.875 19.8947 7.1125 19.8947 7.3875C19.8947 7.6625 19.7947 7.9 19.5947 8.1L10.3947 17.3C10.1947 17.5 9.96141 17.6 9.69474 17.6C9.42807 17.6 9.19474 17.5 8.99474 17.3L4.69474 13C4.49474 12.8 4.3989 12.5625 4.40724 12.2875C4.41557 12.0125 4.51974 11.775 4.71974 11.575C4.91974 11.375 5.15724 11.275 5.43224 11.275C5.70724 11.275 5.94474 11.375 6.14474 11.575L9.69474 15.15Z"
                                                fill="#2A3647"></path>
                                        </svg>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </label>

                    <div class="wrapper-flex-container">
                        <div class="subtasks-container">
                            <div id="subtasks-list-container">
                                <ul>

                                </ul>
                            </div>
                        </div>
                        <div class="addtask-actions">

                            <div class="addtask-action-btns">
                                <button id="clear-button" onclick="clearAllInputs()" class="transparent-btn">Clear
                                    <svg class="cross-icon-btn1" width="24" height="25" viewBox="0 0 24 25" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12.001 12.5001L17.244 17.7431M6.758 17.7431L12.001 12.5001L6.758 17.7431ZM17.244 7.25708L12 12.5001L17.244 7.25708ZM12 12.5001L6.758 7.25708L12 12.5001Z"
                                            stroke="#2A3647" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>

                                </button>
                                <div class="addtask-info-mobile info-mobile">This field is required
                                </div>
                                <button id="create-task-board" class="blue-btn">Create Task
                                    <img src="./assets/icons/check.svg" alt="Create Task"></button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
    `;
}

/**
 * Creates a separator between the form sections
 * @returns {string} HTML string of the separator
 */
function createDivider() {
    return `<div class="divider divider-modal-tpl"></div>`;
}

/**
 * Inserts dynamic content into the AddTask modal, including state management for task creation
 * @param {string} taskState - The status of the task to be created
 */
function insertDynamicContentIntoModal(taskState) {
    const modalContent = document.querySelector('#addtask-modal .modal-content');
    if (!modalContent) return;

    const headerSection = createHeaderSection();
    const formSectionLeft = createFormSectionLeft(taskState);
    const divider = createDivider();
    const formSectionRight = createFormSectionRight();

    const dynamicContent = /*html*/`
        <section id="addtask-content" class="addtask-modal-tpl">
            ${headerSection}
            <form onsubmit="return false;" class="addtask-form addtask-form-tpl">
                ${formSectionLeft}
                ${divider}
                ${formSectionRight}
            </form>
        </section>`;
    
    modalContent.innerHTML = dynamicContent;
    reinitializeEventListenersForEditModal();
}

/**
 * Creates and saves a new task based on the form entries and the selected status
 */
async function createTaskModal() {
    if (!validateTaskForm()) {     // Validate the form
        console.info('Validation failed. No Task created.');
        return;
    }
    const taskState = document.getElementById('taskState').value;
    let newTask = new Task(
        Date.now(), // Unique ID
        title,
        description,
        assignedTo,
        dueDate,
        prio,
        new Date().toISOString(), // Date of creation
        STORAGE_TOKEN,
        identifier
    );
    newTask.category = category; // Add category and subtasks
    newTask.subtask = subtasks;
    newTask.state = taskState || 'toDo'; // Set the task state
    try {
        tasks.push(newTask); // Add the new task to the array and save
        await setItem('tasks', JSON.stringify(tasks));
        console.info('Task erfolgreich gespeichert');
        showTaskAddedMessage();
        clearAllInputs();
    } catch (error) {
        console.error('Fehler beim Speichern des Tasks:', error);
    }
    identifier++;
    clearModalContent();
    reinitializeEventListenersForEditModal();
}

/**
 * Clears the content of the modal form and resets it to its original state
 */
function clearModalContent() {
    const modalContent = document.querySelector('#addtask-modal .modal-content');
    if (modalContent) {
        modalContent.innerHTML = ''; // Removes the content of the .modal-content container
        modalContent.className = 'modal-content'; // Restores the original classes of the container
    }
    const modal = document.getElementById('addtask-modal');
    if (modal) {
        modal.classList.remove('modal-open'); 
        modal.style.display = '';
    }
}


