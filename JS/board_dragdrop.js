
/**
 * Startet den Drag-Vorgang für ein Task-Element.
 * @param {number} id - Die ID des zu verschiebenden Tasks.
 * @param {string} state - Der aktuelle Zustand des Tasks.
 * @param {number} i - Der Index des Tasks im aktuellen Zustand.
*/
/**
 * Ermöglicht das Ablegen von Drag-Elementen.
 * @param {Event} ev - Das Drag-Event.
 */
function allowDrop(event) {
    event.preventDefault();
}

function startDragging(id, state, i) {
    currentDraggedElement = id;
    document.getElementById(`${state}-card-content${i}`).style.rotate = '10deg'
}


/**
 * Verschiebt den aktuell gezogenen Task in einen neuen Zustand und aktualisiert die Ansicht.
 * @param {string} state - Der Zielzustand des Tasks.
*/
async function moveTo(state) {
    tasks[currentDraggedElement]['state'] = state;
    await setItem('tasks', JSON.stringify(tasks));
    await initializeBoardCard();
}


/**
 * Versteckt den "Keine Tasks"-Hinweis für eine spezifische Spalte, wenn ein Task hinzugefügt wird.
 * @param {string} id - Die ID der Spalte, in der der Hinweis versteckt werden soll.
 */

function hideNoTaskDiv(id) {
    let background;
    if (id == 'toDo') {
        background = 'board-card-background-1';
    } else if (id == 'in-progress') {
        background = 'board-card-background-2';
    } else if (id == 'await-feedback') {
        background = 'board-card-background-3';
    } else if (id == 'done') {
        background = 'board-card-background-4'
    }
    document.getElementById(background).style.display = 'none'
}

/**
 * Setzt den "Keine Tasks"-Hinweis für eine spezifische Spalte zurück, wenn die letzte Aufgabe daraus entfernt wird.
 * @param {string} id - Die ID der Spalte, für die der Hinweis zurückgesetzt werden soll.
 */
function resetNoTaskDiv(id) {
    let background;
    if (id == 'toDo' && todos.length == 0) {
        background = 'board-card-background-1';
    } else if (id == 'in-progress' && inProgress.length == 0) {
        background = 'board-card-background-2';
    } else if (id == 'await-feedback' && awaitFeedback.length == 0 ) {
        background = 'board-card-background-3';
    } else if (id == 'done' && done.length == 0) {
        background = 'board-card-background-4'
    }
    if(background){
        document.getElementById(background).style.display = 'flex'
    } else {}
}