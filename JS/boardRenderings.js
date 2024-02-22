//! Modal um einen neuen Task zu erstellen

// Offnet das AddTask Modal
function setupOpenAddTaskModalListener() {
    const openAddTaskButton = document.getElementById('open-modal-button');
    if (openAddTaskButton) {
        openAddTaskButton.addEventListener('click', () => {
            insertDynamicContentIntoModal();
            openModal('addtask-modal');
        });
    }
}

// Schließt das AddTask Modal
function setupCloseAddTaskModalListener() {
    const closeAddTaskButton = document.getElementById('close-modal-button-addtask');
    if (closeAddTaskButton) {
        closeAddTaskButton.addEventListener('click', () => closeModal('addtask-modal'));
    }
}

// Funktion zum Öffnen eines Modals
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

// Funktion zum Schließen eines Modals mit vollständigem Ausfahren des Inhalts
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

// Event-Delegation für den Schließ-Button im Modal einrichten
function setupModalCloseDelegation() {
    const modal = document.getElementById('task-detail-modal');
    modal.addEventListener('click', function(event) {
        // Prüfe, ob das geklickte Element der Schließ-Button oder ein Element innerhalb des Schließ-Buttons ist
        if (event.target.closest('#close-modal-button-detail')) {
            closeModal('task-detail-modal');
        }
    });
}

function insertDynamicContentIntoModal() {
    const modalContent = document.querySelector('#addtask-modal .modal-content');
    if (modalContent) {
        const dynamicContent = `
    <section id="addtask-content" class="addtask-modal-tpl">
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
        <form onsubmit="return false;" class="addtask-form addtask-form-tpl">
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
            <div class="divider divider-modal-tpl"></div>
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
                            <img class="icon" src="/Join/assets/img/addtask_prio-urgent-icon.svg" alt="Prio Urgent">
                        </button>
                        <button class="addtask-buttons" id="addtask-prio-medium">Medium
                            <img class="icon" src="/Join/assets/img/addtask_prio-medium-icon.svg" alt="Prio Medium">
                        </button>
                        <button class="addtask-buttons" id="addtask-prio-low">Low
                            <img class="icon" src="/Join/assets/img/addtask_prio-low-icon.svg" alt="Prio Low">
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
                                <button id="create-task" class="blue-btn">Create Task
                                    <img src="/Join/assets/icons/check.svg" alt="Create Task"></button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </form>
    </section>
        `;
        modalContent.innerHTML = dynamicContent;
    }
    reinitializeEventListenersForEditModal();
}

// Funktion zum Schließen des dynamischen Modals für Tasks-Editieren
function closeModalAddTaskBoard() {
    const modalClose = document.getElementById('addtask-modal');
    if (modalClose) {
        modalClose.classList.remove('modal-open'); // Startet die Schließanimation für den Inhalt
        setTimeout(() => {
            modalClose.style.display = 'none'; // Versteckt den Hintergrund nach der Animation
        }, 200); // Wartezeit entspricht der Dauer der Animation
    }
}

// Event-Delegation für den Schließ-Button im Modal Tasks-Editieren einrichten
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

//! Modal um einen Task zu bearbeiten
function setupEditTaskListener() {
    document.addEventListener('click', function(event) {
        const editButton = event.target.closest('#edit-task');
        if (editButton) {
            // Die Task-ID direkt aus dem id-Attribut des task-details-header extrahieren
            const taskHeaderElement = document.querySelector('.task-details-header');
            if (taskHeaderElement && taskHeaderElement.id) {
                const taskId = taskHeaderElement.id.replace('task-', '');
                console.log('Task ID:', taskId);

                if (taskId) {
                    renderEditTask(taskId); 
                }
            }
        }
    });
}

// Hilfsfunktion zur Generierung von Initialen aus dem vollständigen Namen
function generateInitials(completeName) {
    return completeName.split(' ').map(part => part[0]).join('').toUpperCase();
}

