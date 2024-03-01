/**
 * Leert den Inhalt des Modals für die Bearbeitung eines Tasks.
 */
function clearEditModalContent() {
    const modal = document.getElementById('task-detail-modal');
    const taskDetailsContainer = modal.querySelector('#task-details-container');
    if (taskDetailsContainer) { // Stellt sicher, dass der Container existiert
        // Setzt den Inhalt von #task-details-container zurück auf den Anfangszustand
        taskDetailsContainer.innerHTML = ` 
            <div id="task-details">
                
            </div>
        `;
    }
    modal.classList.remove('modal-open'); // Entfernt die Öffnungsklasse
    modal.style.display = 'none'; // Versteckt das Modal
}

/**
 * Schließt das Modal für das Hinzufügen eines Tasks.
 */
function closeModalAddTaskBoard() {
    const modalClose = document.getElementById('addtask-modal');
    if (modalClose) {
        modalClose.classList.remove('modal-open'); // Startet die Schließanimation für den Inhalt
        setTimeout(() => {
            modalClose.style.display = 'none'; // Versteckt den Hintergrund nach der Animation
        }, 200); // Wartezeit entspricht der Dauer der Animation
    }
}

/**
 * Generiert Initialen aus dem vollständigen Namen.
 * @param {string} completeName - Vollständiger Name, aus dem die Initialen generiert werden sollen.
 * @return {string} Die generierten Initialen.
 */
function generateInitials(completeName) {
    return completeName.split(' ').map(part => part[0]).join('').toUpperCase();
}

/**
 * Extrahiert den Buchstaben und den lokalen Index aus einem globalen Index.
 * Dies wird verwendet, um einen bestimmten Kontakt in der verschachtelten Struktur von `letterContainer` zu lokalisieren.
 *
 * @param {number} globalIndex - Der globale Index des Kontakts über alle Buchstaben hinweg.
 * @returns {object} Ein Objekt mit dem Buchstaben und dem lokalen Index des Kontakts. Gibt `{ letter: null, index: -1 }` zurück, falls kein Kontakt gefunden wurde.
 */
function extractLetterFromIndex(globalIndex) {
    let runningIndex = 0; // Laufender Index zum Durchlaufen der Kontakte
    // Durchläuft jeden Buchstaben in `letterContainer`
    for (let letter in letterContainer) {
        // Sicherstellen, dass das aktuelle Eigentum ein direktes Eigentum von `letterContainer` ist
        if (letterContainer.hasOwnProperty(letter)) {
            // Überprüfen, ob der globale Index innerhalb der Länge der aktuellen Buchstabengruppe liegt
            if (globalIndex < runningIndex + letterContainer[letter].length) {
                // Gibt den Buchstaben und den lokalen Index innerhalb der Buchstabengruppe zurück
                return { letter: letter, index: globalIndex - runningIndex };
            }
            // Aktualisiert den laufenden Index um die Länge der aktuellen Buchstabengruppe
            runningIndex += letterContainer[letter].length;
        }
    }
    // Gibt `{ letter: null, index: -1 }` zurück, falls kein Kontakt gefunden wurde
    return { letter: null, index: -1 };
}

/**
 * Extrahiert die Priorität aus dem aktiven Prioritäts-Button.
 * 
 * Diese Funktion sucht nach dem aktiven Prioritäts-Button in der
 * AddTask-Modalansicht und extrahiert den Textinhalt des Buttons,
 * um die ausgewählte Priorität zu bestimmen. Wenn kein aktiver Button
 * gefunden wird, gibt die Funktion einen leeren String zurück.
 * Der extrahierte Text wird bereinigt (Leerzeichen entfernt und in
 * Kleinbuchstaben konvertiert), um eine konsistente Prioritätsangabe zu gewährleisten.
 *
 * @returns {string} Die extrahierte Priorität in Kleinbuchstaben oder
 *                   ein leerer String, falls keine Priorität ausgewählt ist.
 */
function extractPriority() {
    const activeButton = document.querySelector('.addtask-prio-btn .is-active');
    if (!activeButton) return ''; // Kein aktiver Button gefunden, gibt einen leeren String zurück
    let priorityText = activeButton.innerText; // Extrahiert den Text des Buttons
    priorityText = priorityText.trim().toLowerCase(); // Entfernt Leerzeichen und konvertiert in Kleinbuchstaben
    return priorityText;
}

/**
 * Extrahiert Formulardaten aus dem Bearbeitungsmodal.
 * @returns Ein Objekt mit den extrahierten Daten aus dem Formular: Titel, Beschreibung, Fälligkeitsdatum, Kategorie, Priorität, zugewiesene Personen (Assignees) und Subtasks.
 */
