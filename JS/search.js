/**
 * Fügt dem Sucheingabefeld einen Event-Listener hinzu, der bei jeder Eingabe ausgelöst wird.
 * Startet die Suchfunktion basierend auf dem eingegebenen Suchbegriff.
 * Wechselt die Icons basierend darauf, ob das Eingabefeld leer ist oder nicht.
 */
document.querySelector('input[type="text"]').addEventListener('input', async function(e) {
    const searchTerm = e.target.value;
    console.log('Suchbegriff: ', searchTerm)
    await searchTasks(searchTerm);
    // Icons umschalten
    const searchIcon = document.querySelector('.search-icon img[src*="search.svg"]');
    const crossIcon = document.querySelector('.search-icon img[src*="cross.svg"]');
    if (searchTerm.trim() === '') {
        searchIcon.style.display = 'block';
        crossIcon.style.display = 'none';
    } else {
        searchIcon.style.display = 'none';
        crossIcon.style.display = 'block';
    }
});

/**
 * Fügt dem Kreuz-Icon im Suchfeld einen Event-Listener hinzu.
 * Bei Klick wird der Inhalt des Eingabefelds gelöscht und das Such-Icon wieder angezeigt.
 */
document.querySelector('.search-icon img[src*="cross.svg"]').addEventListener('click', function() {
    const inputField = document.querySelector('input[type="text"]'); 
    inputField.value = ''; // Löscht den Wert im Inputfeld
    inputField.dispatchEvent(new Event('input')); // Trigger manuell das input Event, um die Suche zurückzusetzen und das Icon zu wechseln
});

/**
 * Führt eine Suche durch, indem es die vorhandenen Tasks nach dem Suchbegriff filtert.
 * Aktualisiert das Board, um nur die Tasks anzuzeigen, die den Suchkriterien entsprechen.
 * @param {string} searchTerm - Der Suchbegriff, nach dem gefiltert werden soll.
 */
async function searchTasks(searchTerm) {
    let tasks = await fetchTasks();
    console.log('Gefetchte Tasks:', tasks);
    if (searchTerm.trim() !== '') {
        tasks = tasks.filter(task =>
            (task.title && task.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }
    await initializeBoardCard(tasks); // initializeBoardCard mit gefilterten Tasks aufrufen
}

