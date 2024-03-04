/**
 * Generiert die Initialen aus dem vollständigen Namen einer Person.
 * @param {string} fullName - Der vollständige Name der Person.
 * @returns {string} Die Initialen der Person.
 */
function generateInitials(fullName) {
    return fullName.split(' ').map(part => part[0].toUpperCase()).join('');
}

/**
 * Generiert HTML-String für jeden dem Task zugewiesenen Benutzer.
 * @param {Array} assignees - Liste der dem Task zugewiesenen Benutzer.
 * @returns {string} HTML-String der zugewiesenen Benutzer.
 */
function generateAssignedUsersHtml(assignees) {
    return assignees.map(user =>
        `<div class="dropdown-content-circle" style="background-color: ${user.color};">${generateInitials(user.name)}</div>`
    ).join('');
}

/**
 * Generiert das SVG für die Checkbox basierend auf dem Zuweisungsstatus.
 * @param {boolean} isAssigned - Gibt an, ob der Kontakt dem Task zugewiesen ist.
 * @returns {string} SVG-String für die Checkbox.
 */
function generateCheckboxSVG(isAssigned) {
    return isAssigned ? 
        `<svg id="checkbox-checked-active" style="display:block" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.3882 11V17C20.3882 18.6569 19.045 20 17.3882 20H7.38818C5.73133 20 4.38818 18.6569 4.38818 17V7C4.38818 5.34315 5.73133 4 7.38818 4H15.3882" stroke="#fff" stroke-width="2" stroke-linecap="round"></path>
            <path d="M8.38818 12L12.3882 16L20.3882 4.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>` : 
        `<svg id="checkbox-unchecked-normal" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4.38818" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"></rect>
        </svg>`;
}

/**
 * Generiert das Markup für einen einzelnen Zuweisungseintrag.
 * @param {Object} contact - Kontaktinformationen.
 * @param {boolean} isAssigned - Gibt an, ob der Kontakt dem Task zugewiesen ist.
 * @returns {string} HTML-String für den Zuweisungseintrag.
 */
