let backgroundToHide;
let boardSectionToSet;
let backgroundToReset;
let boardSectionToHide;
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
    document.getElementById(`${state}-card-content${i}`).style.rotate = '10deg';
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
    if (id == 'toDo') {
        hideDivAndSetBorder1();
    } else if (id == 'in-progress') {
        hideDivAndSetBorder2();
    } else if (id == 'await-feedback') {
        hideDivAndSetBorder3();
    } else if (id == 'done') {
        hideDivAndSetBorder4();
    }
    if (backgroundToHide && boardSectionToSet) {
        setTimeout(() => {
            document.getElementById(backgroundToHide).style.display = 'none';
            document.getElementById(boardSectionToSet).style.border = '2px dashed rgba(0,0,0,0.3)';
        }, 10)
    } else { }
}

function hideDivAndSetBorder1() {
    backgroundToHide = 'board-card-background-1'
    boardSectionToSet = 'board-section-1'
}
function hideDivAndSetBorder2() {
    backgroundToHide = 'board-card-background-2'
    boardSectionToSet = 'board-section-2'
}
function hideDivAndSetBorder3() {
    backgroundToHide = 'board-card-background-3'
    boardSectionToSet = 'board-section-3'
}
function hideDivAndSetBorder4() {
    backgroundToHide = 'board-card-background-4'
    boardSectionToSet = 'board-section-4'
}





/**
 * Setzt den "Keine Tasks"-Hinweis für eine spezifische Spalte zurück, wenn die letzte Aufgabe daraus entfernt wird.
 * @param {string} id - Die ID der Spalte, für die der Hinweis zurückgesetzt werden soll.
 */
function resetNoTaskDiv(id) {
    if (id == 'toDo' && todos.length == 0) {
        resetDivAndHideBorder1();
    } else if (id == 'in-progress' && inProgress.length == 0) {
        resetDivAndHideBorder2()
    } else if (id == 'await-feedback' && awaitFeedback.length == 0) {
        resetDivAndHideBorder3()
    } else if (id == 'done' && done.length == 0) {
        resetDivAndHideBorder4()
    }
    if (backgroundToReset) {
        setTimeout(addStyle, 50) // ho aggiunto un ritardo per evitare sovrapposizione tra le funzioni hideNoTaskDiv() e resetNoTaskDiv();
    } else { }
}

function addStyle() {
    document.getElementById(backgroundToReset).style.display = 'flex';
    document.getElementById(boardSectionToHide).style.border = 'none'
}

function resetDivAndHideBorder1() {
    backgroundToReset = 'board-card-background-1';
    boardSectionToHide = 'board-section-1'
}

function resetDivAndHideBorder2() {
    backgroundToReset = 'board-card-background-2';
    boardSectionToHide = 'board-section-2'
}

function resetDivAndHideBorder3() {
    backgroundToReset = 'board-card-background-3';
    boardSectionToHide = 'board-section-3'
}

function resetDivAndHideBorder4() {
    backgroundToReset = 'board-card-background-4';
    boardSectionToHide = 'board-section-4'
}

document.addEventListener('dragend', () => {
    document.getElementById('board-section-1').style.border = 'none';
    document.getElementById('board-section-2').style.border = 'none';
    document.getElementById('board-section-3').style.border = 'none';
    document.getElementById('board-section-4').style.border = 'none';
})