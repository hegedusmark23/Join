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
 * Abrufen der gespeicherten Tasks aus dem Remote-Storage.
 * @returns {Promise<Array>} Eine Promise, die ein Array von Tasks zurückgibt.
 */
async function fetchTasks() {
    try {
        let tasks = await getItem('tasks');// Abrufen der Tasks als String
        try {
            tasks = JSON.parse(tasks); // Versuchen, den String zu parsen, um ein JavaScript-Array zu erhalten
        } catch (error) {
            console.error('Fehler beim Parsen der Tasks:', error);
            return []; // Bei einem Fehler ein leeres Array zurückgeben
        }
        if (!Array.isArray(tasks)) {
            console.error('Die abgerufenen Daten sind kein Array.');
            return []; // Sicherstellen, dass das Ergebnis ein Array ist
        }
        return tasks;
    } catch (error) {
        console.error('Fehler beim Abrufen der Tasks:', error);
        return []; // Bei einem Fehler ein leeres Array zurückgeben
    }
}

/**
 * Initialisiert das Board, indem alle Karten neu geladen werden.
 */
async function initializeBoard() {
    await initializeBoardCard()
}

/**
 * Initialisiert das Board neu, indem alle Task-Karten basierend auf dem Filterzustand neu gerendert werden.
 * @param {Array} [filteredTasks=null] - Optional. Array von gefilterten Tasks.
 */

async function initializeBoardCard(filteredTasks = null) {
    let tasks = filteredTasks ? filteredTasks : await fetchTasks();
    getNoTaskDivs();
    getCardContainers();
    filterTodos(tasks);
    filterInProgress(tasks)
    filterAwaitFeedback(tasks);
    filterDone(tasks);
    setupTaskClickListeners();
}

function getNoTaskDivs() {
    noTasksDiv = document.getElementById('board-card-background-1');
    noTaskDiv2 = document.getElementById('board-card-background-2');
    noTaskDiv3 = document.getElementById('board-card-background-3');
    noTaskDiv4 = document.getElementById('board-card-background-4');
}

function getCardContainers() {
    toDoCardsContainer = document.getElementById('toDo');
    inProgressCardContainer = document.getElementById('in-progress');
    awaitFeedBackCardContainer = document.getElementById('await-feedback');
    doneCardContainer = document.getElementById('done');
}

function filterTodos() {
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

function filterInProgress() {
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

function filterAwaitFeedback() {
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

function filterDone() {
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