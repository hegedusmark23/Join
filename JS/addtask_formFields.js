//! Prio Buttons

/**
 * Initializes event listeners for priority buttons.
 */
function handlePrioButtons() {
    const prioButtons = document.querySelectorAll('.addtask-buttons');
    const colors = getPrioColors();

    prioButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            handlePrioButtonClick(event, prioButtons, colors);
        });
    });
}

/**
 * Returns the color codings for different priorities.
 * @returns {Object} An object with color values ​​for each priority.
 */
function getPrioColors() {
    return {
        urgent: '#ff3d00',
        medium: '#ffa800',
        low: '#7ae229'
    };
}

/**
 * Handles click events on priority buttons.
 * @param {Event} event - The click event.
 * @param {NodeListOf<Element>} prioButtons - List of all priority buttons.
 * @param {Object} colors - Colors for each priority.
 */
function handlePrioButtonClick(event, prioButtons, colors) {
    const button = event.target;
    const priority = button.id.replace('addtask-prio-', '');

    toggleButtonActiveState(button, prioButtons, colors, priority);
}

/**
 * Changes the active state of the clicked button and updates the priority.
 * @param {Element} button - The clicked button
 * @param {NodeListOf<Element>} prioButtons - List of all priority buttons.
 * @param {Object} colors - Colors for each priority.
 * @param {string} priority - The priority that corresponds to the button.
 */
function toggleButtonActiveState(button, prioButtons, colors, priority) {
    if (button.classList.contains('is-active')) {
        deactivateButtons(prioButtons);
        prio = null; // Reset the global variable 'prio'
    } else {
        activateButton(button, prioButtons, colors[priority]);
        prio = priority; // Update global variable 'prio'
    }
}

/**
 * Disables all priority buttons.
 * @param {NodeListOf<Element>} buttons - List of buttons.
 */
function deactivateButtons(buttons) {
    buttons.forEach(btn => {
        btn.classList.remove('is-active');
        btn.style.backgroundColor = '';
    });
}

/**
 * Activates a specific button and sets the color based on priority.
 * @param {Element} button - The button to activate.
 * @param {NodeListOf<Element>} buttons - List of all buttons to deactivate them.
 * @param {string} color - The color to be assigned to the button.
 */
function activateButton(button, buttons, color) {
    deactivateButtons(buttons);
    button.classList.add('is-active');
    button.style.backgroundColor = color;
}

//! Subtasks

/**
 * Initializes the behavior of the input field for subtasks.
 * 
 * This function adds event listeners to the subtask input field and the clear button.
 * When the input field is focused, certain icons are displayed and when the clear button is clicked
 * the field is emptied and the icons are reset. The function also checks whether all relevant
 * Elements exist in the DOM.
 */
function inputSubtask() {
    let inputField = document.getElementById('subtask');
    let clearButton = document.querySelector('.first-img-container');
    let iconsBefore = document.querySelector('.subtask-icons-before');
    let iconsAfter = document.querySelector('.subtask-icons-after');
    if (inputField && clearButton && iconsBefore && iconsAfter) {
        inputField.addEventListener('focus', () => { // Event listener for focus on the input field
            iconsBefore.style.display = 'none';
            iconsAfter.style.display = 'flex';
        });
        clearButton.addEventListener('click', () => {  // Event listener for the clear button
            inputField.value = '';
            setTimeout(() => {
                iconsBefore.style.display = 'block';
                iconsAfter.style.display = 'none';
                inputField.blur();
            }, 10); // Small delay of 10 milliseconds
        });
    } else {
        console.info('One or more subtask-related elements were not found in the DOM.');
    }
}

/**
 * Adds to a subtask and initializes the behavior of the "Add" button and the input field.
 *
 * This function adds event listeners to the "Add" button and the subtask input field. When clicking the
 * "Add" buttons or when pressing the return key in the input field a new subtask is added.
 * The function also checks whether the "Add" button and input field exist in the DOM.
 */
function addSubTask() {
    let addButton = document.querySelector('.second-img-container');
    let inputField = document.getElementById('subtask');
    if (addButton && inputField) {
        addButton.addEventListener('click', renderSubtask); // Event listener for the "Add" button
        inputField.addEventListener('keypress', (event) => { // Event listener for pressing the return key in the input field
            if (event.keyCode === 13 || event.which === 13) {
                event.preventDefault(); // Prevents the default behavior of the Return key
                renderSubtask();
            }
        });
    } else {
        console.info('One or more subtask-related elements were not found in the DOM.');
    }
}

/**
 * Processes subtask input, creates a new subtask object,
 * adds it to the list and displays it in the DOM.
 */
function renderSubtask() {
    let inputField = document.getElementById('subtask');
    let newSubtaskText = inputField.value.trim();
    if (newSubtaskText) {
        let newSubtask = createSubtaskObject(newSubtaskText);
        subtasks.push(newSubtask);
        addSubtaskToDOM(newSubtask);
    }
    inputField.value = ''; // Empty the input field
    setTimeout(resetSubtaskField, 0); // Delayed reset of the input field and icons
}

/**
 * Creates a Subtask object with a unique ID and the entered text.
 * @param {string} text - The text of the new subtask.
 * @returns {Object} The subtask object created.
 */
function createSubtaskObject(text) {
    return {
        id: Date.now(), // Generates a simple unique ID
        text: text,
        completed: null // Initial state: not completed
    };
}

/**
 * Adds a Subtask object to the DOM.
 * @param {Object} subtask - The subtask object to add.
 */
