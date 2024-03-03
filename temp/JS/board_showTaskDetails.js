/**
 * Öffnet das Modal zur Anzeige der Task-Details.
 * @param {Object} task - Das Task-Objekt, dessen Details angezeigt werden sollen.
 */
function openTaskDetailModal(task) {
    const modal = document.getElementById('task-detail-modal');
    const detailsContainer = document.getElementById('task-details');
    detailsContainer.innerHTML = detailModalContent(task);
    modal.style.display = 'flex'; // Modal zuerst anzeigen
    setTimeout(() => { // Kurze Verzögerung, bevor die Klasse hinzugefügt wird, um die Transition zu ermöglichen
        modal.classList.add('modal-open');
    }, 10);
    setupDeleteTaskListener();
}

/**
 * Aktualisiert die Task-Details im Modal und bindet den Event Listener für Subtasks.
 * @param {Object} task - Das Task-Objekt, das im Detailmodal angezeigt wird.
 */
function updateTaskDetailsAndBindListener(task) {
    const detailsContainer = document.getElementById('task-details');
    detailsContainer.innerHTML = detailModalContent(task); 
    addSubtaskEventListener(); // Binden des Event Listeners, nachdem der Inhalt eingefügt wurde
}

/**
 * Generiert HTML für die Beschreibungsanzeige eines Tasks.
 * @param {Object} task - Das Task-Objekt.
 * @returns {string} HTML-String für die Beschreibungsanzeige.
 */
function generateDescriptionHtml(task) {
    return `<div class="task-detail-description">${task.description || 'Description: N/A'}</div>`;
}

/**
 * Generiert HTML für die Fälligkeitsdatum-Anzeige eines Tasks.
 * @param {Object} task - Das Task-Objekt.
 * @returns {string} HTML-String für die Fälligkeitsdatum-Anzeige.
 */
function generateDueDateHtml(task) {
    return `
        <div class="task-detail">
            <span class="detail-label">Due date:</span>
            <span class="detail-value">${task.dueDate}</span>
        </div>`;
}

/**
 * Generiert HTML für die Prioritätsanzeige eines Tasks.
 * @param {Object} task - Das Task-Objekt.
 * @returns {string} HTML-String für die Prioritätsanzeige.
 */
function generatePriorityHtml(task) {
    let imgHtml = taskImage(task) ? `<img style="margin-left: 4px;" src="./assets/icons/${taskImage(task)}" alt="Priority">` : '';
    return `
        <div class="task-detail">
            <span class="detail-label">Priority:</span>
            <span class="detail-value">${task.prio ? task.prio.charAt(0).toUpperCase() + task.prio.slice(1) : 'N/A'}</span>
        ${imgHtml}
        </div>`;
}

/**
 * Generiert das HTML für die Darstellung von Assignees.
 * Falls keine Assignees vorhanden sind, wird ein Platzhalter angezeigt.
 * 
 * @param {Object[]} assignees - Array von Assignee-Objekten mit Farbe und Initialen.
 * @returns {string} HTML-String mit den Darstellungen der Assignees oder einem Platzhalter.
 */
function generateAssigneesHtml(assignees) {  
    if (!assignees || assignees.length === 0) { // Prüft, ob das Array leer oder nicht definiert ist und gibt einen Platzhalter zurück
        return '<div class="detail-assignee-na">N/A</div>';
    } // Erstellt für jeden Assignee einen HTML-String und fügt sie zusammen
    return assignees.map(assignee => `
        <div class="dropdown-content-binding">
            <div class="dropdown-content-circle" style="background-color:${assignee.color};">
                <p id="user-initials">${assignee.initials}</p>
            </div>
            <div class="dropdown-content-name">
                ${assignee.name}
            </div>
        </div>
    `).join('');
}

/**
 * Erstellt den Kopfbereich der Detailansicht eines Tasks.
 * 
 * @param {Object} task - Task-Objekt mit Informationen wie ID und Kategorie.
 * @returns {string} HTML-String für den Kopfbereich der Detailansicht.
 */
