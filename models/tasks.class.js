class Task {
    constructor(id, title, description, assignTo, dueDate, prio, createdAt, token)
    {
        this.id = id;
        this.title = title
        this.description = description;
        this.assignTo = assignTo;
        this.dueDate = dueDate;
        this.prio = prio;
        this.createdAt = createdAt;
        this.token = token;
        
        this.category = []
        this.subtask = []
    }

}