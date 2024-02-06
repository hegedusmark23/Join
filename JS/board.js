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
fetchTasks().then(tasks => {
    // Verarbeiten oder Anzeigen der Tasks hier
    tasks.forEach(task => console.log(task));
});

function fillBoardCard(){
    let boardLabel = document.getElementById('board-label')
    let boardTitle = document.getElementById('board-title')
    let boardDescription = document.getElementById('board-description')
    let boardProgressSubTask = document.getElementById('board-progress-subtask')
    let BoardAssignees = document.getElementById('board-assignees')
    let BoardCardPrio = document.getElementById('board-prio')

    let section1 = document.getElementById('board-card-section-1')
    let section1Bg = document.getElementById('board-card-background-1')



}
