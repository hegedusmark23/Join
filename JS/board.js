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

function renderCardContent(task, completionDetails) {
    let tasksImg = taskImage(task);
    let assigneesFooter = '';
    let labelCol1 = '#0038ff'
    let labelCol2 = '#1FD7C1'   

    task.assignTo.forEach(assignee => {
        assigneesFooter += `<div class="board-content-circle" style="background-color: ${assignee.color};">${assignee.initials}</div>`;
    });

    return `
    <div class="board-card-content">
        <div class="board-card">
        <div class="board-card-label" style="background-color: ${
            task.category == 'Technical Task' ? labelCol1 : labelCol2
        };">${task.category}</div>
            <div class="board-card-title">${task.title}</div>
            <div class="board-card-description">${task.description}</div>
            <div class="board-card-progress">
                <div id="progress-bar-container" style="background-color: #F4F4F4; width: 164px; height: 8px; border-radius: 4px;">
                    <div id="progress-bar" style="height: 8px; border-radius: 4px; background-color: #4589FF; width: ${completionDetails.completionPercentage}%;"></div>
                </div>
                <div class="board-card-progress-text">${completionDetails.subtaskText}</div>
            </div>
            <div class="board-card-footer">
                <div class="board-card-footer-assignees">${assigneesFooter}</div>
                <div class="board-card-footer-prio"><img src="/Join/assets/icons/${tasksImg}" alt="Prio Symbol"></div>
            </div>
        </div>
    </div>`;
}

// Initialisiert die Event-Listener
function setupModalEventListeners() {
    const openButton = document.getElementById('open-modal-button'); // Button, um Modal zu öffnen
    const closeButton = document.getElementById('close-modal-button'); // Button, um Modal zu schließen

    openButton.addEventListener('click', openModal);
    closeButton.addEventListener('click', closeModal);
}

// Funktion zum Öffnen des Modals
function openModal() {
    const modal = document.getElementById('addtask-modal');
    modal.style.display = 'block'; // Stellt sicher, dass das Modal sichtbar ist
    modal.classList.add('modal-open');
    modal.classList.remove('modal-close'); // Entfernt die Schließklasse, falls vorhanden
}

// Funktion zum Schließen des Modals
function closeModal() {
    const modal = document.getElementById('addtask-modal');
    modal.classList.add('modal-close'); // Startet die Schließanimation
    setTimeout(() => {
        modal.classList.remove('modal-open');
        modal.style.display = 'none'; // Stellt sicher, dass das Modal nach der Animation nicht sichtbar ist
    }, 150); // Die Zeit sollte der Dauer der CSS-Transition entsprechen
}


document.addEventListener('DOMContentLoaded', () => {
    initializeBoard();
    initializeBoardCard();
    setupModalEventListeners();

});

