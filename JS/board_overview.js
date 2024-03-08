/**
 * Updates the display of the number of to-do tasks.
 */
function numberOfTodos() {
    let toDos = document.getElementById('numberOfToDos');
    toDos.innerHTML = `<h1 class="tasks-number no-margin">${toDo.length}</h1>`;
}

/**
 * Updates the display of the number of completed tasks.
 */
function numberOfDone() {
    let dones = document.getElementById('numberOfDone');
    dones.innerHTML = `<h1 class="tasks-number no-margin">${done.length}</h1>`;
}

/**
 * Filters tasks based on their status.
 * @param {Array} filteredTasks - Array of filtered tasks.
 * @param {string} status - The status to be filtered by
 * @returns {Promise<Array>} - A Promise that returns an array of filtered tasks.
 */
async function fetchAndFilterTasks(filteredTasks, status) {
    let tasks = filteredTasks ? filteredTasks : await fetchTasks();
    return tasks.filter(task => task['state'] === status);
}

/**
 * Controls the display of the "No tasks" div
 * @param {HTMLElement} noTasksDiv - The div element that is displayed if there are no tasks.
 * @param {Array} tasks - Array of Tasks
 */
function displayNoTasksDiv(noTasksDiv, tasks) {
    noTasksDiv.style.display = tasks.length > 0 ? 'none' : 'flex';
}

/**
 * Fills the task container with task cards
 * @param {HTMLElement} container - The container for the task cards
 * @param {Array} tasks - Array of Tasks
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
 * Processes tasks for a specific status and updates the display accordingly
 * @param {Array} filteredTasks - Array of filtered tasks
 * @param {string} status - The status to be filtered by
 * @param {string} noTasksDivId - The ID of the "No tasks" div
 * @param {string} containerId - The ID of the container for the task cards
 */
async function processTasksForStatus(filteredTasks, status, noTasksDivId, containerId) {
    let tasks = await fetchAndFilterTasks(filteredTasks, status);
    let noTasksDiv = document.getElementById(noTasksDivId);
    let container = document.getElementById(containerId);
    displayNoTasksDiv(noTasksDiv, tasks);
    populateTaskContainer(container, tasks);
}

/**
 * Updates the progress of the subtasks for a given task
 * @param {Object} task - The task whose subtask progress is to be updated
 * @returns {Object} Ein Objekt mit dem Prozentsatz des Fortschritts und einem Text, der den Fortschritt angibt
 */
function updateSubtaskProgress(task) {
    let totalSubtasks = task.subtask ? task.subtask.length : 0; // First check whether the task has subtasks. If so, determine the total number of subtasks
    let completedSubtasks = task.subtask ? task.subtask.filter(subtask => subtask.completed === 'done').length : 0; // Determine the number of completed subtasks
    let completionPercentage = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0; // Calculate the percentage of completed subtasks.
    return {
        completionPercentage,
        subtaskText: totalSubtasks > 0 ? `${completedSubtasks}/${totalSubtasks} Subtasks` : 'No Subtasks'
    }; // The function returns an object that contains two properties:
}

/**
 * Determines the screen based on the priority of the task.
 * @param {Object} task - The task object for which the image is determined.
 * @returns {string|null} The file name of the image or zero if no priority is set.
 */
function taskImage(task) {
    if (task.prio === 'low') {
        return 'prio_low.svg';
    } else if (task.prio === 'medium') {
        return 'prio_medium.svg';
    } else if (task.prio === 'urgent') {
        return 'prio_high.svg';
    } else {
        return null; // No image for 'N/A' or zero values
    }
}

/**
 * Generates the HTML string for the footer of the assignments (assignees) in the board map.
 * @param {Object} task - The task object whose assignees are to be rendered.
 * @returns {string} HTML string for the footer of the assignees
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
 * Determines the colour of the category label based on the category of the task.
 * @param {string} category - The category of Tasks
 * @returns {string} Colour code for the category label.
 */
function getLabelColor(category) {
    const labelCol1 = '#0038ff';
    const labelCol2 = '#1FD7C1';

    return category === 'Technical Task' ? labelCol1 : labelCol2;
}

/**
 * Generates the HTML string for the subtask display in the board map.
 * @param {Object} task - The task object whose subtasks are to be rendered.
 * @param {Object} completionDetails - Details on the progress of the subtasks.
 * @returns {string} HTML string for the subtask display.
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
 * Creates the HTML content for a board map based on a task.
 * @param {number} i - Index of the task in the array, serves as part of the ID.
 * @param {Object} task - The task object for which the content is created.
 * @param {Object} completionDetails - Details on the progress of the subtasks.
 * @returns {string} HTML string for the board card.
 */
function renderCardContent(i, task, completionDetails) {
    let tasksImg = taskImage(task);
    let imgHtml = tasksImg ? `<div class="board-card-footer-prio"><img src="./assets/icons/${tasksImg}" alt="Prio Symbol"></div>` : '';
    let assigneesFooter = createAssigneesFooter(task);
    let description = task.description ? task.description : "";
    let subtaskContent = createSubtaskContent(task, completionDetails);
    return /*html*/ `
    <div id="${task.state}-card-content${i}" draggable="true" class="board-card-content" ondragstart="startDragging(${task.identifier}, '${task.state}', ${i})";>
        <div class="board-card" data-task-id="${task.id}">
            <span id="${task.state}-move-icon-container${i}" class="move-icon-container"><svg xmlns="http://www.w3.org/2000/svg" class="move-icon" viewBox="0 0 512 512"><path fill="" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M176 112l80-80 80 80M255.98 32l.02 448M176 400l80 80 80-80M400 176l80 80-80 80M112 176l-80 80 80 80M32 256h448"/></svg></span>
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
 * Changes the completion status of a subtask.
 * @param {number} taskId - The ID of the parent task.
 * @param {number} subtaskId - The ID of the subtask.
 * @returns {Object|null} - The updated task object or null if not found.
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