function generateAssigneeMarkup(contact, isAssigned) {
    const userCheckedClass = isAssigned ? 'user-checked' : '';
    const checkboxSVG = generateCheckboxSVG(isAssigned);
    const initials = generateInitials(contact.completeName);

    return `<div class="dropdown-content-container ${userCheckedClass}">
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
}

/**
 * Generiert HTML-String für die Zuweisungsliste im Bearbeitungsmodus.
 * @param {Object} task - Der zu bearbeitende Task.
 * @param {Object} letterContainer - Container mit Kontakten, gruppiert nach dem ersten Buchstaben des Namens.
 * @returns {string} HTML-String für die Zuweisungsliste.
 */
function generateAssigneesMarkup(task, letterContainer) {
    let assigneesMarkup = '';
    Object.keys(letterContainer).forEach(letter => {
        letterContainer[letter].forEach(contact => {
            const isAssigned = task.assignTo.some(assignee => assignee.name === contact.completeName);
            assigneesMarkup += generateAssigneeMarkup(contact, isAssigned);
        });
    });
    return assigneesMarkup;
}

/**
 * Generiert HTML-String für Subtasks im Bearbeitungsmodus.
 * @param {Array} subtasks - Liste der Subtasks des zu bearbeitenden Tasks.
 * @returns {string} HTML-String der Subtasks.
 */
function createSubtasksHtml(subtasks) {
    if (!Array.isArray(subtasks)) {
        console.info('subtasks is not an array:', subtasks);
        return ''; //
    }
    return subtasks.map(subtask =>
        `<li data-subtask-id="${subtask.id}">
            <div class="subtask-item-wrapper">
                <p>${subtask.text}</p>
                <div class="subtask-icons">
                    <img class="edit-subtask" src="./assets/img/edit_task.png">
                    <img class="divider-subtask" src="./assets/img/divider_small.png">
                    <img class="delete-subtask" src="./assets/img/delete-subtask.svg">
                </div>
            </div>
        </li>`
    ).join('');
}

/**
 * Rendert das Bearbeitungsformular für einen Task.
 * @param {number} taskId - Die ID des Tasks, der bearbeitet werden soll.
 */
function renderEditTask(taskId) {
    const task = tasks.find(t => t.id === parseInt(taskId));
    if (!task) {
        console.error("Task nicht gefunden.");
        return;
    }
    
    const assignedUsersHtml = generateAssignedUsersHtml(task.assignTo);
    const assigneesMarkup = generateAssigneesMarkup(task, letterContainer);
    const subtasksHtml = createSubtasksHtml(task.subtask);

    const modalContent = `
    <main class="addTask-content" data-task-id="${taskId}">
        <section id="addtask-content" class="task-edit-adjust">
            <div id="close-modal-button-edittask" class="add-tasks-modal-close add-tasks-modal-close-edit">
                <div class="first-img-container">
                    <svg class="first-img" xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <line x1="7" y1="6" x2="18" y2="17" stroke="#2A3647" stroke-width="2" stroke-linecap="round"></line>
                        <line x1="7" y1="17" x2="18" y2="6" stroke="#2A3647" stroke-width="2" stroke-linecap="round"></line>
                    </svg>
                </div>
            </div>
            <div class="form-wrapper">
                <form onsubmit="return false;" class="addtask-form-edit">
                    <div class="form-content">
                        <div class="form-section left-section">
                            <div class="addtask-selection addtask-custom-label">
                                <label>
                                    <span class="label-text required">Title</span>
                                    <input id="addtask-title" type="text" class="input-addtask-title addtask-title-input" placeholder="Enter a title" value="${task.title}">
                                    <p id="title-error-msg" style="visibility: hidden;">This field is required</p>
                                </label>
                            </div>
                            <div class="addtask-selection">
                                <label>
                                    <span>Description</span>
                                    <textarea class="textarea-description textarea" placeholder="Enter a description" name="decription" id="description">${task.description || ''}</textarea>
                                </label>
                            </div>
                            <div class="addtask-selection">
                                <label>
                                    <span>Assigned to</span>
                                    <div class="dropdown">
                                        <button id="dropdown-assignees" class="dropbtn">Select contacts to assign</button>
                                        <div class="dropdown-ctrl">
                                            <div class="icon-background-down arrowDown" style="display: block;"></div>
                                            <div class="arrow-dropdown-down arrowDown" style="display: block;"></div>
                                            <div class="icon-background-up arrowUp" style="display:none;"></div>
                                            <div class="arrow-dropdown-up arrowUp" style="display:none;"></div>
                                        </div>
                                        <div class="dropdown-content-assign-modal" id="assign-to" style="display: none;">
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
                                        <img class="icon" src="./assets/img/addtask_prio-urgent-icon.svg" alt="Prio Urgent">
                                    </button>
                                    <button class="addtask-buttons ${task.prio === 'medium' ? 'is-active' : ''}" id="addtask-prio-medium" style="${task.prio === 'medium' ? 'background-color: #ffa800;' : ''}">Medium
                                        <img class="icon" src="./assets/img/addtask_prio-medium-icon.svg" alt="Prio Medium">
                                    </button>
                                    <button class="addtask-buttons ${task.prio === 'low' ? 'is-active' : ''}" id="addtask-prio-low" style="${task.prio === 'low' ? 'background-color: #7ae229;' : ''}">Low
                                        <img class="icon" src="./assets/img/addtask_prio-low-icon.svg" alt="Prio Low">
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
                                        <div class="dropdown-content" id="category" style="display:none;"></div>
                                    </div>
                                    <p id="dropdown-categories-error-msg" style="visibility: hidden;">This field is required</p>
                                </label>
                            </div>
                            <div class="addtask-selection">
                                <label>
                                    <span>Subtask</span>
                                    <div class="input-area-custom">
                                        <input class="custom-input" type="text" id="subtask" name="subtask" placeholder="Add new subtask">
                                        <div class="subtask-ctrl">
                                            <div class="subtask-icons-before" style="display: block;">
                                                <div class="icon-background-down"></div>
                                                <div class="cross-dropdown-down"></div>
                                            </div>
                                            <div class="subtask-icons-after" style="display: none;">
                                                <div class="first-img-container">
                                                    <svg class="first-img" xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                                        <line x1="7" y1="6" x2="18" y2="17" stroke="#2A3647" stroke-width="2" stroke-linecap="round"></line>
                                                        <line x1="7" y1="17" x2="18" y2="6" stroke="#2A3647" stroke-width="2" stroke-linecap="round"></line>
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
                                                        <rect width="2" height="100%" fill="url(#grad1)"></rect>
                                                    </svg>
                                                </div>
                                                <div class="second-img-container">
                                                    <svg class="second-img" xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                                        <path d="M9.69474 15.15L18.1697 6.675C18.3697 6.475 18.6072 6.375 18.8822 6.375C19.1572 6.375 19.3947 6.475 19.5947 6.675C19.7947 6.875 19.8947 7.1125 19.8947 7.3875C19.8947 7.6625 19.7947 7.9 19.5947 8.1L10.3947 17.3C10.1947 17.5 9.96141 17.6 9.69474 17.6C9.42807 17.6 9.19474 17.5 8.99474 17.3L4.69474 13C4.49474 12.8 4.3989 12.5625 4.40724 12.2875C4.41557 12.0125 4.51974 11.775 4.71974 11.575C4.91974 11.375 5.15724 11.275 5.43224 11.275C5.70724 11.275 5.94474 11.375 6.14474 11.575L9.69474 15.15Z" fill="#2A3647"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                                <div class="wrapper-flex-container wrapper-flex-container-edit">
                                    <div class="subtasks-container subtasks-container-edit">
                                        <div id="subtasks-list-container">
                                            <ul>${subtasksHtml}</ul>
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
                                <img src="./assets/icons/check.svg" alt="Create Task">
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </main>
    `;

    const detailModalContainer = document.getElementById('task-details');
    if (detailModalContainer) {
        detailModalContainer.innerHTML = modalContent; // Aktualisieren des Inhalts des Modals, ohne #assign-to zu befüllen
        renderAssignees(); // Neuaufruf von renderAssignees(), um sicherzustellen, dass die Liste korrekt gerendert und Event-Listener zugeordnet sind
        setTimeout(() => {
            const assignToContainer = document.getElementById('assign-to');
            if (assignToContainer) {
                assignToContainer.innerHTML = assigneesMarkup;
                document.querySelectorAll('.dropdown-content-container').forEach((container) => { // Binden der Event-Listener an alle Container und Überprüfung des geklickten Elements
                    container.addEventListener('click', function(event) {
                        event.stopPropagation(); 
                        let targetElement = event.target; // Identifizieren des tatsächlichen Ziel-Elements, basierend auf der Klick-Aktion
                        if (targetElement.tagName.toLowerCase() === 'svg' || targetElement.closest('.dropdown-content-checkbox')) { // Logik für Klick auf die Checkbox
                        } else if (targetElement.tagName.toLowerCase() === 'a' || targetElement.closest('.dropdown-content-name')) { // Logik für Klick auf den Namen
                        }
                        const containerIndex = Array.from(assignToContainer.children).indexOf(container); // Extraktion des Buchstabens und des Indexes
                        let { letter, index } = extractLetterFromIndex(containerIndex);
                        toggleAssigneeStatus(letter, index);
                    });
                });
            } else {
                console.error('#assign-to wurde nach dem Einfügen des Modals nicht gefunden.');
            }
        }, 0); // Verzögerung sicherstellen, dass das DOM vollständig aktualisiert wurde
        reinitializeEventListenersForEditModal()
    }
}