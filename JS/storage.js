const STORAGE_TOKEN = 'J1DF6T54G0IGAJIJ3AG9Z7W92UFJ0PRM1DJFQ500';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN }
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) }).then(resp => resp.json());
};
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`
    return fetch(url).then(resp => resp.json()).then(resp => {
      if(resp.data){
        return resp.data.value
      } else {
        return resp
      }
    });
};
async function deleteTasks(taskIds = []) {
    try {
        let tasks = await getItem('tasks'); // Abrufen aller gespeicherten Tasks als String
        // Konvertieren des String zurück in ein Array
        try {
            tasks = JSON.parse(tasks);
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


  async function deleteUser() {
    try {
        let user = await getItem('user'); // Abrufen aller gespeicherten Tasks als String
        // Konvertieren des String zurück in ein Array
        try {
            user = JSON.parse(user);
        } catch (error) {
            console.error('Fehler beim Parsen der User:', error);
            //return; // Beendet die Funktion vorzeitig, wenn das Parsen fehlschlägt
        }
           // Löschen aller Tasks, wenn keine IDs bereitgestellt werden
            user = ''
        await setItem('user', JSON.stringify(user)); // Aktualisieren des Speichers mit den verbleibenden/leeren Tasks
        console.log('User erfolgreich gelöscht');
    } catch (error) {
        console.error('Fehler beim Löschen des User:', error);
    }
  }


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
async function updateSubtaskCompletion(taskId, subtaskId, completionStatus) {
    try {
        let tasks = await getItem('tasks');
        if (tasks) {
            tasks = JSON.parse(tasks);
            // Finde den spezifischen Task und Subtask
            let taskToUpdate = tasks.find(task => task.id === taskId);
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
async function loadUser() {
    try {
        const response = await getItem('user');
        if (response) {
            user = JSON.parse(response);
            console.log('User geladen:', user);
        } else {
            console.log('Keine User gefunden.');
        }
    } catch (e) {
        console.error('Fehler beim Laden der User:', e);
    }
}


// Setze die completed-Eigenschaft eines Subtasks auf 'done'
// updateSubtaskCompletion(1707393834234, 1707393814989, 'done');
// Aufrufen der Funktion
// addStateToExistingTasks();
// addCompletedToExistingSubtasks();
// Verwendung der Funktion zum Löschen von Tasks
// deleteTasks([1707558734060, 1707558735780, 1707558737023, 1707558737365, 1707558737739, 1707558737980, 1707558738166, 1707558738383, 1707558738641, 1707558740503, 1707558741315, 1707558904648, 1707559138203, 1707559193353, 1707559260451, 1707559288220, 1707559338204, 1707559632292, 1707560882716, 1707560951921]); // Ersetzen tatsächlichen Task-ID oder weglassen um alle Tasks zu löschen.