function extractFormData() {
    return {
        title: document.getElementById('addtask-title') ? document.getElementById('addtask-title').value : '',
        description: document.getElementById('description') ? document.getElementById('description').value : '',
        dueDate: document.getElementById('dueDate') ? document.getElementById('dueDate').value : '',
        category: document.getElementById('dropdown-categories') ? document.getElementById('dropdown-categories').textContent : '',
        priority: extractPriority(), // Implementieren Sie diese Funktion entsprechend Ihrer Logik
        assignTo: extractAssignees(),
        subtask: extractSubtasks()
    };
}

/**
 * Extrahiert die zugewiesenen Personen (Assignees) aus dem Bearbeitungsmodal.
 * @returns Ein Array von Objekten, jedes repräsentiert eine zugewiesene Person mit Namen, Initialen und Farbe.
 */
function extractAssignees() {
    return Array.from(document.querySelectorAll('.dropdown-content-container.user-checked')).map(assigneeContainer => {
        const name = assigneeContainer.querySelector('.dropdown-content-name').textContent;
        const color = assigneeContainer.querySelector('.dropdown-content-circle').style.backgroundColor;
        const initials = assigneeContainer.querySelector('#user-initials').textContent;
        return { name, initials, color };
    });
}

/**
 * Extrahiert Subtasks aus dem Bearbeitungsmodal.
 * @returns Ein Array von Objekten, jedes repräsentiert einen Subtask mit Text, ID und Abschlussstatus.
 */
function extractSubtasks() {
    return Array.from(document.querySelectorAll('#subtasks-list-container ul li')).map(subtaskItem => {
        const text = subtaskItem.querySelector('p').textContent;
        const id = subtaskItem.dataset.subtaskId ? parseInt(subtaskItem.dataset.subtaskId) : Date.now();
        const completed = subtaskItem.classList.contains('subtask-completed') ? 'done' : '';
        return { id, text, completed };
    });
}

/**
 * Speichert die bearbeiteten Aufgabendetails und aktualisiert das UI entsprechend.
 * @param {number} taskId Die ID der Aufgabe, die bearbeitet wird.
 */
async function saveTaskEdit(taskId) {
    setTimeout(async () => {
        const formData = extractFormData();
        const taskIndex = tasks.findIndex(task => task.id === parseInt(taskId));
        if (taskIndex === -1) {
            console.error('Aufgabe nicht gefunden.');
            return;
        }
        // Aktualisiere den Task im Array
        updateTask(taskIndex, formData);
        try {
            // Speichern der Aufgaben und UI aktualisieren
            await saveTasksAndReloadUI(taskIndex);
        } catch (error) {
            console.error('Fehler beim Speichern der Aufgaben:', error);
        }
    }, 100);
}

/**
 * Aktualisiert eine Aufgabe im tasks Array basierend auf den übergebenen Formulardaten.
 * @param {number} taskIndex Der Index der Aufgabe im tasks Array.
 * @param {object} formData Die Daten, die aus dem Formular extrahiert wurden und mit denen der Task aktualisiert wird.
 */
function updateTask(taskIndex, formData) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...formData };
}

/**
 * Speichert das aktualisierte tasks Array im Speicher und aktualisiert das UI.
 * Ruft Funktionen auf, um das Bearbeitungsmodal zu schließen, Event-Listener neu zu initialisieren, die Detailansicht des aktualisierten Tasks zu öffnen und die Board-Karten zu aktualisieren.
 * @param {number} taskIndex Der Index der aktualisierten Aufgabe im tasks Array.
 */
async function saveTasksAndReloadUI(taskIndex) {
    await setItem('tasks', tasks);
    clearEditModalContent();
    reinitializeEventListenersForEditModal();
    openTaskDetailModal(tasks[taskIndex]); // Öffnet die Detailansicht mit den aktualisierten Daten
    await initializeBoardCard(); // Aktualisieren der Board-Karten
}

/**
 * Schließt das Modal zum Bearbeiten eines Tasks.
 */
function closeModalTaskEdit() {
    const modalEdit = document.getElementById('task-detail-modal');
    if (modalEdit) {
        modalEdit.classList.remove('modal-open'); // Startet die Schließanimation für den Inhalt
        setTimeout(() => {
            modalEdit.style.display = 'none'; // Versteckt den Hintergrund nach der Animation
        }, 500); // Wartezeit entspricht der Dauer der Animation
    }
}