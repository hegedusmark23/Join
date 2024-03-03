//! Assignee DropDown

/**
 * Schaltet das Dropdown-Menü für Zuweisungen um und steuert die Anzeige der Pfeil-Icons.
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
 * Aktualisiert den Zuweisungsstatus eines Benutzers und die Anzeige der ausgewählten Benutzer.
 * @param {Object} user - Das Benutzerobjekt, dessen Zuweisungsstatus aktualisiert werden soll.
 */
function updateAssignee(user) {
    if (user.added) {
        if (!assignedTo.includes(user.name)) { // Benutzer hinzufügen, wenn er noch nicht im Array ist
            assignedTo.push(user.name);
        }
    } else {
        assignedTo = assignedTo.filter(name => name !== user.name); // Benutzer entfernen, wenn er im Array ist
    }
    updateSelectedAssigneesDisplay();
}

/**
 * Fügt dem Dropdown-Button einen Event-Listener hinzu, um das Dropdown-Menü für Zuweisungen zu steuern.
 * Schließt das Dropdown-Menü, wenn außerhalb des Dropdown-Bereichs geklickt wird.
 */
function setupAssigneeGlobalClickListener() {
    const dropdownContent = document.getElementById('assign-to');
    const dropdownButton = document.getElementById('dropdown-assignees');
    if (!dropdownContent || !dropdownButton) {
        console.info('Dropdown-Elemente wurden nicht im DOM gefunden.');
        return; // Beendet die Funktion frühzeitig, wenn die Elemente nicht existieren
    }
    document.addEventListener('click', function(event) {
        let isClickInsideDropdown = dropdownButton.contains(event.target) || dropdownContent.contains(event.target);

        if (!isClickInsideDropdown && dropdownContent.style.display === 'block') {
            toggleAssigneeDropdown(); // Schließt das Dropdown, wenn außerhalb geklickt wird
        }
    });
}

/**
 * Aktualisiert den 'added'-Status eines Benutzers im letterContainer und assignedTo Array.
 * @param {string|object} letter - Der Buchstabe des Kontakts oder ein Objekt mit letter und index.
 * @param {number} index - Der Index des Kontakts im letterContainer.
 */
function updateAssigneeStatus(letter, index) {
    if (typeof letter === 'object' && letter !== null) { // Überprüfung, ob der erste Parameter ein Objekt ist
        index = letter.index;
        letter = letter.letter;
    }
    const contact = letterContainer[letter][index];
    contact.added = !contact.added;

    updateAssignedTo(contact);
}

/**
 * Fügt den Kontakt dem assignedTo Array hinzu oder entfernt ihn.
 * @param {Object} contact - Das Kontaktobjekt.
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
 * Hauptfunktion zum Umschalten des 'added'-Status eines Benutzers und Neu-Rendern der Anzeige.
 * @param {string|object} letter - Der Buchstabe des Kontakts oder ein Objekt mit letter und index.
 * @param {number} index - Der Index des Kontakts im letterContainer.
 */
function toggleAssigneeStatus(letter, index) {
    updateAssigneeStatus(letter, index); // Aktualisiert den 'added'-Status
    updateSelectedAssigneesDisplay(); // Aktualisiert die Anzeige der ausgewählten Benutzer
    renderAssignees(); // Rendert die Benutzerliste im Dropdown neu
}

/**
 * Generiert die Initialen aus dem vollständigen Namen eines Benutzers.
 * @param {string} completeName - Der vollständige Name des Benutzers.
 * @returns {string} Die Initialen des Benutzers in Großbuchstaben.
 */
function generateInitials(completeName) {
    const nameParts = completeName.split(' ');
    const initials = nameParts.map(part => part[0]).join('');
    return initials.toUpperCase();
}

/**
 * Löscht den aktuellen Inhalt des Dropdown-Menüs.
 * @param {HTMLElement} dropdownContent - Das Element des Dropdown-Menüs.
 */
function clearDropdownContent(dropdownContent) {
    dropdownContent.innerHTML = ''; // Löscht den aktuellen Inhalt
}

/**
 * Generiert das SVG-Element für die Checkbox basierend auf dem Status `isAdded`.
 * @param {boolean} isAdded - Gibt an, ob der Kontakt hinzugefügt wurde oder nicht.
 * @returns {string} SVG-Element als Zeichenkette.
 */
function generateCheckboxSVG(isAdded) {
    return isAdded ? 
        `<svg id="checkbox-checked-active" style="display:block" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.3882 11V17C20.3882 18.6569 19.045 20 17.3882 20H7.38818C5.73133 20 4.38818 18.6569 4.38818 17V7C4.38818 5.34315 5.73133 4 7.38818 4H15.3882" stroke="#fff" stroke-width="2" stroke-linecap="round"></path>
            <path d="M8.38818 12L12.3882 16L20.3882 4.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>` : 
        `<svg id="checkbox-unchecked-normal" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4.38818" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"></rect>
        </svg>`;
}