function generateDetailHeader(task) {
    return `
    <div class="task-details-header" id="task-${task.id}">
        <div id="board-detail-title" class="board-card-label" style="background-color:${getLabelColor(task.category)};">${task.category}</div>
        <div id="close-modal-button-detail" class="add-tasks-modal-close">
            <div class="first-img-container modal-x-tpl">
                <svg class="first-img" xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                    <line x1="7" y1="6" x2="18" y2="17" stroke="#2A3647" stroke-width="2" stroke-linecap="round"></line>
                    <line x1="7" y1="17" x2="18" y2="6" stroke="#2A3647" stroke-width="2" stroke-linecap="round"></line>
                </svg>
            </div>
        </div>
        </div>
    `;
}

/**
 * Generiert den Fußbereich der Detailansicht eines Tasks.
 * 
 * @returns {string} HTML-String für den Fußbereich der Detailansicht.
 */
function generateDetailFooter() {
    return `
        <div class="detail-footer">
            <div class="subtask-icons-details">
                <div id="delete-task-button" class="details-footer-hover">
                    <svg class="custom-svg" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_75601_14777" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                            <rect x="0.144531" width="24" height="24" fill="#D9D9D9"></rect>
                        </mask>
                        <g mask="url(#mask0_75601_14777)">
                            <path d="M7.14453 21C6.59453 21 6.1237 20.8042 5.73203 20.4125C5.34036 20.0208 5.14453 19.55 5.14453 19V6C4.8612 6 4.6237 5.90417 4.43203 5.7125C4.24036 5.52083 4.14453 5.28333 4.14453 5C4.14453 4.71667 4.24036 4.47917 4.43203 4.2875C4.6237 4.09583 4.8612 4 5.14453 4H9.14453C9.14453 3.71667 9.24036 3.47917 9.43203 3.2875C9.6237 3.09583 9.8612 3 10.1445 3H14.1445C14.4279 3 14.6654 3.09583 14.857 3.2875C15.0487 3.47917 15.1445 3.71667 15.1445 4H19.1445C19.4279 4 19.6654 4.09583 19.857 4.2875C20.0487 4.47917 20.1445 4.71667 20.1445 5C20.1445 5.28333 20.0487 5.52083 19.857 5.7125C19.6654 5.90417 19.4279 6 19.1445 6V19C19.1445 19.55 18.9487 20.0208 18.557 20.4125C18.1654 20.8042 17.6945 21 17.1445 21H7.14453ZM7.14453 6V19H17.1445V6H7.14453ZM9.14453 16C9.14453 16.2833 9.24036 16.5208 9.43203 16.7125C9.6237 16.9042 9.8612 17 10.1445 17C10.4279 17 10.6654 16.9042 10.857 16.7125C11.0487 16.5208 11.1445 16.2833 11.1445 16V9C11.1445 8.71667 11.0487 8.47917 10.857 8.2875C10.6654 8.09583 10.4279 8 10.1445 8C9.8612 8 9.6237 8.09583 9.43203 8.2875C9.24036 8.47917 9.14453 8.71667 9.14453 9V16ZM13.1445 16C13.1445 16.2833 13.2404 16.5208 13.432 16.7125C13.6237 16.9042 13.8612 17 14.1445 17C14.4279 17 14.6654 16.9042 14.857 16.7125C15.0487 16.5208 15.1445 16.2833 15.1445 16V9C15.1445 8.71667 15.0487 8.47917 14.857 8.2875C14.6654 8.09583 14.4279 8 14.1445 8C13.8612 8 13.6237 8.09583 13.432 8.2875C13.2404 8.47917 13.1445 8.71667 13.1445 9V16Z"></path>
                        </g>
                    </svg>
                    <span class="detail-footer-text">Delete</span>
                </div>
                <div class="details-footer-hover"><img class="divider-subtask" src="./assets/img/divider_small.png"></div>
                <div id="edit-task" class="details-footer-hover">
                    <svg class="custom-svg" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_135789_4203" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
                            <rect x="0.682129" y="0.396729" width="24" height="24" fill="#D9D9D9"></rect>
                        </mask>
                        <g mask="url(#mask0_135789_4203)">
                            <path d="M5.68213 19.3967H7.08213L15.7071 10.7717L14.3071 9.37173L5.68213 17.9967V19.3967ZM19.9821 9.32173L15.7321 5.12173L17.1321 3.72173C17.5155 3.3384 17.9863 3.14673 18.5446 3.14673C19.103 3.14673 19.5738 3.3384 19.9571 3.72173L21.3571 5.12173C21.7405 5.50506 21.9405 5.96756 21.9571 6.50923C21.9738 7.0509 21.7905 7.5134 21.4071 7.89673L19.9821 9.32173ZM18.5321 10.7967L7.93213 21.3967H3.68213V17.1467L14.2821 6.54673L18.5321 10.7967Z"></path>
                        </g>
                    </svg>
                    <span class="detail-footer-text">Edit</span>
                </div>
            </div>
     </div>
    `;
}

