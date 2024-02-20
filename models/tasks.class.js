class Task {
    identifier;
    constructor(id, title, description, assignTo, dueDate, prio, createdAt, token, identifier) {
        this.id = id;
        this.title = title
        this.description = description;
        this.assignTo = assignTo;
        this.dueDate = dueDate;
        this.prio = prio;
        this.createdAt = createdAt;
        this.token = token;
        this.identifier = identifier

        this.category = []
        this.subtask = []
        this.state = 'toDo';
    }

    addSubtask(subtaskText) {
        let newSubtask = { id: Date.now(), text: subtaskText };
        this.subtasks.push(newSubtask);
    }

    deleteSubtask(subtaskId) {
        this.subtasks = this.subtasks.filter(subtask => subtask.id !== subtaskId);
    }

}