let toDo = []
let inProgress = []
let AwaitFeedback = []
let done = []

async function fetchTasks() {
    try {
        // Abrufen der Tasks als String
        let tasks = await getItem('tasks'); 

        // Versuchen, den String zu parsen, um ein JavaScript-Array zu erhalten
        try {
            tasks = JSON.parse(tasks);
        } catch (error) {
            console.error('Fehler beim Parsen der Tasks:', error);
            return []; // Bei einem Fehler ein leeres Array zurückgeben
        }

        if (!Array.isArray(tasks)) {
            console.error('Die abgerufenen Daten sind kein Array.');
            return []; // Sicherstellen, dass das Ergebnis ein Array ist
        }

        // Hier können Sie jetzt auf Ihre Tasks zugreifen und diese verarbeiten
        console.log('Abgerufene Tasks:', tasks);
        return tasks;
    } catch (error) {
        console.error('Fehler beim Abrufen der Tasks:', error);
        return []; // Bei einem Fehler ein leeres Array zurückgeben
    }
}

// Aufrufen der Funktion zum Abrufen der Tasks
fetchTasks();

async function categorizeTasks() {
    let tasks = await fetchTasks(); // Annahme, dass fetchTasks die Tasks zurückgibt

    // Leere die Arrays, um Duplikate bei wiederholten Aufrufen zu vermeiden
    toDo = [];
    inProgress = [];
    awaitFeedback = [];
    done = [];

    tasks.forEach(task => {
        switch(task.state) {
            case 'toDo':
                toDo.push(task);
                break;
            case 'inProgress':
                inProgress.push(task);
                break;
            case 'awaitFeedback':
                awaitFeedback.push(task);
                break;
            case 'done':
                done.push(task);
                break;
        }
    });

}

async function initializeBoard() {
    await categorizeTasks(); // Tasks sortieren und in Arrays einordnen

}

// Tasks anzeigen

async function initializeBoardCard() {
    let tasks = await fetchTasks(); // Annahme: fetchTasks gibt ein Array von Tasks zurück

    let noTasksDiv = document.getElementById('board-card-background-1');
    let taskCardsContainer = document.getElementById('task-cards-container');

    if (tasks.length === 0) {
        noTasksDiv.style.display = 'block';
        taskCardsContainer.innerHTML = '';
    } else {
        noTasksDiv.style.display = 'none';
        let cardHTML = tasks.map(task => {
            let completionDetails = updateSubtaskProgress(task);
            return renderCardContent(task, completionDetails);
        }).join('');
        taskCardsContainer.innerHTML = cardHTML;
    }
    setupTaskClickListeners();
}

function updateSubtaskProgress(task) {
    let totalSubtasks = task.subtask ? task.subtask.length : 0;
    let completedSubtasks = task.subtask ? task.subtask.filter(subtask => subtask.completed === 'done').length : 0;
    let completionPercentage = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

    // Berechne und gib die notwendigen Details zurück
    return {
        completionPercentage,
        subtaskText: totalSubtasks > 0 ? `${completedSubtasks}/${totalSubtasks} Subtasks` : 'No Subtasks'
    };
}

function taskImage(task) {
    if (task.prio === 'low') return 'prio_low.svg';
    else if (task.prio === 'medium') return 'prio_medium.svg';
    else return 'prio_high.svg';
}

// Funktion, um die Farbe basierend auf der Kategorie zu bestimmen
function getLabelColor(category) {
    const labelCol1 = '#0038ff'; // Farbe für "Technical Task"
    const labelCol2 = '#1FD7C1'; // Farbe für andere Kategorien

    return category === 'Technical Task' ? labelCol1 : labelCol2;
}

function renderCardContent(task, completionDetails) {
    let tasksImg = taskImage(task);
    let assigneesFooter = '';

    // Verarbeite assignTo nur, wenn es existiert
    if (task.assignTo && task.assignTo.length > 0) {
        task.assignTo.forEach(assignee => {
            assigneesFooter += `<div class="board-content-circle" style="background-color: ${assignee.color};">${assignee.initials}</div>`;
        });
    }

    // Setze die Beschreibung auf einen leeren String, falls nicht vorhanden
    let description = task.description ? task.description : "";

    // Bereite die Anzeige der Subtasks vor, nur wenn vorhanden
    let subtaskContent = (task.subtask && task.subtask.length > 0) ? 
        `<div class="board-card-progress">
            <div id="progress-bar-container" style="background-color: #F4F4F4; width: 164px; height: 8px; border-radius: 4px;">
                <div id="progress-bar" style="height: 8px; border-radius: 4px; background-color: #4589FF; width: ${completionDetails.completionPercentage}%;"></div>
            </div>
            <div class="board-card-progress-text">${completionDetails.subtaskText}</div>
        </div>` : '';

    return `
    <div class="board-card-content">
        <div class="board-card" data-task-id="${task.id}">
            <div class="board-card-label" style="background-color: ${getLabelColor(task.category)}">${task.category}</div>
            <div class="board-card-title">${task.title}</div>
            <div class="board-card-description">${description}</div>
            ${subtaskContent}
            <div class="board-card-footer">
                <div class="board-card-footer-assignees">${assigneesFooter}</div>
                <div class="board-card-footer-prio"><img src="/Join/assets/icons/${tasksImg}" alt="Prio Symbol"></div>
            </div>
        </div>
    </div>`;
}

