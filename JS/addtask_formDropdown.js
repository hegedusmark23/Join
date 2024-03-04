/**
 * Represents the currently selected or to-be-edited task.
 * @type {Task}
 */
let currentTask = new Task;

/**
 * Indicates whether a drop-down menu was clicked to control its state.
 * @type {boolean}
 */
let dropdownClicked = false;

//! Assignee DropDown

/**
 * Toggles the assignment drop-down menu and controls the display of arrow icons.
 */
function toggleAssigneeDropdown() {
    let dropdownContent = document.getElementById('assign-to');
    let isDropdownOpen = dropdownContent.style.display === 'block';
    dropdownContent.style.display = isDropdownOpen ? 'none' : 'block';

    // Pfeil-Icons umschalten
    let arrowsDown = document.querySelectorAll('.arrowDown');
    let arrowsUp = document.querySelectorAll('.arrowUp');
    arrowsDown.forEach(arrow => arrow.style.display = isDropdownOpen ? 'block' : 'none');
    arrowsUp.forEach(arrow => arrow.style.display = isDropdownOpen ? 'none' : 'block');
}

/**
 * Updates a user's assignment status and the display of selected users.
 * @param {Object} user - The user object whose assignment status is to be updated.
 */
function updateAssignee(user) {
    if (user.added) {
        if (!assignedTo.includes(user.name)) { // Add user if not already in array
            assignedTo.push(user.name);
        }
    } else {
        assignedTo = assignedTo.filter(name => name !== user.name); // Remove user if he is in the array
    }
    updateSelectedAssigneesDisplay();
}

/**
 * Adds an event listener to the dropdown button to control the assignment dropdown menu.
 * Closes the dropdown menu when clicked outside the dropdown area.
 */
function setupAssigneeGlobalClickListener() {
    const dropdownContent = document.getElementById('assign-to');
    const dropdownButton = document.getElementById('dropdown-assignees');
    if (!dropdownContent || !dropdownButton) {
        console.info('Dropdown-Elemente wurden nicht im DOM gefunden.');
        return; // Beendet die Funktion frühzeitig, wenn die Elemente nicht existieren
    }

    // Öffnet oder schließt das Dropdown, wenn der Button geklickt wird.
    dropdownButton.addEventListener('click', function(event) {
        toggleAssigneeDropdown(); // Toggled das Dropdown
        event.stopPropagation(); // Verhindert, dass das Event im Dokument weiter propagiert wird
    });
    
    // Schließt das Dropdown, wenn außerhalb des Dropdown-Bereichs geklickt wird.
    document.addEventListener('click', function(event) {
        let isClickInsideDropdown = dropdownButton.contains(event.target) || dropdownContent.contains(event.target);
        if (!isClickInsideDropdown && dropdownContent.style.display === 'block') {
            toggleAssigneeDropdown(); // Closes the dropdown when clicked outside
        }
    });
}

/**
 * Updates a user's 'added' status in the letterContainer and assignedTo array.
 * @param {string|object} letter - The contact's letter or an object with letter and index.
 * @param {number} index - The index of the contact in the letterContainer.
 */
function updateAssigneeStatus(letter, index) {
    if (typeof letter === 'object' && letter !== null) { // Checking whether the first parameter is an object
        index = letter.index;
        letter = letter.letter;
    }
    const contact = letterContainer[letter][index];
    contact.added = !contact.added;

    updateAssignedTo(contact);
}

/**
 * Adds or removes the contact from the assignedTo array.
 * @param {Object} contact - The contact object.
 */
function updateAssignedTo(contact) {
    const foundIndex = assignedTo.findIndex(c => c.name === contact.completeName);
    if (contact.added) {
        if (foundIndex === -1) {
            assignedTo.push({
                name: contact.completeName,
                initials: generateInitials(contact.completeName),
                color: contact.badgeColor
            });
        }
    } else {
        if (foundIndex !== -1) {
            assignedTo.splice(foundIndex, 1);
        }
    }
}

/**
 * Main function to toggle a user's 'added' status and re-render the display.
 * @param {string|object} letter - The contact's letter or an object with letter and index.
 * @param {number} index - The index of the contact in the letterContainer.
 */
function toggleAssigneeStatus(letter, index) {
    updateAssigneeStatus(letter, index); // Updates 'added' status
    updateSelectedAssigneesDisplay(); // Updates the display of selected users
    renderAssignees(); // Re-renders the user list in the dropdown
}

/**
 * Generates the initials from a user's full name.
 * @param {string} completeName - The user's full name.
 * @returns {string} The user's initials in capital letters.
 */
function generateInitials(completeName) {
    const nameParts = completeName.split(' ');
    const initials = nameParts.map(part => part[0]).join('');
    return initials.toUpperCase();
}

/**
 * Rendert die Benutzerliste im Dropdown-Menü basierend auf dem `letterContainer`.
 */