function renderEditTask(taskId) {
    const task = tasks.find(t => t.id === parseInt(taskId));
    if (!task) {
        console.error("Task nicht gefunden.");
        return;
    }

    // Generieren der HTML-Strings für jeden zugewiesenen Benutzer
    const assignedUsersHtml = task.assignTo.map(user =>
        `<div class="dropdown-content-circle" style="background-color: ${user.color};">${generateInitials(user.name)}</div>`
    ).join('');

    let assigneesMarkup = '';
    Object.keys(letterContainer).forEach(letter => {
        letterContainer[letter].forEach(contact => {
            // Überprüfen, ob dieser Kontakt bereits dem Task zugewiesen wurde
            const isAssigned = task.assignTo.some(assignee => assignee.name === contact.completeName);
            const userCheckedClass = isAssigned ? 'user-checked' : '';
            const checkboxSVG = isAssigned ? 
                `<svg id="checkbox-checked-active" style="display:block" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.3882 11V17C20.3882 18.6569 19.045 20 17.3882 20H7.38818C5.73133 20 4.38818 18.6569 4.38818 17V7C4.38818 5.34315 5.73133 4 7.38818 4H15.3882" stroke="#fff" stroke-width="2" stroke-linecap="round"></path>
                <path d="M8.38818 12L12.3882 16L20.3882 4.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>` : 
                `<svg id="checkbox-unchecked-normal" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4.38818" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"></rect>
                </svg>`;
    
            // Initialen generieren und verwenden
            const initials = generateInitials(contact.completeName);
    
            assigneesMarkup += `<div class="dropdown-content-container ${userCheckedClass}">
                                    <div class="dropdown-content-binding">
                                        <div class="dropdown-content-circle" style="background-color:${contact.badgeColor};">
                                            <p id="user-initials">${initials}</p>
                                        </div>
                                        <div class="dropdown-content-name">
                                            <a id="user-name" href="#" data-value="option">${contact.completeName}</a>
                                        </div>
                                    </div>
                                    <div class="dropdown-content-checkbox">${checkboxSVG}</div>
                                </div>`;
        });
    });
    
// Generieren der HTML-Strings für Subtasks im Bearbeitungsmodus
const subtasksHtml = task.subtask.map(subtask =>
    `<li data-subtask-id="${subtask.id}">
        <div class="subtask-item-wrapper">
            <p>${subtask.text}</p>
            <div class="subtask-icons">
                <img class="edit-subtask" src="./assets/img/edit_task.png">
                <img class="divider-subtask" src="./assets/img/divider_small.png">
                <img class="delete-subtask" src="./assets/img/
                -subtask.svg">
            </div>
        </div>
    </li>`
).join('');


    // Befüllen des Modals mit Taskdaten für die Bearbeitung
    const modalContent =
    `
    <main class="addTask-content" data-task-id="${taskId}">
        <section id="addtask-content" class="task-edit-adjust">
            <div id="close-modal-button-edittask" class="add-tasks-modal-close add-tasks-modal-close-edit">
                <div class="first-img-container">
                    <svg class="first-img" xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24"
                        fill="none">
                        <line x1="7" y1="6" x2="18" y2="17" stroke="#2A3647" stroke-width="2" stroke-linecap="round">
                        </line>
                        <line x1="7" y1="17" x2="18" y2="6" stroke="#2A3647" stroke-width="2" stroke-linecap="round">
                        </line>
                    </svg>
                </div>
            </div>
            </div>
            <div class="form-wrapper">
                <form onsubmit="return false;" class="addtask-form-edit">
                    <div class="form-content">
                        <div class="form-section left-section">
                            <div class="addtask-selection addtask-custom-label">
                                <label>
                                    <span class="label-text required">Title</span>
                                    </span>
                                    <input id="addtask-title" type="text"
                                        class="input-addtask-title addtask-title-input" placeholder="Enter a title" value="${task.title}">
                                    <p id="title-error-msg" style="visibility: hidden;">This field is required</p>
                                </label>
                            </div>

                            <div class="addtask-selection">
                                <label>
                                    <span>Description</span>
                                    <textarea class="textarea-description textarea" placeholder="Enter a description"
                                        name="decription" id="description">${task.description || ''}</textarea>
                                </label>
                            </div>

                            <div class="addtask-selection">
                                <label>
                                    <span>Assigned to</span>
                                    <div class="dropdown">
                                        <button id="dropdown-assignees" class="dropbtn">Select contacts to
                                            assign</button>
                                        <div class="dropdown-ctrl">
                                            <div class="icon-background-down arrowDown" style="display: block;"></div>
                                            <div class="arrow-dropdown-down arrowDown" style="display: block;"></div>
                                            <div class="icon-background-up arrowUp" style="display:none;"></div>
                                            <div class="arrow-dropdown-up arrowUp" style="display:none;"></div>
                                        </div>
                                        <div class="dropdown-content-assign" id="assign-to" style="display: none;">
                                        ${assigneesMarkup}
                                        </div>
                                    </div>
                                    <div id="selected-assignees">
                                    ${assignedUsersHtml}
                                    </div>
                                </label>
                            </div>

                        </div>
                        <div class="divider" style="display:none"></div>
                        <div class="form-section right-section right-section-edit">
                            <div class="addtask-selection addtask-custom-label">
                                <label>
                                    <span class="required">Due date</span>
                                    <input type="date" id="dueDate" name="due-date" class="input-date" value="${task.dueDate}">
                                    <p id="duedate-error-msg" style="visibility: hidden;">This field is required</p>
                                </label>
                            </div>

                            <label class="addtask-custom-label">Prio</label>
                            <div class="addtask-selection">
                                <div class="addtask-prio-btn">
                                    <button class="addtask-buttons ${task.prio === 'urgent' ? 'is-active' : ''}" id="addtask-prio-urgent" style="${task.prio === 'urgent' ? 'background-color: #ff3d00;' : ''}">Urgent
                                        <img class="icon" src="/Join/assets/img/addtask_prio-urgent-icon.svg"
                                            alt="Prio Urgent">
                                    </button>
                                    <button class="addtask-buttons ${task.prio === 'medium' ? 'is-active' : ''}" id="addtask-prio-medium" style="${task.prio === 'medium' ? 'background-color: #ffa800;' : ''}">Medium
                                        <img class="icon" src="/Join/assets/img/addtask_prio-medium-icon.svg"
                                            alt="Prio Medium">
                                    </button>
                                    <button class="addtask-buttons ${task.prio === 'low' ? 'is-active' : ''}" id="addtask-prio-low" style="${task.prio === 'low' ? 'background-color: #7ae229;' : ''}">Low
                                        <img class="icon" src="/Join/assets/img/addtask_prio-low-icon.svg"
                                            alt="Prio Low">
                                    </button>
                                </div>
                            </div>

                            <div class="addtask-selection">
                                <label>
                                    <span class="required">Category</span>
                                    <div class="dropdown">
                                        <button id="dropdown-categories" class="dropbtn">${task.category || 'Select task category'}</button>
                                        <div id="dropdown-container" class="dropdown-ctrl">
                                            <div class="icon-background-down arrowDown" style="display: block;"></div>
                                            <div class="arrow-dropdown-down arrowDown" style="display: block;"></div>
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
                                                    <svg class="first-img" xmlns="http://www.w3.org/2000/svg" width="25"
                                                        height="24" viewBox="0 0 25 24" fill="none">
                                                        <line x1="7" y1="6" x2="18" y2="17" stroke="#2A3647"
                                                            stroke-width="2" stroke-linecap="round" />
                                                        <line x1="7" y1="17" x2="18" y2="6" stroke="#2A3647"
                                                            stroke-width="2" stroke-linecap="round" />
                                                    </svg>
                                                </div>
                                                <div class="divider-container">
                                                    <svg width="2" height="100%" viewBox="0 0 2 25"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <defs>
                                                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%"
                                                                y2="0%">
                                                                <stop offset="0%"
                                                                    style="stop-color: #cdcecf; stop-opacity: 0" />
                                                                <stop offset="50%"
                                                                    style="stop-color: #cdcecf; stop-opacity: 1" />
                                                                <stop offset="100%"
                                                                    style="stop-color: #cdcecf; stop-opacity: 0" />
                                                            </linearGradient>
                                                        </defs>
                                                        <rect width="2" height="100%" fill="url(#grad1)" />
                                                    </svg>
                                                </div>
                                                <div class="second-img-container">
                                                    <svg class="second-img" xmlns="http://www.w3.org/2000/svg"
                                                        width="25" height="24" viewBox="0 0 25 24" fill="none">
                                                        <path
                                                            d="M9.69474 15.15L18.1697 6.675C18.3697 6.475 18.6072 6.375 18.8822 6.375C19.1572 6.375 19.3947 6.475 19.5947 6.675C19.7947 6.875 19.8947 7.1125 19.8947 7.3875C19.8947 7.6625 19.7947 7.9 19.5947 8.1L10.3947 17.3C10.1947 17.5 9.96141 17.6 9.69474 17.6C9.42807 17.6 9.19474 17.5 8.99474 17.3L4.69474 13C4.49474 12.8 4.3989 12.5625 4.40724 12.2875C4.41557 12.0125 4.51974 11.775 4.71974 11.575C4.91974 11.375 5.15724 11.275 5.43224 11.275C5.70724 11.275 5.94474 11.375 6.14474 11.575L9.69474 15.15Z"
                                                            fill="#2A3647"></path>
                                                    </svg>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </label>

                                <div class="wrapper-flex-container wrapper-flex-container-edit">
                                    <div class="subtasks-container subtasks-container-edit">
                                        <div id="subtasks-list-container">
                                            <ul>
                                            ${subtasksHtml}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="addtask-actions addtask-actions-edit">
                        <div class="addtask-info info addtask-info-edit">This field is required</div>
                        <div class="addtask-action-btns">
                            <button id="save-task-edit" class="blue-btn">Ok
                                <img src="/Join/assets/icons/check.svg" alt="Create Task">
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
        </div>
    </main>

    `;

// Ersetzen des aktuellen Inhalts des Detail-Modals durch das Bearbeitungsformular
const detailModalContainer = document.getElementById('task-details');
if (detailModalContainer) {
    // Aktualisieren des Inhalts des Modals, ohne #assign-to zu befüllen
    detailModalContainer.innerHTML = modalContent;

    // Neuaufruf von renderAssignees(), um sicherzustellen, dass die Liste korrekt gerendert und Event-Listener zugeordnet sind
    renderAssignees();

    setTimeout(() => {
        const assignToContainer = document.getElementById('assign-to');
        if (assignToContainer) {
            assignToContainer.innerHTML = assigneesMarkup;
    
            // Binden der Event-Listener an alle Container und Überprüfung des geklickten Elements
            document.querySelectorAll('.dropdown-content-container').forEach((container) => {
                container.addEventListener('click', function(event) {
                    event.stopPropagation(); // Stoppt die Weiterleitung des Events
                    // Identifizieren des tatsächlichen Ziel-Elements, basierend auf der Klick-Aktion
                    let targetElement = event.target;
                    
                    // Bestimmung, ob das geklickte Element oder eines seiner Parent-Elemente die Checkbox oder der Name ist
                    if (targetElement.tagName.toLowerCase() === 'svg' || targetElement.closest('.dropdown-content-checkbox')) {
                        // Logik für Klick auf die Checkbox
                    } else if (targetElement.tagName.toLowerCase() === 'a' || targetElement.closest('.dropdown-content-name')) {
                        // Logik für Klick auf den Namen
                    }
                    
                    // Extraktion des Buchstabens und des Indexes
                    const containerIndex = Array.from(assignToContainer.children).indexOf(container);
                    let { letter, index } = extractLetterFromIndex(containerIndex);
                    toggleAssigneeStatus(letter, index);
                });
            });
    
            // console.log('Assign-to aktualisiert:', assignToContainer.innerHTML);
        } else {
            console.error('#assign-to wurde nach dem Einfügen des Modals nicht gefunden.');
        }
    }, 0);// Verzögerung sicherstellen, dass das DOM vollständig aktualisiert wurde
}

reinitializeEventListenersForEditModal();

}
function extractLetterFromIndex(globalIndex) {
    let runningIndex = 0;
    for (let letter in letterContainer) {
        if (letterContainer.hasOwnProperty(letter)) {
            if (globalIndex < runningIndex + letterContainer[letter].length) {
                return { letter: letter, index: globalIndex - runningIndex };
            }
            runningIndex += letterContainer[letter].length;
        }
    }
    return { letter: null, index: -1 }; // Falls kein passender Eintrag gefunden wurde
}
// Eventlister für das Klicken auf den Speicher-Button
function setupSaveTaskEditListener() {
    const saveButton = document.getElementById('save-task-edit');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            const taskId = document.querySelector('.addTask-content').getAttribute('data-task-id');
            saveTaskEdit(taskId);
        });
    }
}

