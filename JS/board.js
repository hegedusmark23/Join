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

    // Aktualisiere die Anzeige basierend auf dem Zustand der toDo Tasks
    updateToDoDisplay();
}

function updateToDoDisplay() {
    let boardCardBackground = document.getElementById('board-card-background-1');
    let section1 = document.getElementById('board-card-section-1'); // Das Container-Element für den Task

    if (toDo.length > 0) {
        // Mindestens ein Task vorhanden, also ausblenden
        boardCardBackground.style.display = 'none';
        // Rufe renderCardContent für den ersten Task auf, wenn vorhanden
        let cardHTML = renderCardContent(toDo[0], updateSubtaskProgress(toDo[0]));
        section1.innerHTML = cardHTML; // Setze das gerenderte HTML als Inhalt des Containers
    } else {
        // Keine Tasks vorhanden, also einblenden
        boardCardBackground.style.display = 'block';
        section1.innerHTML = ''; // Entferne den Inhalt des Task-Containers, falls vorhanden
    }
}

async function initializeBoard() {
    await categorizeTasks(); // Tasks sortieren und in Arrays einordnen
    updateToDoDisplay(); // Aktualisiere die Anzeige basierend auf dem Zustand der toDo Tasks
}

async function initializeBoardCard(){
    let tasks = await getItem('tasks');
    tasks = JSON.parse(tasks);

    if (!tasks || tasks.length === 0) {
        console.log("Keine Tasks vorhanden.");
        return;
    }

    let completionDetails = updateSubtaskProgress(tasks[0]); 
    let cardHTML = renderCardContent(tasks[0], completionDetails);
     
    document.getElementById('board-card-section-1').innerHTML = cardHTML;
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
    let tasksImg = taskImage(task); // Korrigiert, um direkt auf das Task-Objekt zuzugreifen
    let assigneesFooter = '';

    task.assignTo.forEach(assignee => {
        assigneesFooter += `<div class="board-content-circle" style="background-color: ${assignee.color};">${assignee.initials}</div>`;
    });

    // Verwendung von completionDetails für die Anzeige des Fortschritts
    return `
    <div class="board-card-content">
        <div class="board-card">
            <div class="board-card-label">${task.category}</div>
            <div class="board-card-title">${task.title}</div>
            <div class="board-card-description">${task.description}</div>
            <div class="board-card-progress">
                <div id="progress-bar-container" 
                    style="background-color: #F4F4F4; width: 164px; height: 8px; border-radius: 4px;">
                    <div id="progress-bar" 
                        style="height: 8px; border-radius: 4px; background-color: #4589FF; 
                        width: ${completionDetails.completionPercentage}%;"></div>
                </div>
                <div class="board-card-progress-text">
                    ${completionDetails.subtaskText}
                </div>
            </div>
            <div class="board-card-footer">
                <div class="board-card-footer-assignees">
                    <div id="board-assignees">${assigneesFooter}</div>
                </div>
                <div class="board-card-footer-prio">
                    <img src="/Join/assets/icons/${tasksImg}" alt="Prio Symbol">
                </div>
            </div>
        </div>
    </div>`;
}

  // Funktion zum Öffnen des Modals und Laden des Inhalts von addtask.html
  function openModalAddTask() {
    fetch('addtask.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('addtask-modal-body').innerHTML = data;
        document.getElementById('addtask-modal').style.display = 'block';
      })
      .catch(error => console.error('Fehler beim Laden von addtask.html:', error));
  }


document.addEventListener('DOMContentLoaded', () => {
    initializeBoard();
    initializeBoardCard();
    //openModalAddTask();

});