function renderAssignees() {
    let dropdownContent = document.getElementById('assign-to');
    if (!dropdownContent) {
        console.info('Dropdown-Container für Assignees wurde nicht im DOM gefunden.');
        return; // Beendet die Funktion frühzeitig, wenn das Element nicht existiert
    }

    dropdownContent.innerHTML = ''; // Löscht den aktuellen Inhalt

    Object.keys(letterContainer).forEach(letter => {
        letterContainer[letter].forEach((contact, index) => {
            const initials = generateInitials(contact.completeName); // Initialen generieren
            let userContainer = document.createElement('div');
            userContainer.className = 'dropdown-content-container' + (contact.added ? ' user-checked' : '');

            // Erstellung des Checkbox SVG basierend auf dem 'added' Zustand
            const checkboxSVG = contact.added ? 
                `<svg id="checkbox-checked-active" style="display:block" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.3882 11V17C20.3882 18.6569 19.045 20 17.3882 20H7.38818C5.73133 20 4.38818 18.6569 4.38818 17V7C4.38818 5.34315 5.73133 4 7.38818 4H15.3882" stroke="#fff" stroke-width="2" stroke-linecap="round"></path>
                    <path d="M8.38818 12L12.3882 16L20.3882 4.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>` : 
                `<svg id="checkbox-unchecked-normal" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4.38818" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"></rect>
                </svg>`;

            userContainer.innerHTML = `
                <div class="dropdown-content-binding">
                    <div class="dropdown-content-circle" style="background-color:${contact.badgeColor};">
                        <p id="user-initials">${initials}</p>
                    </div>
                    <div class="dropdown-content-name">
                        <a id="user-name" href="#" data-value="option${index + 1}">${contact.completeName}</a>
                    </div>
                </div>
                <div class="dropdown-content-checkbox">${checkboxSVG}</div>
            `;

            // Event-Listener für den Klick hinzufügen
            userContainer.addEventListener('click', function() {
                toggleAssigneeStatus(letter, index, contact);
            });

            dropdownContent.appendChild(userContainer);
        });
    });
}

/**
 * Sets up an event listener for the dropdown button to control the dropdown menu.
 */
function setupAssigneeDropdownToggleListener() {
    let dropdownButton = document.getElementById('dropdown-assignees');
    if (!dropdownButton) {
        console.info('Dropdown-Button für Assignees wurde nicht im DOM gefunden.');
        return; // Terminates the function early if the element does not exist
    }
    dropdownButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevents the dropdown from closing when the button is clicked
        toggleAssigneeDropdown();
    });
}

/**
 * Updates the display of currently selected users.
 */
function updateSelectedAssigneesDisplay() {
    let selectedAssigneesDiv = document.getElementById('selected-assignees');
    selectedAssigneesDiv.innerHTML = ''; // Deletes the current content
    Object.values(letterContainer).forEach(contacts => {
        contacts.forEach(contact => {
            if (contact.added) {
                const initials = generateInitials(contact.completeName);
                let assigneeCircle = document.createElement('div');
                assigneeCircle.className = 'dropdown-content-circle';
                assigneeCircle.style.backgroundColor = contact.badgeColor;
                assigneeCircle.textContent = initials;

                selectedAssigneesDiv.appendChild(assigneeCircle);
            }
        });
    });
}

//! Category DropDown

/**
 * Initializes the category drop-down menu and adds category options.
 */
function initCategoryDropdown() {
    let dropdownContent = document.getElementById('category');
    if (!dropdownContent) {
        console.info('Dropdown-Container für Kategorien wurde nicht im DOM gefunden.');
        return; // Terminates the function early if the element does not exist
    }
    let categories = ['Technical Task', 'User Story'];
    categories.forEach((category) => {
        let link = document.createElement('a');
        link.href = '#';
        link.textContent = category;
        link.addEventListener('click', function(event) {
            event.preventDefault();
            selectCategoryItem(this.textContent);
        });
        dropdownContent.appendChild(link);
    });
}

/**
 * Selects a category and updates the dropdown button text.
 * @param {string} categoryName - The name of the selected category.
 */
function selectCategoryItem(categoryName) {
    let dropdownButton = document.getElementById('dropdown-categories');
    dropdownButton.textContent = categoryName;
    toggleCategoryDropdown();
    category = categoryName; // Saves the selected category
    validateCategorySelection(); // Validates the selection
}

/**
 * Toggles the category dropdown menu and controls the display of arrow icons.
 */
function toggleCategoryDropdown() {
    let dropdownContent = document.getElementById('category');
    let isOpen = dropdownContent.style.display === 'block';
    dropdownContent.style.display = isOpen ? 'none' : 'block';
    toggleCategoryDropdownArrows(isOpen);
    if (!isOpen) {
        validateCategorySelection();
    }
}

/**
 * Sets up event listeners for the category dropdown menu.
 */
function setupCategoryDropdownEventListeners() {
    const dropdownCategoriesButton = document.getElementById('dropdown-categories');
    if (!dropdownCategoriesButton) {
        console.info('Dropdown-Button für Kategorien wurde nicht im DOM gefunden.');
        return;
    }
    dropdownCategoriesButton.addEventListener('click', toggleCategoryDropdown);
    document.querySelectorAll('.arrowDown, .arrowUp').forEach(arrow => {
        if (arrow) {
            arrow.addEventListener('click', toggleCategoryDropdown);
        }
    });
}

/**
 * Validates the selection of a category and displays an error message if necessary.
 */
function validateCategorySelection() {
    let errorMsg = document.getElementById('dropdown-categories-error-msg');
    if (category) {
        errorMsg.style.visibility = 'hidden';
    } else {
        errorMsg.style.visibility = 'visible';
    }
}

/**
 * Toggles the arrow icons and background when opening and closing the category dropdown.
 * @param {boolean} isOpen - Indicates whether the drop-down menu is open.
 */
function toggleCategoryDropdownArrows(isOpen) {
    const arrowsDown = document.querySelectorAll('.arrowDown');
    const arrowsUp = document.querySelectorAll('.arrowUp');
    arrowsDown.forEach(arrow => arrow.style.display = isOpen ? 'block' : 'none');
    arrowsUp.forEach(arrow => arrow.style.display = isOpen ? 'none' : 'block');
}