// Tasks erstellen
function setupCreateTaskListener() {
    const createTaskButton = document.getElementById('create-task');
    if (createTaskButton) {
        createTaskButton.addEventListener('click', async function() {
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

// Show Tasks Details Bereich
function openTaskDetailModal(task) {
    const modal = document.getElementById('task-detail-modal');
    const detailsContainer = document.getElementById('task-details');
    modal.classList.add('modal-open'); // Fügt die Klasse hinzu, um das Modal anzuzeigen

    detailsContainer.innerHTML = detailModalContent(task)
    modal.style.display = 'flex'; // Modal anzeigen
    // Reinitialisieren der EventListener
    setupDeleteTaskListener();
}

function detailModalContent(task){
    // Erzeugen des Assignee-HTML-Strings, falls Assignees vorhanden sind
    const assigneesHtml = task.assignTo && task.assignTo.length > 0 ? generateAssigneesHtml(task.assignTo) : '';
    // Erzeugen des Subtask-HTML-Strings, falls Subtasks vorhanden sind
    const subtasksHtml = task.subtask && task.subtask.length > 0 ? generateSubtasksHtml(task, task.subtask) : ''; // Hier wird `task` übergeben
    let tasksImg = taskImage(task);
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
        <div class="task-details-main-content">
            <div class="task-detail-headline">${task.title}</div>
            <div class="task-detail-description">${task.description || 'No description'}</div>
            <div class="task-detail">
                <span class="detail-label">Due date:</span>
                <span class="detail-value">${task.dueDate}</span>
            </div>
            <div class="task-detail">
                <span class="detail-label">Priority:</span>
                <span class="detail-value">${task.prio}</span>
                <img style="margin-left: 4px;" src="/Join/assets/icons/${tasksImg}" alt="Priority">
            </div>
            <div class="detail-assignees">Assigned To:</div>
            <div class="detail-assignee">
                ${assigneesHtml}
            </div>

            <div class="detail-subtasks"><span>Subtasks</span></div>
            <div class="details-subtasks-binding">
                    ${subtasksHtml}
            </div>
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
                    <div class="details-footer-hover">
                        <svg class="custom-svg" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0_135789_4203" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
                                <rect x="0.682129" y="0.396729" width="24" height="24" fill="#D9D9D9"></rect>
                            </mask>
                            <g mask="url(#mask0_135789_4203)">
                                <path d="M5.68213 19.3967H7.08213L15.7071 10.7717L14.3071 9.37173L5.68213 17.9967V19.3967ZM19.9821 9.32173L15.7321 5.12173L17.1321 3.72173C17.5155 3.3384 17.9863 3.14673 18.5446 3.14673C19.103 3.14673 19.5738 3.3384 19.9571 3.72173L21.3571 5.12173C21.7405 5.50506 21.9405 5.96756 21.9571 6.50923C21.9738 7.0509 21.7905 7.5134 21.4071 7.89673L19.9821 9.32173ZM18.5321 10.7967L7.93213 21.3967H3.68213V17.1467L14.2821 6.54673L18.5321 10.7967Z"></path>
                            </g>
                        </svg>
                        <span id="edit-task" class="detail-footer-text">Edit</span>
                    </div>
                </div>
            </div>
        </div>
`
}

// Funktion zur Erzeugung des HTML-Strings für Assignees
function generateAssigneesHtml(assignees) {
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

// Funktion zur Erzeugung des HTML-Strings für Subtasks
function generateSubtasksHtml(task, subtasks) {
    return subtasks.map(subtask => `
    <div class="dropdown-content-container details-subtasks">    
        <div class="dropdown-content-binding details-subtasks-content" data-subtask-id="${subtask.id}">
            <div class="dropdown-content-checkbox" data-task-id="${task.id}" data-subtask-id="${subtask.id}">
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
            <div class="detail-subtask-name">
                ${subtask.text}
            </div>
        </div>
    </div>
    `).join('');
}

// Eventlistner für Modals

// Funktion zum öffnen der Board Card
function setupTaskClickListeners() {
    document.querySelectorAll('.board-card').forEach(card => {
        card.addEventListener('click', function() {
            const taskId = this.getAttribute('data-task-id');
            const task = tasks.find(task => task.id.toString() === taskId); // `tasks` sollte dein Array von Task-Objekten sein
            if (task) {
                openTaskDetailModal(task);
            }
        });
    });
}
// Schließt die Board Card
function setupCloseTaskDetailModalListener() {
    const closeTaskDetailButton = document.getElementById('close-modal-button-detail');
    if (closeTaskDetailButton) {
        closeTaskDetailButton.addEventListener('click', () => closeModal('task-detail-modal'));
    }
}

async function toggleSubtaskCompleted(taskId, subtaskId) {
    let task = tasks.find(task => task.id === taskId);
    if (task) {
        let subtask = task.subtask.find(subtask => subtask.id === subtaskId);
        if (subtask) {
            subtask.completed = subtask.completed === 'done' ? null : 'done';
            await setItem('tasks', JSON.stringify(tasks)); // Speichere die geänderten Tasks
            initializeBoardCard(); // Aktualisiere das Board
            return task; // Rückgabe des aktualisierten Task-Objekts
        }
    }
    return null; // Rückgabe null, falls keine Änderung erfolgt ist
}

function setupSubtaskCompletionListener() {
    document.addEventListener('click', async function(event) {
        // Zuerst versuchen wir, das Task-Element im Bearbeitungsmodus zu identifizieren.
        let taskIdElement = document.querySelector('.addTask-content[data-task-id]');

        // Dann prüfen wir, ob das geklickte Element oder eines seiner übergeordneten Elemente ein Subtask-Element ist.
        let subtaskElement = event.target.closest('[data-subtask-id]');

        // Wenn wir sowohl ein Task-Element als auch ein Subtask-Element haben...
        if (taskIdElement && subtaskElement) {
            const taskId = taskIdElement.dataset.taskId;
            const subtaskId = subtaskElement.dataset.subtaskId;

            // Überprüfen, ob der Klick auf eine Checkbox innerhalb des Subtask-Elements erfolgt ist
            if (event.target.matches('.subtask-checkbox')) {
               const updatedTask = await toggleSubtaskCompleted(parseInt(taskId), parseInt(subtaskId));
                if (updatedTask) {
                    openTaskDetailModal(updatedTask); // Öffne das Modal mit dem aktualisierten Task
                }
            }
        }
    });
}

// Funktion zum Einrichten des EventListeners für den "Delete"-Button
function setupDeleteTaskListener() {
    console.log('Setup Delete Task Listener');
    const deleteButton = document.getElementById('delete-task-button');
    if (deleteButton) {
        deleteButton.addEventListener('click', deleteCurrentTask);
        console.log('Delete-Listener hinzugefügt');
    } else {
        console.warn('Delete-Button wurde nicht gefunden.');
    }
}

// Funktion zum Löschen des aktuellen Tasks
function deleteCurrentTask() {
    console.log('Delete Task ausgelöst');
    const taskHeaderElement = document.querySelector('.task-details-header');
    if (taskHeaderElement && taskHeaderElement.id) {
        const taskId = taskHeaderElement.id.replace('task-', '');
        console.log('Löschende Task ID:', taskId); // Hinzugefügt zur Überprüfung
        if (taskId) {
            deleteTasks([parseInt(taskId)])
                .then(() => {
                    console.log('Task wurde erfolgreich gelöscht');
                    closeModal('task-detail-modal'); // Korrigiert mit korrekter ID
                    initializeBoardCard();
                    // Weitere Aktionen nach dem Löschen
                })
                .catch(error => {
                    console.error('Fehler beim Löschen des Tasks:', error);
                });
        }
    }
}

function reinitializeEventListenersForEditModal() {
    console.log('Reinitializing event listeners...');
    checkInputFields();
    saveInputFields();
    handlePrioButtons();
    inputSubtask();
    addSubTask();
    setupEventListenersSubtasks();
    renderAssignees();
    setupAssigneeGlobalClickListener();
    setupAssigneeDropdownToggleListener();
    initCategoryDropdown();
    setupCategoryDropdownEventListeners();
    setupModalCloseDelegationEdit();
    setupModalCloseDelegationAddAtskBoard();
    setupDeleteTaskListener();
}

document.addEventListener('DOMContentLoaded', () => {
    initializeBoard();
    initializeBoardCard();
    setupCreateTaskListener();
    setupTaskClickListeners();
    setupCloseTaskDetailModalListener();
    setupOpenAddTaskModalListener();
    setupCloseAddTaskModalListener();
    setupModalCloseDelegation();
    setupSubtaskCompletionListener();
    setupEditTaskListener();
    setupModalCloseDelegationEdit();
    setupModalCloseDelegationAddAtskBoard();
    setupDeleteTaskListener();
    numberOfTodos();
});

function numberOfTodos(){
    let toDos = document.getElementById('numberOfToDos');
    toDos.innerHTML = `<h1 class="tasks-number no-margin">${toDo.length}</h1>`;
  }

  function numberOfDone(){
    let dones = document.getElementById('numberOfDone')
    dones.innerHTML = `<h1 class="tasks-number no-margin">${done.length}</h1>`;
  }