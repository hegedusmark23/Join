/**
 * Represents a board in a task management system.
 */
class Board {
    /**
     * Constructs a new Board instance.
     * @param {number} id - A unique identifier for the board.
     * @param {string} title - The name of the board, useful for identification especially when there are multiple boards.
     */
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.users = []; // Array of user objects, representing all users who have access to the board.
        this.tasks = []; // Array of task objects, representing the tasks displayed and managed on the board.
    }

    /**
     * Edits details of a task or a user on the board.
     * @param {'task'|'user'} type - Specifies whether to edit a task or a user.
     * @param {number} id - The ID of the task or user to be edited.
     * @param {Object} newDetails - The new details to be applied to the task or user.
     */
    edit(type, id, newDetails) {
        let item;
        if (type === 'task') {
            item = this.tasks.find(t => t.id === id);
            if (item) {
                Object.keys(newDetails).forEach(key => {
                    if (item.hasOwnProperty(key)) {
                        item[key] = newDetails[key];
                    }
                });
            }
        } else if (type === 'user') {
            item = this.users.find(u => u.id === id);
            if (item) {
                Object.keys(newDetails).forEach(key => {
                    if (item.hasOwnProperty(key)) {
                        item[key] = newDetails[key];
                    }
                });
            }
        }
    }
}