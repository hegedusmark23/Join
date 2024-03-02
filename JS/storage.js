const STORAGE_TOKEN = 'J1DF6T54G0IGAJIJ3AG9Z7W92UFJ0PRM1DJFQ500';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/**
 * Speichert ein Item im remoteStorage.
 * @param {string} key - Der Schlüssel unter dem das Item gespeichert wird.
 * @param {string} value - Der Wert des Items als String.
 * @returns {Promise<Object>} Eine Promise mit der Antwort vom Server.
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN }
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) }).then(resp => resp.json());
};

/**
 * Ruft ein Item vom remoteStorage ab.
 * @param {string} key - Der Schlüssel des abzurufenden Items.
 * @returns {Promise<string>} Eine Promise mit dem Wert des Items als String.
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`
    return fetch(url).then(resp => resp.json()).then(resp => {
        if (resp.data) {
            return resp.data.value
        } else {
            return resp
        }
    });
};

/**
 * Löscht bestimmte Tasks oder alle, falls keine spezifischen IDs übergeben werden.
 * @param {number[]} [taskIds=[]] - Die IDs der zu löschenden Tasks.
 */
async function deleteTasks(taskIds = []) {
    try {
        let tasks = await getItem('tasks'); // Abrufen aller gespeicherten Tasks als String
        
        try {
            tasks = JSON.parse(tasks); // Konvertieren des String zurück in ein Array
        } catch (error) {
            console.error('Fehler beim Parsen der Tasks:', error);
            return; // Beendet die Funktion vorzeitig, wenn das Parsen fehlschlägt
        }
        if (!Array.isArray(tasks)) {
            console.error('Nach dem Parsen sind die Tasks kein Array:', tasks);
            return; // Sicherstellen, dass die Tasks ein Array sind
        }
        if (taskIds && taskIds.length > 0) {
            // Löschen spezifischer Tasks durch ihre IDs
            tasks = tasks.filter(task => !taskIds.includes(task.id));
        } else {
            // Löschen aller Tasks, wenn keine IDs bereitgestellt werden
            tasks = [];
        }
        await setItem('tasks', JSON.stringify(tasks)); // Aktualisieren des Speichers mit den verbleibenden/leeren Tasks
        console.log('Task(s) erfolgreich gelöscht');
    } catch (error) {
        console.error('Fehler beim Löschen des/der Task(s):', error);
    }
}

/**
 * Fügt allen vorhandenen Tasks einen 'state' hinzu, falls dieser noch nicht vorhanden ist.
 */
async function addStateToExistingTasks() {
  try {
      let tasks = await getItem('tasks'); // Abrufen der vorhandenen Tasks
      tasks = JSON.parse(tasks); // Versuch, den String zu parsen
      if (!Array.isArray(tasks)) {
          console.error('Die abgerufenen Daten sind kein Array:', tasks);
          return; // Beendet die Funktion, wenn keine Array-Daten vorliegen
      }
      tasks = tasks.map(task => {
          if (!task.state) { // Hinzufügen von 'state', falls nicht vorhanden
              task.state = 'toDo';
          }
          return task;
      });

      await setItem('tasks', JSON.stringify(tasks)); // Speichern der aktualisierten Tasks
      console.log('Alle vorhandenen Tasks wurden erfolgreich aktualisiert.');
  } catch (error) {
      console.error('Fehler beim Aktualisieren der vorhandenen Tasks:', error);
  }
}

/**
 * Ändert den 'state' aller vorhandenen Tasks oder fügt ihn hinzu, falls nicht vorhanden.
 */
