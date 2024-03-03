
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
    currentDraggedElement = id;  // Bestehender Code
    document.getElementById(`${state}-card-content${i}`).style.rotate = '10deg';  // Bestehender Code
    
    // Speichere zusätzliche Informationen für das spätere Abrufen
    event.dataTransfer.setData("application/my-app", JSON.stringify({id, state, initialPosition: i}));
}


/**
 * Verschiebt den aktuell gezogenen Task in einen neuen Zustand und aktualisiert die Ansicht.
 * @param {string} state - Der Zielzustand des Tasks.
*/
async function moveTo(event, state) {
    event.preventDefault();  // Verhindern des Standardsverhaltens
    
    // Die Transferdaten aus dem Event abrufen
    const transferData = JSON.parse(event.dataTransfer.getData("application/my-app"));
    const movedTask = tasks.find(task => task.id === transferData.id);

    if(movedTask) {
        movedTask.state = state;  // Zustand aktualisieren wie bisher

        // Hier die Sortierlogik einführen:
        // Zur Vereinfachung erhöhen wir einfach die 'position' aller anderen Tasks in der Zielkategorie um 1
        // Die detaillierte Implementierung hängt von deiner Anwendungslogik ab
        tasks.filter(task => task.state === state).forEach(task => task.position++);
        
        // Und setzten die Position des verschobenen Tasks auf 0 (an den Anfang)
        movedTask.position = 0;

    
    tasks[currentDraggedElement]['state'] = state;
    await setItem('tasks', JSON.stringify(tasks));
    await initializeBoardCard();
}
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