function addSubtaskToDOM(subtask) {
    let listContainer = document.getElementById('subtasks-list-container').querySelector('ul');
    let newLi = document.createElement('li');
    newLi.dataset.subtaskId = subtask.id;
    newLi.innerHTML = `
        <div class="subtask-item-wrapper">
            <p>${subtask.text}</p>
            <div class="subtask-icons">
                <img class="edit-subtask" src="./assets/img/edit_task.png">
                <img class="divider-subtask" src="./assets/img/divider_small.png">
                <img class="delete-subtask" src="./assets/img/delete-subtask.svg">
            </div>
        </div>
    `;
    listContainer.appendChild(newLi);
}

/**
 * Resets the input field for subtasks and the associated icons.
 */
function resetSubtaskField() {
    let inputField = document.getElementById('subtask');
    let iconsBefore = document.querySelector('.subtask-icons-before');
    let iconsAfter = document.querySelector('.subtask-icons-after');
    inputField.value = '';
    iconsBefore.style.display = 'block';
    iconsAfter.style.display = 'none';
    inputField.blur()
}

/**
 * Enables edit mode for a specific subtask.
 * @param {HTMLElement} liElement - The list element that represents the subtask.
 */
function editSubtask(liElement) {
    let subtaskText = liElement.querySelector('p').textContent;
    liElement.classList.add('edit-mode'); // Fügt die Klasse hinzu, um den Bullet Point auszublenden
    liElement.innerHTML = `
        <div class="subtask-item-wrapper-edit">
            <input id="subtask-edit-input" class="input-subtask" type="text" value="${subtaskText}">
            <div class="subtask-icons-edit">
                <img class="delete-subtask" src="./assets/img/delete-subtask.svg">
                <img class="divider-subtask" src="./assets/img/divider_small.png">
                <img class="save-subtask" src="./assets/img/check-small.png">
            </div>
        </div>
    `;
}

/**
 * Saves the changes to a subtask and updates the display.
 * @param {HTMLElement} liElement - The list element that represents the subtask.
 */
function saveSubtask(liElement) {
    let inputElement = liElement.querySelector('input.input-subtask');
    let newSubtaskText = inputElement.value;
    let subtaskId = liElement.dataset.subtaskId;
    liElement.classList.remove('edit-mode');
    let subtaskIndex = subtasks.findIndex(subtask => subtask.id.toString() === subtaskId);
    if (subtaskIndex !== -1) {
        subtasks[subtaskIndex].text = newSubtaskText;
    }
    liElement.innerHTML = `
        <div class="subtask-item-wrapper">
            <p>${newSubtaskText}</p>
            <div class="subtask-icons">
                <img class="edit-subtask" src="./assets/img/edit_task.png">
                <img class="divider-subtask" src="./assets/img/divider_small.png">
                <img class="delete-subtask" src="./assets/img/delete-subtask.svg">
            </div>
        </div>
    `;
}

/**
 * Initializes event listeners for subtask actions such as delete, edit, and save.
 */
function setupEventListenersSubtasks() {
    let listContainer = getSubtaskListContainer();
    if (!listContainer) return;

    setupDeleteSubtaskListener(listContainer);
    setupEditSubtaskListener(listContainer);
    setupSaveSubtaskListener(listContainer);
    setupDoubleClickToEditListener(listContainer);
}

/**
 * Gets and returns the container element for subtasks.
 * @returns {HTMLElement | null} The UL element containing the subtasks, or null if not found.
 */
function getSubtaskListContainer() {
    let listContainerElement = document.getElementById('subtasks-list-container');
    if (!listContainerElement) {
        console.info('Container for subtasks was not found in the DOM.');
        return null;
    }
    let listContainer = listContainerElement.querySelector('ul');
    if (!listContainer) {
        console.info('UL element for subtasks not found in DOM.');
        return null;
    }
    return listContainer;
}

/**
 * Adds an event listener for deleting subtasks.
 * @param {HTMLElement} listContainer - The container that contains the subtask list elements.
 */
function setupDeleteSubtaskListener(listContainer) {
    listContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-subtask')) {
            deleteSubtask(event, listContainer);
        }
    });
}

/**
 * Adds an event listener for editing subtasks.
 * @param {HTMLElement} listContainer - The container that contains the subtask list elements.
 */
function setupEditSubtaskListener(listContainer) {
    listContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-subtask')) {
            let liToEdit = event.target.closest('li');
            if (liToEdit) editSubtask(liToEdit);
        }
    });
}

/**
 * Adds an event listener for editing subtasks.
 * @param {HTMLElement} listContainer - The container that contains the subtask list elements.
 */
function setupSaveSubtaskListener(listContainer) {
    listContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('save-subtask')) {
            let liToSave = event.target.closest('li');
            if (liToSave) saveSubtask(liToSave);
        }
    });
}

/**
 * Adds an event listener for editing by double click for subtasks.
 * @param {HTMLElement} listContainer - The container that contains the subtask list elements.
 */
function setupDoubleClickToEditListener(listContainer) {
    listContainer.addEventListener('dblclick', function(event) {
        let liToEdit = event.target.closest('li');
        if (liToEdit && !liToEdit.classList.contains('edit-mode')) {
            editSubtask(liToEdit);
        }
    });
}

/**
 * Handles deleting a subtask.
 * @param {HTMLElement} listContainer - The container that contains the subtask list elements.
 */
function deleteSubtask(event, listContainer) {
    let liToDelete = event.target.closest('li');
    if (liToDelete && listContainer.contains(liToDelete)) {
        let subtaskId = liToDelete.dataset.subtaskId;
        if (subtaskId) {
            subtasks = subtasks.filter(subtask => subtask.id.toString() !== subtaskId);
        }
        listContainer.removeChild(liToDelete);
    }
}