let todos;
let inProgress;
let awaitFeedback;
let done;
let currentDraggedElement;
let noTasksDiv;
let noTaskDiv2;
let noTaskDiv3;
let noTaskDiv4;
let toDoCardsContainer;
let inProgressCardContainer;
let awaitFeedBackCardContainer;
let doneCardContainer;


/**
 * Retrieve the saved tasks from remote storage.
 * @returns {Promise<Array>} A Promise that returns an array of tasks.
 */
async function fetchTasks() {
    try {
        let tasks = await getItem('tasks');// Retrieve the tasks as a string
        try {
            tasks = JSON.parse(tasks); // Trying to parse the string to get a JavaScript array
        } catch (error) {
            console.error('Error parsing the tasks:', error);
            return []; // Return an empty array on error
        }
        if (!Array.isArray(tasks)) {
            console.error('The data retrieved is not an array.');
            return []; // Make sure the result is an array
        }
        return tasks;
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        return []; // Return an empty array on error
    }
}

/**
 * Initializes the board by reloading all cards.
 */
async function initializeBoard() {
    await initializeBoardCard()
}

/**
 * Reinitializes the board by re-rendering all task cards based on filter state.
 * @param {Array} [filteredTasks=null] - Optional. Array of filtered tasks.
 */

async function initializeBoardCard(filteredTasks = null) {
    let tasks = filteredTasks ? filteredTasks : await fetchTasks();
    getNoTaskDivs();
    getCardContainers();
    await filterTodos(tasks);
    await filterInProgress(tasks)
    await filterAwaitFeedback(tasks);
    await filterDone(tasks);
    setupTaskClickListeners();
}

/**
 * This function takes all banners with the message 'No Tasks Div' and saves them to a global variable;
 */
function getNoTaskDivs() {
    noTasksDiv = document.getElementById('board-card-background-1');
    noTaskDiv2 = document.getElementById('board-card-background-2');
    noTaskDiv3 = document.getElementById('board-card-background-3');
    noTaskDiv4 = document.getElementById('board-card-background-4');
}

/**
 * This function takes all Tasks Cards containers and saves them to a global variable;
 */
function getCardContainers() {
    toDoCardsContainer = document.getElementById('toDo');
    inProgressCardContainer = document.getElementById('in-progress');
    awaitFeedBackCardContainer = document.getElementById('await-feedback');
    doneCardContainer = document.getElementById('done');
}

/**
 * This function filters the elements of the Tasks array and retrieves only the elements with the status 'toDo'.
 * Then it inserts the tasks into the container with ID "toDo".
 */
async function filterTodos(tasks) {
    todos = tasks.filter(t => t['state'] == 'toDo');
    if (todos.length > 0) {
        noTasksDiv.style.display = 'none';
    } else {
        noTasksDiv.style.display = 'flex';
    }
    toDoCardsContainer.innerHTML = '';
    for (let i = 0; i < todos.length; i++) {
        let task = todos[i]
        let completionDetails = updateSubtaskProgress(task);
        toDoCardsContainer.innerHTML += renderCardContent(i, task, completionDetails);
    }
}

/**
 * This function filters the elements of the Tasks array and retrieves only the elements with the status 'in-progress'.
 * Then it inserts the tasks into the container with ID "in-progress".
 */
async function filterInProgress(tasks) {
    inProgress = tasks.filter(inPr => inPr['state'] == 'in-progress');
    if (inProgress.length > 0) {
        noTaskDiv2.style.display = 'none';
    } else {
        noTaskDiv2.style.display = 'flex';
    }
    inProgressCardContainer.innerHTML = '';
    for (let i = 0; i < inProgress.length; i++) {
        let task = inProgress[i];
        let completionDetails = updateSubtaskProgress(task);
        inProgressCardContainer.innerHTML += renderCardContent(i, task, completionDetails);
    }
}

/**
 * This function filters the elements of the Tasks array and retrieves only the elements with the await-feedback status.
 * Then it puts the tasks in the container with ID "await-feedback".
 */
async function filterAwaitFeedback(tasks) {
    awaitFeedback = tasks.filter(awFe => awFe['state'] == 'await-feedback');
    if (awaitFeedback.length > 0) {
        noTaskDiv3.style.display = 'none';
    } else {
        noTaskDiv3.style.display = 'flex';
    }
    awaitFeedBackCardContainer.innerHTML = '';
    for (let i = 0; i < awaitFeedback.length; i++) {
        let task = awaitFeedback[i];
        let completionDetails = updateSubtaskProgress(task);
        awaitFeedBackCardContainer.innerHTML += renderCardContent(i, task, completionDetails);
    }
}

/**
 * This function filters the elements of the Tasks array and retrieves only the elements with the status 'done'.
 * Then it inserts the tasks into the container with the ID "done".
 */

async function filterDone(tasks) {
    done = tasks.filter(d => d['state'] == 'done');
    if (done.length > 0) {
        noTaskDiv4.style.display = 'none';
    } else {
        noTaskDiv4.style.display = 'flex';
    }
    doneCardContainer.innerHTML = '';
    for (let i = 0; i < done.length; i++) {
        let task = done[i];
        let completionDetails = updateSubtaskProgress(task);
        doneCardContainer.innerHTML += renderCardContent(i, task, completionDetails);
    }
}