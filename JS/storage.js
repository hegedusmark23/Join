const STORAGE_TOKEN = 'J1DF6T54G0IGAJIJ3AG9Z7W92UFJ0PRM1DJFQ500';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/**
 * Stores an item in remoteStorage.
 * @param {string} key - The key under which the item is stored.
 * @param {string} value - The value of the item as a string.
 * @returns {Promise<Object>} A promise containing the response from the server.
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN }
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) }).then(resp => resp.json());
};

/**
 * Retrieves an Item from the remoteStorage.
 * @param {string} key - The key of the item to retrieve.
 * @returns {Promise<string>} A promise with the item's value as a string.
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
 * Deletes specific tasks or all if no specific IDs are passed.
 * @param {number[]} [taskIds=[]] - The IDs of the tasks to delete.
 */
async function deleteTasks(taskIds = []) {
    try {
        let tasks = await getItem('tasks'); // Retrieve all saved tasks as a string
        
        try {
            tasks = JSON.parse(tasks); // Converting the string back to an array
        } catch (error) {
            console.error('Fehler beim Parsen der Tasks:', error);
            return; // Terminates the function early if parsing fails
        }
        if (!Array.isArray(tasks)) {
            console.error('Nach dem Parsen sind die Tasks kein Array:', tasks);
            return; // Make sure the tasks are an array
        }
        if (taskIds && taskIds.length > 0) {
            // Delete specific tasks by their IDs
            tasks = tasks.filter(task => !taskIds.includes(task.id));
        } else {
            // Delete all tasks if no IDs are provided
            tasks = [];
        }
        await setItem('tasks', JSON.stringify(tasks)); // Refresh memory with remaining/empty tasks
        console.log('Task(s) erfolgreich gelöscht');
    } catch (error) {
        console.error('Fehler beim Löschen des/der Task(s):', error);
    }
}

/**
 * Adds a 'state' to all existing tasks if it does not already exist.
 */
async function addStateToExistingTasks() {
  try {
      let tasks = await getItem('tasks'); // Retrieve the existing tasks
      tasks = JSON.parse(tasks); // Trying to parse the string
      if (!Array.isArray(tasks)) {
          console.error('Die abgerufenen Daten sind kein Array:', tasks);
          return; // Exits the function if there is no array data
      }
      tasks = tasks.map(task => {
          if (!task.state) { // Adding 'state' if not present
              task.state = 'toDo';
          }
          return task;
      });

      await setItem('tasks', JSON.stringify(tasks)); // Save the updated tasks
      console.log('Alle vorhandenen Tasks wurden erfolgreich aktualisiert.');
  } catch (error) {
      console.error('Fehler beim Aktualisieren der vorhandenen Tasks:', error);
  }
}

/**
 * Changes the 'state' of all existing tasks or adds it if not present
 */
async function changeAddStateTasks() {
    try {
        let tasks = await getItem('tasks'); // Retrieve the existing tasks
        if (typeof tasks === 'string') {
            tasks = JSON.parse(tasks); // Trying to parse the string
        }

        if (!Array.isArray(tasks)) {
            console.error('Die abgerufenen Daten sind kein Array:', tasks);
            tasks = []; // Initializes tasks as an empty array if the data is not in array format
        }
  
        const updatedTasks = tasks.map(task => {
            if (!task.state) { // Adding 'state' if not present
                return { ...task, state: 'toDo' };
            }
            return task;
        });
  
        await setItem('tasks', JSON.stringify(updatedTasks)); // Save the updated tasks
        console.log('Alle vorhandenen Tasks wurden erfolgreich aktualisiert.');
    } catch (error) {
        console.error('Fehler beim Aktualisieren der vorhandenen Tasks:', error);
    }
}

/**
 * Adds the 'completed' attribute to all existing subtasks if it does not already exist.
 */
async function addCompletedToExistingSubtasks() {
    try {
        let tasks = await getItem('tasks'); // Retrieve the existing tasks
        if (tasks) {
            tasks = JSON.parse(tasks); // Trying to parse the string
            if (Array.isArray(tasks)) {
                tasks.forEach(task => {
                    if (task.subtask && Array.isArray(task.subtask)) {
                        task.subtask.forEach(subtask => {
                            if (subtask.completed === undefined) { // Check whether the 'completed' property is missing
                                subtask.completed = null; // Adding 'completed' property with value 'null'
                            }
                        });
                    }
                });
                await setItem('tasks', JSON.stringify(tasks)); // Save the updated tasks
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
 * Updates the completion status of a specific subtask.
 * @param {number} taskId - The ID of the parent task.
 * @param {number} subtaskId - The ID of the subtask to update.
 * @param {string} completionStatus - The new completion status ('done' or null).
 */
async function updateSubtaskCompletion(taskId, subtaskId, completionStatus) {
    try {
        let tasks = await getItem('tasks');
        if (tasks) {
            tasks = JSON.parse(tasks);
            let taskToUpdate = tasks.find(task => task.id === taskId); // Find the specific task and subtask
            if (taskToUpdate) {
                let subtaskToUpdate = taskToUpdate.subtask.find(subtask => subtask.id === subtaskId);
                if (subtaskToUpdate) {
                    // Set the completed property to the desired status
                    subtaskToUpdate.completed = completionStatus; // 'done' or null
                    // Save the updated tasks back to the server
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
 * Loads the user data from the remoteStorage and initializes the user object.
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


//! Functions that can be called when needed

// deleteUser()
// updateSubtaskCompletion(1707393834234, 1707393814989, 'done');
// addStateToExistingTasks();
// changeAddStateTasks()
// addCompletedToExistingSubtasks();
// deleteTasks();