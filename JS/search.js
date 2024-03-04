/**
 * Adds an event listener to the search input field that fires on each input.
 * Starts the search function based on the search term entered.
 * Switches icons based on whether the input field is empty or not.
 */
document.querySelector('input[type="text"]').addEventListener('input', async function(e) {
    const searchTerm = e.target.value;
    await searchTasks(searchTerm);
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
 * Adds an event listener to the cross icon in the search field.
 * When you click, the contents of the input field are deleted and the search icon is displayed again.
 */
document.querySelector('.search-icon img[src*="cross.svg"]').addEventListener('click', function() {
    const inputField = document.querySelector('input[type="text"]'); 
    inputField.value = ''; // Deletes the value in the input field
    inputField.dispatchEvent(new Event('input')); // Manually trigger the input event to reset the search and change the icon
});

/**
 * Performs a search by filtering the existing tasks based on the search term.
 * Updates the board to show only the tasks that match the search criteria.
 * @param {string} searchTerm - The search term to filter on.
 */
async function searchTasks(searchTerm) {
    let tasks = await fetchTasks();
    if (searchTerm.trim() !== '') {
        tasks = tasks.filter(task =>
            (task.title && task.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }
    await initializeBoardCard(tasks); // Call initializeBoardCard with filtered tasks
}