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

async function deleteTasks(taskId = null) {
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

      if (taskId) {
          // Löschen eines spezifischen Tasks durch ID
          tasks = tasks.filter(task => task.id !== taskId);
      } else {
          // Löschen aller Tasks, wenn keine ID bereitgestellt wird
          tasks = [];
      }

      await setItem('tasks', tasks); // Aktualisieren des Speichers mit den verbleibenden/leeren Tasks
      console.log('Task(s) erfolgreich gelöscht');
  } catch (error) {
      console.error('Fehler beim Löschen des/der Task(s):', error);
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


// Aufrufen der Funktion
// addStateToExistingTasks();

// Verwendung der Funktion zum Löschen von Tasks
// deleteTasks(1707128813749); // Ersetzen tatsächlichen Task-ID oder weglassen um alle Tasks zu löschen.