/**
 * Erzeugt HTML-Strings für Subtasks.
 * @param {Object} task - Das Task-Objekt, zu dem die Subtasks gehören.
 * @param {Array} subtasks - Die Subtasks des Tasks.
 * @returns {string} Der generierte HTML-String für die Subtasks.
 */
function generateSubtasksHtml(task, subtasks) {
    if (!subtasks || subtasks.length === 0) {
        return ''; // Kein HTML, wenn keine Subtasks vorhanden sind
    }
    return subtasks.map(subtask => `
        <div id="subtask-container" class="dropdown-content-container details-subtasks">    
            <div onclick="toggleSubtaskCompleted(${task.id}, ${subtask.id})" class="dropdown-content-binding details-subtasks-content" data-task-id="${task.id}" data-subtask-id="${subtask.id}">
                <div class="dropdown-content-checkbox">
                    ${subtask.completed === 'done' ? `
                        <svg class="checkbox-checked-active" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.3882 11V17C20.3882 18.6569 19.045 20 17.3882 20H7.38818C5.73133 20 4.38818 18.6569 4.38818 17V7C4.38818 5.34315 5.73133 4 7.38818 4H15.3882" stroke="#2A3647" stroke-width="2" stroke-linecap="round"></path>
                            <path d="M8.38818 12L12.3882 16L20.3882 4.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>` : `
                        <svg class="checkbox-unchecked-normal" style="display:block" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="4.38818" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"></rect>
                        </svg>
                    `}
                </div>
                <div class="detail-subtask-name">${subtask.text}</div>
            </div>
        </div>
    `).join('');
}

/**
 * Rendert den Inhalt der Detailansicht für einen spezifischen Task.
 * @param {Object} task - Das Task-Objekt mit allen relevanten Daten.
 * @returns {string} - HTML-String, der den detaillierten Inhalt des Tasks darstellt.
 */
function detailModalContent(task) {
    let assigneesHtml = generateAssigneesHtml(task.assignTo);  // Bereitet HTML für Assignees vor, zeigt "N/A", wenn keine vorhanden sind
    let subtasksHtml = generateSubtasksHtml(task, task.subtask);  // Bereitet HTML für Subtasks vor, zeigt nichts, wenn keine vorhanden sind
    return `
    ${generateDetailHeader(task)}
        <div class="task-details-main-content">
            <div class="task-detail-headline">${task.title}</div>
            ${generateDescriptionHtml(task)}
            ${generateDueDateHtml(task)}
            ${generatePriorityHtml(task)}
              <div class="detail-assignees">Assigned To:</div>
            <div class="detail-assignee">${assigneesHtml}</div>
            ${subtasksHtml}
            ${generateDetailFooter()}
        </div>
    `;
}

/**
 * Löscht den aktuellen Task und aktualisiert die Ansicht.
 */
function deleteCurrentTask() {
    const taskHeaderElement = document.querySelector('.task-details-header');
    if (taskHeaderElement && taskHeaderElement.id) {
        const taskId = taskHeaderElement.id.replace('task-', '');
        if (taskId) {
            deleteTasks([parseInt(taskId)])
                .then(() => {
                    console.info('Task wurde erfolgreich gelöscht');
                    closeModal('task-detail-modal');
                    initializeBoardCard();
                })
                .catch(error => {
                    console.error('Fehler beim Löschen des Tasks:', error);
                });
        }
    }
}