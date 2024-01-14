class Board {

    constructor(id, title) {
        this.id = id; //  Eine eindeutige Kennung für das Board.
        this.title = title; // Name des Boards. Dies ist nützlich, um das Board leicht zu identifizieren, insbesondere wenn es mehrere Boards gibt.
        this.users = []; // Array von Benutzerobjekten. Dies repräsentiert alle Benutzer, die Zugriff auf das Board haben.
        this.tasks = []; // Array von Aufgabenobjekten. Dies sind die verschiedenen Aufgaben, die auf dem Board angezeigt und verwaltet werden.
    }

add(){

}

edit(type, id, newDetails) {
    let item;
    if (type === 'task') {
        item = this.tasks.find(t => t.id === id);
        if (item) {
            // Hier wird angenommen, dass `newDetails` ein Objekt ist,
            // das die zu ändernden Eigenschaften und ihre neuen Werte enthält
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

delete(){

}

}