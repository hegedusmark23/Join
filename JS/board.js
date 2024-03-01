let todos;
let inProgress;
let awaitFeedback;
let done;
let currentDraggedElement;
let background;

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
    await processTasksForStatus(filteredTasks, 'toDo', 'board-card-background-1', 'toDo');
    await processTasksForStatus(filteredTasks, 'in-progress', 'board-card-background-2', 'in-progress');
    await processTasksForStatus(filteredTasks, 'await-feedback', 'board-card-background-3', 'await-feedback');
    await processTasksForStatus(filteredTasks, 'done', 'board-card-background-4', 'done');
    setupTaskClickListeners();
}