/**
 * Erstellt das innere HTML für den Benutzer-Container einschließlich des Checkbox-SVGs.
 * @param {Object} contact - Kontaktobjekt mit Informationen zum Kontakt.
 * @param {number} index - Index des Kontakts in der Liste.
 * @param {string} initials - Initialen des Kontakts.
 * @param {string} checkboxSVG - SVG-Element als Zeichenkette für die Checkbox.
 * @returns {string} HTML-Zeichenkette für den Benutzer-Container.
 */
function createUserContainerHTML(contact, index, initials, checkboxSVG) {
    return `
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
}

/**
 * Erstellt und konfiguriert den Container für einen Benutzer.
 * @param {Object} contact - Kontaktobjekt mit Informationen zum Kontakt.
 * @param {number} index - Index des Kontakts in der Liste.
 * @param {string} letter - Der Anfangsbuchstabe des Namens des Kontakts, dient als Schlüssel im `letterContainer`.
 * @returns {HTMLElement} Das Benutzer-Container-Element.
 */
function createUserContainer(contact, index, letter) {
    const initials = generateInitials(contact.completeName);
    const checkboxSVG = generateCheckboxSVG(contact.added);
    let userContainer = document.createElement('div');
    userContainer.className = 'dropdown-content-container' + (contact.added ? ' user-checked' : '');
    userContainer.innerHTML = createUserContainerHTML(contact, index, initials, checkboxSVG);
    userContainer.addEventListener('click', function() {
        toggleAssigneeStatus(letter, index);
    });
    return userContainer;
}

/**
 * Rendert die Benutzerliste im Dropdown-Menü basierend auf dem `letterContainer`.
 */
function renderAssignees() {
    let dropdownContent = document.getElementById('assign-to');
    if (!dropdownContent) {
        console.info('Dropdown-Container für Assignees wurde nicht im DOM gefunden.');
        return;
    }
    clearDropdownContent(dropdownContent);
    Object.keys(letterContainer).forEach(letter => {
        letterContainer[letter].forEach((contact, index) => {
            let userContainer = createUserContainer(contact, index, letter);
            dropdownContent.appendChild(userContainer);
        });
    });
}

/**
 * Richtet einen Event-Listener für den Dropdown-Button ein, um das Dropdown-Menü zu steuern.
 */
function setupAssigneeDropdownToggleListener() {
    let dropdownButton = document.getElementById('dropdown-assignees');
    if (!dropdownButton) {
        console.info('Dropdown-Button für Assignees wurde nicht im DOM gefunden.');
        return; // Beendet die Funktion frühzeitig, wenn das Element nicht existiert
    }
    dropdownButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Verhindert das Schließen des Dropdowns beim Klicken auf den Button
        toggleAssigneeDropdown();
    });
}

/**
 * Aktualisiert die Anzeige der aktuell ausgewählten Benutzer.
 */
function updateSelectedAssigneesDisplay() {
    let selectedAssigneesDiv = document.getElementById('selected-assignees');
    selectedAssigneesDiv.innerHTML = ''; // Löscht den aktuellen Inhalt
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
 * Initialisiert das Dropdown-Menü für Kategorien und fügt Kategorieoptionen hinzu.
 */
function initCategoryDropdown() {
    let dropdownContent = document.getElementById('category');
    if (!dropdownContent) {
        console.info('Dropdown-Container für Kategorien wurde nicht im DOM gefunden.');
        return; // Beendet die Funktion frühzeitig, wenn das Element nicht existiert
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
 * Wählt eine Kategorie aus und aktualisiert den Text des Dropdown-Buttons.
 * @param {string} categoryName - Der Name der ausgewählten Kategorie.
 */
function selectCategoryItem(categoryName) {
    let dropdownButton = document.getElementById('dropdown-categories');
    dropdownButton.textContent = categoryName;
    toggleCategoryDropdown();
    category = categoryName; // Speichert die ausgewählte Kategorie
    validateCategorySelection(); // Validiert die Auswahl
}

/**
 * Schaltet das Kategorie-Dropdown-Menü um und steuert die Anzeige der Pfeil-Icons.
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
 * Richtet Event-Listener für das Kategorie-Dropdown-Menü ein.
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
 * Validiert die Auswahl einer Kategorie und zeigt gegebenenfalls eine Fehlermeldung an.
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
 * Schaltet die Pfeil-Icons und den Hintergrund beim Öffnen und Schließen des Kategorie-Dropdowns um.
 * @param {boolean} isOpen - Gibt an, ob das Dropdown-Menü geöffnet ist.
 */
function toggleCategoryDropdownArrows(isOpen) {
    const arrowsDown = document.querySelectorAll('.arrowDown');
    const arrowsUp = document.querySelectorAll('.arrowUp');
    arrowsDown.forEach(arrow => arrow.style.display = isOpen ? 'block' : 'none');
    arrowsUp.forEach(arrow => arrow.style.display = isOpen ? 'none' : 'block');
}