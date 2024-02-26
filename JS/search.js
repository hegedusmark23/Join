document.querySelector('input[type="text"]').addEventListener('input', async function(e) {
    const searchTerm = e.target.value;
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

// Event Listener für das Löschen des Suchbegriffs
document.querySelector('.search-icon img[src*="cross.svg"]').addEventListener('click', function() {
    // Löscht den Wert im Inputfeld
    const inputField = document.querySelector('input[type="text"]');
    inputField.value = '';
    
    // Trigger manuell das input Event, um die Suche zurückzusetzen und das Icon zu wechseln
    inputField.dispatchEvent(new Event('input'));
});


async function searchTasks(searchTerm) {
    let tasks = await fetchTasks();

    if (searchTerm.trim() !== '') {
        tasks = tasks.filter(task =>
            (task.title && task.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }

    // initializeBoardCard mit gefilterten Tasks aufrufen
    await initializeBoardCard(tasks);
}