function extractPriority() {
    const activeButton = document.querySelector('.addtask-prio-btn .is-active');
    if (!activeButton) return ''; // Kein aktiver Button gefunden, gibt einen leeren String zurück

    let priorityText = activeButton.innerText; // Extrahiert den Text des Buttons
    priorityText = priorityText.trim().toLowerCase(); // Entfernt Leerzeichen und konvertiert in Kleinbuchstaben

    return priorityText;
}

// Speichern des Tasks nach Änderungen im Edit-Modus
async function saveTaskEdit(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === parseInt(taskId));
    if (taskIndex === -1) {
        console.error('Aufgabe nicht gefunden.');
        return;
    }

    // Werte aus dem Formular extrahieren und die Aufgabe aktualisieren
    const title = document.getElementById('addtask-title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const category = document.getElementById('dropdown-categories').textContent;
    const priority = extractPriority() 

    // Extrahieren von Assignees
    const assignees = Array.from(document.querySelectorAll('.dropdown-content-container.user-checked')).map(assigneeContainer => {
    const name = assigneeContainer.querySelector('.dropdown-content-name').textContent;
    const color = assigneeContainer.querySelector('.dropdown-content-circle').style.backgroundColor;
    const initials = assigneeContainer.querySelector('#user-initials').textContent; // Angenommen, dass die Initialen im Element mit der ID user-initials stehen
    return { name, initials, color };
    });

    // Extrahieren von Subtasks, einschließlich neuer Subtasks
    const subtasks = Array.from(document.querySelectorAll('#subtasks-list-container ul li')).map(subtaskItem => {
        const text = subtaskItem.querySelector('p').textContent;
        const id = subtaskItem.dataset.subtaskId ? parseInt(subtaskItem.dataset.subtaskId) : Date.now(); // Verwenden Sie eine neue ID, wenn keine vorhanden ist
        const completed = subtaskItem.classList.contains('subtask-completed') ? 'done' : null; 
        return { id, text, completed };
    });

    // Aktualisieren der Aufgabe im tasks Array
    tasks[taskIndex].title = title;
    tasks[taskIndex].description = description;
    tasks[taskIndex].dueDate = dueDate;
    tasks[taskIndex].category = category;
    tasks[taskIndex].prio = priority;
    tasks[taskIndex].assignTo = assignees;
    tasks[taskIndex].subtask = subtasks;

    // Direktes Arbeiten mit dem aktualisierten Task-Objekt
    const updatedTask = tasks[taskIndex];

    try {
        await setItem('tasks', tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log('Aufgaben erfolgreich gespeichert.');

        // Schließe den Bearbeitungsmodus und zeige die Detailansicht des aktualisierten Tasks an
        openTaskDetailModal(updatedTask); // Verwendet die aktualisierte Task-Daten, um die Detailansicht zu öffnen

        reinitializeEventListenersForEditModal();
    

        // Zeige die Detailansicht des aktualisierten Tasks an
        const detailsContainer = document.getElementById('task-details');
        detailsContainer.innerHTML = detailModalContent(updatedTask); // Generiert und zeigt die aktualisierte Detailansicht

        // Aktualisiere die Board-Karten
        await initializeBoardCard();
    } catch (error) {
        console.error('Fehler beim Speichern der Aufgaben:', error);
    }

}

// Funktion zum Schließen des dynamischen Modals für Tasks-Editieren
function closeModalTaskEdit() {
    const modalEdit = document.getElementById('task-detail-modal');
    if (modalEdit) {
        modalEdit.classList.remove('modal-open'); // Startet die Schließanimation für den Inhalt
        setTimeout(() => {
            modalEdit.style.display = 'none'; // Versteckt den Hintergrund nach der Animation
        }, 500); // Wartezeit entspricht der Dauer der Animation
    }
}

// Event-Delegation für den Schließ-Button im Modal Tasks-Editieren einrichten
function setupModalCloseDelegationEdit() {
    const modalEditBtn = document.getElementById('close-modal-button-edittask');
    if (modalEditBtn) { // Überprüfung, ob das Element existiert
        modalEditBtn.addEventListener('click', function(event) {
            closeModalTaskEdit(); 
        });
    } else {
        return;
    }
}
