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
 * Speichert die Änderungen eines Tasks nach der Bearbeitung.
 * @param {number} taskId - Die ID des zu speichernden Tasks.
 */
async function saveTaskEdit(taskId) {
    setTimeout(async () => {
        const taskIndex = tasks.findIndex(task => task.id === parseInt(taskId));
        if (taskIndex === -1) {
            console.error('Aufgabe nicht gefunden.');
            return;
        }
        const title = document.getElementById('addtask-title') ? document.getElementById('addtask-title').value : '';
        const description = document.getElementById('description') ? document.getElementById('description').value : '';
        const dueDate = document.getElementById('dueDate') ? document.getElementById('dueDate').value : '';
        const category = document.getElementById('dropdown-categories') ? document.getElementById('dropdown-categories').textContent : '';
        const priority = extractPriority(); // Implementieren Sie diese Funktion entsprechend Ihrer Logik
        // Extrahieren von Assignees
        const assignTo = Array.from(document.querySelectorAll('.dropdown-content-container.user-checked')).map(assigneeContainer => {
            const name = assigneeContainer.querySelector('.dropdown-content-name').textContent;
            const color = assigneeContainer.querySelector('.dropdown-content-circle').style.backgroundColor;
            const initials = assigneeContainer.querySelector('#user-initials').textContent;
            return { name, initials, color };
        });
        // Extrahieren von Subtasks
        const subtask = Array.from(document.querySelectorAll('#subtasks-list-container ul li')).map(subtaskItem => {
            const text = subtaskItem.querySelector('p').textContent;
            const id = subtaskItem.dataset.subtaskId ? parseInt(subtaskItem.dataset.subtaskId) : Date.now();
            const completed = subtaskItem.classList.contains('subtask-completed') ? 'done' : '';
            return { id, text, completed };
        });
        // Aufgabe im tasks Array aktualisieren
        tasks[taskIndex] = {
            ...tasks[taskIndex],
            title,
            description,
            dueDate,
            category,
            priority,
            assignTo,
            subtask
        };
        try {
            // Speichern der Aufgaben
            await setItem('tasks', tasks);
            clearEditModalContent();
            reinitializeEventListenersForEditModal();
            openTaskDetailModal(tasks[taskIndex]); // Öffnet die Detailansicht mit den aktualisierten Daten
            await initializeBoardCard(); // Aktualisieren der Board-Karten
        } catch (error) {
            console.error('Fehler beim Speichern der Aufgaben:', error);
        }
    }, 100); // 1 Sekunde warten, um sicherzustellen, dass alle Elemente geladen sind
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

