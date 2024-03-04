/** 
 * @global
 * @desc The title of the task that is being added. `null` until an input is made.
 * @type {string|null}
 */
let title = null;

/** 
 * @global
 * @desc The description of the task. `null` until an input is made.
 * @type {string|null}
 */
let description = null;

/** 
 * @global
 * @desc The due date of the task. `null` until an input is made.
 * @type {string|null}
 */
let dueDate = null;

/** 
 * @global
 * @desc The priority of the task. `null` until a selection is made.
 * @type {string|null}
 */
let prio = null;

/** 
 * @global
 * @desc A list of subtasks of the task. Blank until subtasks are added.
 * @type {Array<Object>}
 */
let subtasks = [];

/** 
 * @global
 * @desc A list of people assigned to the task. Blank until assignments are made.
 * @type {Array<Object>}
 */
let assignedTo = [];

/** 
 * @global
 * @desc The category of the task. `null` until a selection is made.
 * @type {string|null}
 */
let category = null;

/** 
 * @global
 * @desc A counter to create unique identifiers for new tasks.
 * @type {number}
 */
let identifier = 0;

/** 
 * @global
 * @desc A list of all tasks. Blank until tasks are added.
 * @type {Array<Object>}
 */
let tasks = [];

/**
 * Initializes the main functions of the application.
 * Loads dynamic HTML content, greets the user based on the time of day,
 * focuses the main button and sorts the tasks into different categories.
 * Sorting occurs with a delay to ensure all
 * Data has been loaded.
 */
async function init() {
    mobileWelcomeAnimation();
    await includeHTML(); // Loads dynamic HTML components
    timeDynamicWelcome(); // Displays a welcoming message based on the time of day
    buttonFocus(); // Sets the focus on the main button of the page
    // Delays the execution of the sorting functions to wait for the data to load
    setTimeout(() => {
        sortTasksByStateToDo();
        sortTasksByStateInProgress();
        numberOfAllTasks(); // Updates the display of the total number of tasks
        sortTasksByStateAwaitingFeedback();
        sortTasksByStateDone();
        sortTasksByPrioUrgent(); //Sorts tasks by urgency
    }, 250);
}

/**
 * Initializes the application's registration function.
 * Loads existing user data when starting the registration page.
 */
async function initRegister() {
    await loadUsers(); // Loads existing users from storage
}

async function showTasks() {
    console.log('Das sind die Tasks in meinem Array: ', tasks);
}

function reinitializeEventListenersForEditModal() {
    checkInputFields();
    saveInputFields();
    handlePrioButtons();
    inputSubtask();
    addSubTask();
    setupEventListenersSubtasks();
    renderAssignees();
    setupAssigneeGlobalClickListener();
    setupAssigneeDropdownToggleListener();
    initCategoryDropdown();
    setupCategoryDropdownEventListeners();
    setupModalCloseDelegationEdit();
    setupDeleteTaskListener();
    initializeBoardIfNeeded();
    createTask();
    setupOpenAddTaskModalListener();
    setupCloseAddTaskModalListener();
    setupEditTaskListener();
    setupModalCloseDelegationAddAtskBoard();
    setupSaveTaskEditListener();

}

document.addEventListener('DOMContentLoaded', () => {
    // Initializations that should be performed on all pages
    if ((window.location.href === "http://127.0.0.1:5500/addtask.html") || (window.location.href === "http://127.0.0.1:5500/addtask.html")){
        checkInputFields();
        saveInputFields();
        }
        loadTasks();
        createTask();
        
    //Functions needed on both the "Add Task" page and the "Board" page
    if (window.location.href === "http://127.0.0.1:5500/addtask.html") {
        loadItems().then(() => {
            renderAssignees();
        });
        handlePrioButtons();
        inputSubtask();
        addSubTask();
        setupEventListenersSubtasks();
        renderAssignees();
        setupAssigneeDropdownToggleListener();
        initCategoryDropdown();
        setupCategoryDropdownEventListeners();
        setupAssigneeGlobalClickListener();
    }
    // Auxiliary function to check "Board" page active
    function isBoardPage() {
        return document.getElementById('board-card-background-1') !== null;

    }
    // Functions specific to the "Board" page
    function initializeBoardPage() {
        initializeBoardCard();
        setupTaskClickListeners();
        setupCloseTaskDetailModalListener();
        setupOpenAddTaskModalListener();
        setupCloseAddTaskModalListener();
        setupModalCloseDelegation();
        setupEditTaskListener();
        setupModalCloseDelegationEdit();
        setupModalCloseDelegationAddAtskBoard();
        setupDeleteTaskListener();
        setupSaveTaskEditListener();
        setupModalEventListeners();
        setupTaskStateListeners();
    }

    // Conditional initialization based on the current page
    if (isBoardPage()) {
        initializeBoardPage();
    } else {
        console.log('Nicht auf der Board-Seite, spezifische Board-Initialisierungen werden übersprungen.');
    }
});