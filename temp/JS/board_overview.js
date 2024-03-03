/**
 * Aktualisiert die Anzeige der Anzahl von To-Do-Tasks.
 */
function numberOfTodos() {
    let toDos = document.getElementById('numberOfToDos');
    toDos.innerHTML = `<h1 class="tasks-number no-margin">${toDo.length}</h1>`;
}

/**
 * Aktualisiert die Anzeige der Anzahl von abgeschlossenen Tasks.
 */
function numberOfDone() {
    let dones = document.getElementById('numberOfDone');
    dones.innerHTML = `<h1 class="tasks-number no-margin">${done.length}</h1>`;
}

/**
 * Filtert Tasks basierend auf ihrem Status.
 * @param {Array} filteredTasks - Array von gefilterten Tasks.
 * @param {string} status - Der Status, nach dem gefiltert werden soll.
 * @returns {Promise<Array>} Eine Promise, die ein Array von gefilterten Tasks zurückgibt.
 */
async function fetchAndFilterTasks(filteredTasks, status) {
    let tasks = filteredTasks ? filteredTasks : await fetchTasks();
    return tasks.filter(task => task['state'] === status);
}

/**
 * Steuert die Anzeige des "Keine Tasks"-Divs.
 * @param {HTMLElement} noTasksDiv - Das Div-Element, das angezeigt wird, wenn keine Tasks vorhanden sind.
 * @param {Array} tasks - Array von Tasks.
 */
function displayNoTasksDiv(noTasksDiv, tasks) {
    noTasksDiv.style.display = tasks.length > 0 ? 'none' : 'flex';
}

/**
 * Füllt den Task-Container mit Task-Karten.
 * @param {HTMLElement} container - Der Container für die Task-Karten.
 * @param {Array} tasks - Array von Tasks.
 */
function populateTaskContainer(container, tasks) {
    if (container) {
        container.innerHTML = '';
        tasks.forEach((task, i) => {
        let completionDetails = updateSubtaskProgress(task);
        container.innerHTML += renderCardContent(i, task, completionDetails);
    });
    } else {
        console.info('Der Container wurde nicht gefunden.');
    }
}

/**
 * Verarbeitet Tasks für einen bestimmten Status und aktualisiert die Anzeige entsprechend.
 * @param {Array} filteredTasks - Array von gefilterten Tasks.
 * @param {string} status - Der Status, nach dem gefiltert werden soll.
 * @param {string} noTasksDivId - Die ID des "Keine Tasks"-Divs.
 * @param {string} containerId - Die ID des Containers für die Task-Karten.
 */
async function processTasksForStatus(filteredTasks, status, noTasksDivId, containerId) {
    let tasks = await fetchAndFilterTasks(filteredTasks, status);
    let noTasksDiv = document.getElementById(noTasksDivId);
    let container = document.getElementById(containerId);
    displayNoTasksDiv(noTasksDiv, tasks);
    populateTaskContainer(container, tasks);
}

/**
 * Aktualisiert den Fortschritt der Subtasks für einen gegebenen Task.
 * @param {Object} task - Der Task, dessen Subtask-Fortschritt aktualisiert werden soll.
 * @returns {Object} Ein Objekt mit dem Prozentsatz des Fortschritts und einem Text, der den Fortschritt anzeigt.
 */
function updateSubtaskProgress(task) {
    let totalSubtasks = task.subtask ? task.subtask.length : 0;// Prüfe zunächst, ob der Task Subtasks hat. Wenn ja, ermittle die Gesamtanzahl der Subtasks.
    let completedSubtasks = task.subtask ? task.subtask.filter(subtask => subtask.completed === 'done').length : 0; // Ermittle die Anzahl der abgeschlossenen Subtasks.
    let completionPercentage = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;// Berechne den Prozentsatz der abgeschlossenen Subtasks.
    return {
        completionPercentage,
        subtaskText: totalSubtasks > 0 ? `${completedSubtasks}/${totalSubtasks} Subtasks` : 'No Subtasks'
    };// Die Funktion gibt ein Objekt zurück, das zwei Eigenschaften enthält:
}

/**
 * Bestimmt das Bild basierend auf der Priorität des Tasks.
 * @param {Object} task - Das Task-Objekt, für das das Bild bestimmt wird.
 * @returns {string|null} Der Dateiname des Bildes oder null, wenn keine Priorität gesetzt ist.
 */
