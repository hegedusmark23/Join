/**
 * Klasse zur Repräsentation eines Tasks.
 */
class Task {
    identifier;    
    
    /**
     * Konstruktor der Task-Klasse.
     * 
     * @param {number} id - Eindeutige ID des Tasks.
     * @param {string} title - Titel des Tasks.
     * @param {string} description - Beschreibung des Tasks.
     * @param {Array} assignTo - Liste der Personen, denen der Task zugewiesen ist.
     * @param {string} dueDate - Fälligkeitsdatum des Tasks.
     * @param {string} prio - Priorität des Tasks (z.B. "hoch", "mittel", "niedrig").
     * @param {string} createdAt - Erstellungsdatum des Tasks.
     * @param {string} token - Authentifizierungstoken für den Remote-Speicher.
     * @param {number} identifier - Eine zusätzliche ID, die zur Identifikation in der UI genutzt werden kann.
     */
    constructor(id, title, description, assignTo, dueDate, prio, createdAt, token, identifier) {
        this.id = id;
        this.title = title
        this.description = description;
        this.assignTo = assignTo;
        this.dueDate = dueDate;
        this.prio = prio;
        this.createdAt = createdAt;
        this.token = token;
        this.identifier = identifier;
        this.category = []
        this.subtask = []
        this.state = 'toDo';
    }

/**
* Fügt einen Subtask zum Task hinzu.
* 
* @param {string} subtaskText - Text des Subtasks.
*/
addSubtask(subtaskText) {
    let newSubtask = { id: Date.now(), text: subtaskText };
    this.subtasks.push(newSubtask);
}

/**
 * Löscht einen Subtask aus dem Task.
 * 
 * @param {number} subtaskId - ID des zu löschenden Subtasks.
 */
deleteSubtask(subtaskId) {
    this.subtasks = this.subtasks.filter(subtask => subtask.id !== subtaskId);
}
}