async function changeAddStateTasks() {
    try {
        let tasks = await getItem('tasks'); // Abrufen der vorhandenen Tasks
        if (typeof tasks === 'string') {
            tasks = JSON.parse(tasks); // Versuch, den String zu parsen
        }

        if (!Array.isArray(tasks)) {
            console.error('Die abgerufenen Daten sind kein Array:', tasks);
            tasks = []; // Initialisiert tasks als leeres Array, falls die Daten nicht im Array-Format vorliegen
        }
  
        const updatedTasks = tasks.map(task => {
            if (!task.state) { // Hinzufügen von 'state', falls nicht vorhanden
                return { ...task, state: 'toDo' };
            }
            return task;
        });
  
        await setItem('tasks', JSON.stringify(updatedTasks)); // Speichern der aktualisierten Tasks
        console.log('Alle vorhandenen Tasks wurden erfolgreich aktualisiert.');
    } catch (error) {
        console.error('Fehler beim Aktualisieren der vorhandenen Tasks:', error);
    }
}

/**
 * Fügt allen vorhandenen Subtasks das Attribut 'completed' hinzu, falls dieses noch nicht vorhanden ist.
 */
async function addCompletedToExistingSubtasks() {
    try {
        let tasks = await getItem('tasks'); // Abrufen der vorhandenen Tasks
        if (tasks) {
            tasks = JSON.parse(tasks); // Versuch, den String zu parsen
            if (Array.isArray(tasks)) {
                tasks.forEach(task => {
                    if (task.subtask && Array.isArray(task.subtask)) {
                        task.subtask.forEach(subtask => {
                            if (subtask.completed === undefined) { // Prüfen, ob die Eigenschaft 'completed' fehlt
                                subtask.completed = null; // Hinzufügen der 'completed' Eigenschaft mit dem Wert 'null'
                            }
                        });
                    }
                });
                await setItem('tasks', JSON.stringify(tasks)); // Speichern der aktualisierten Tasks
                console.log('Die Subtasks aller vorhandenen Tasks wurden erfolgreich aktualisiert.');
            } else {
                console.error('Die abgerufenen Daten sind kein Array:', tasks);
            }
        }
    } catch (error) {
        console.error('Fehler beim Aktualisieren der Subtasks:', error);
    }
}

/**
 * Aktualisiert den Abschlussstatus einer spezifischen Subtask.
 * @param {number} taskId - Die ID des übergeordneten Tasks.
 * @param {number} subtaskId - Die ID der zu aktualisierenden Subtask.
 * @param {string} completionStatus - Der neue Abschlussstatus ('done' oder null).
 */
async function updateSubtaskCompletion(taskId, subtaskId, completionStatus) {
    try {
        let tasks = await getItem('tasks');
        if (tasks) {
            tasks = JSON.parse(tasks);
            let taskToUpdate = tasks.find(task => task.id === taskId); // Finde den spezifischen Task und Subtask
            if (taskToUpdate) {
                let subtaskToUpdate = taskToUpdate.subtask.find(subtask => subtask.id === subtaskId);
                if (subtaskToUpdate) {
                    // Setze die completed-Eigenschaft auf den gewünschten Status
                    subtaskToUpdate.completed = completionStatus; // 'done' oder null
                    // Speichere die aktualisierten Tasks zurück auf dem Server
                    await setItem('tasks', JSON.stringify(tasks));
                    console.log('Subtask erfolgreich aktualisiert.');
                } else {
                    console.error('Subtask nicht gefunden.');
                }
            } else {
                console.error('Task nicht gefunden.');
            }
        }
    } catch (error) {
        console.error('Fehler beim Aktualisieren der Subtask:', error);
    }
}

/**
 * Lädt die User-Daten vom remoteStorage und initialisiert das User-Objekt.
 */
async function loadUser() {
    try {
        const response = await getItem('user');
        if (response) {
            user = JSON.parse(response);
        } else {
            console.log('Keine User gefunden.');
        }
    } catch (e) {
        console.error('Fehler beim Laden der User:', e);
    }
}


//! Funktionen die bei Bedarf aufgerufen werden können

// deleteUser()
// updateSubtaskCompletion(1707393834234, 1707393814989, 'done');
// addStateToExistingTasks();
// changeAddStateTasks()
// addCompletedToExistingSubtasks();
// deleteTasks();