function taskImage(task) {
    if (task.prio === 'low') {
        return 'prio_low.svg';
    } else if (task.prio === 'medium') {
        return 'prio_medium.svg';
    } else if (task.prio === 'high') {
        return 'prio_high.svg';
    } else {
        return null;// Kein Bild für 'N/A' oder null-Werte
    }
}

/**
 * Erzeugt den HTML-String für die Fußzeile der Zuweisungen (Assignees) in der Board-Karte.
 * @param {Object} task - Das Task-Objekt, dessen Assignees gerendert werden sollen.
 * @returns {string} HTML-String für die Fußzeile der Assignees.
 */
function createAssigneesFooter(task) {
    let assigneesFooter = '';
    if (task.assignTo && task.assignTo.length > 0) {
        task.assignTo.forEach(assignee => {
            assigneesFooter += `<div class="board-content-circle" style="background-color: ${assignee.color};">${assignee.initials}</div>`;
        });
    }
    return assigneesFooter;
}

/**
 * Bestimmt die Farbe der Kategorie-Label basierend auf der Kategorie des Tasks.
 * @param {string} category - Die Kategorie des Tasks.
 * @returns {string} Farbcode für das Kategorie-Label.
 */
function getLabelColor(category) {
    const labelCol1 = '#0038ff';
    const labelCol2 = '#1FD7C1';

    return category === 'Technical Task' ? labelCol1 : labelCol2;
}

/**
 * Erzeugt den HTML-String für die Subtask-Anzeige in der Board-Karte.
 * @param {Object} task - Das Task-Objekt, dessen Subtasks gerendert werden sollen.
 * @param {Object} completionDetails - Details zum Fortschritt der Subtasks.
 * @returns {string} HTML-String für die Subtask-Anzeige.
 */
function createSubtaskContent(task, completionDetails) {
    return (task.subtask && task.subtask.length > 0) ?
        /*html*/ `<div class="board-card-progress">
            <div id="progress-bar-container" style="background-color: #F4F4F4; width: 120px; height: 8px; border-radius: 4px;">
                <div id="progress-bar" style="height: 8px; border-radius: 4px; background-color: #4589FF; width: ${completionDetails.completionPercentage}%;"></div>
            </div>
            <div class="board-card-progress-text">${completionDetails.subtaskText}</div>
        </div>` : '';
}

/**
 * Erstellt den HTML-Content für eine Board-Karte basierend auf einem Task.
 * @param {number} i - Index des Tasks im Array, dient als Teil der ID.
 * @param {Object} task - Das Task-Objekt, für das der Inhalt erstellt wird.
 * @param {Object} completionDetails - Details zum Fortschritt der Subtasks.
 * @returns {string} HTML-String für die Board-Karte.
 */
function renderCardContent(i, task, completionDetails) {
    let tasksImg = taskImage(task);
    let imgHtml = tasksImg ? `<div class="board-card-footer-prio"><img src="./assets/icons/${tasksImg}" alt="Prio Symbol"></div>` : '';
    let assigneesFooter = createAssigneesFooter(task);
    let description = task.description ? task.description : "";
    let subtaskContent = createSubtaskContent(task, completionDetails);
    return /*html*/ `
    <div id="${task.state}-card-content${i}" draggable="true" class="board-card-content" ondragstart="startDragging(${task.identifier}, '${task.state}', ${i})">
        <div class="board-card" data-task-id="${task.id}">
            <div class="board-card-label" style="background-color: ${getLabelColor(task.category)}">${task.category}</div>
            <div class="board-card-title">${task.title}</div>
            <div class="board-card-description">${description}</div>
            ${subtaskContent}
            <div class="board-card-footer">
                <div class="board-card-footer-assignees">${assigneesFooter}</div>
                ${imgHtml}
            </div>
        </div>
    </div>`;
}

/**
 * Wechselt den Abschlussstatus eines Subtasks.
 * @param {number} taskId - Die ID des übergeordneten Tasks.
 * @param {number} subtaskId - Die ID des Subtasks.
 * @returns {Object|null} Das aktualisierte Task-Objekt oder null, falls nicht gefunden.
 */
async function toggleSubtaskCompleted(taskId, subtaskId) {
    let task = tasks.find(task => task.id === taskId);
    if (task) {
        let subtask = task.subtask.find(subtask => subtask.id === subtaskId);
        if (subtask) {
            // Status umschalten
            subtask.completed = subtask.completed === 'done' ? '' : 'done';
            await setItem('tasks', JSON.stringify(tasks));
            initializeBoardCard();
            openTaskDetailModal(task);

            return task;
        }
    }
    return null;
}