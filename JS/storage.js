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
      let tasks = await getItem('tasks'); // Abrufen aller gespeicherten Tasks

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

// Verwendung der Funktion zum Löschen von Tasks

// deleteTasks(); // Ersetzen tatsächlichen Task-ID oder weglassen um alle Tasks zu löschen.





