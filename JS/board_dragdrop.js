let backgroundToHide;
let boardSectionToSet;
let backgroundToReset;
let boardSectionToHide;
/**
 * Starts the drag process for a task element.
 * @param {number} id - The ID of the task to be moved.
 * @param {string} state - The current status of the task.
 * @param {number} i - The index of the task in its current state.
*/
/**
 * Enables drag elements to be dropped.
 * @param {Event} ev - The Drag-Event.
 */
function allowDrop(event) {
    event.preventDefault();
}



/**
 * this function is activated when the task begins to be dragged
 * @param {*} id - identifier of each task that is dragged
 * @param {*} state - indicates the state of the current dragged task
 * @param {*} i - index indicating the current position of the task within the current container
 */
function startDragging(id, state, i) {
    currentDraggedElement = id;
    document.getElementById(`${state}-card-content${i}`).style.rotate = '10deg';
    console.log('mobile touch');
}


/**
 * Moves the currently dragged task to a new state and updates the view.
 * @param {string} state - The target state of the task.
*/
async function moveTo(state, event) {
    event.preventDefault();
    tasks[currentDraggedElement]['state'] = state;
    await setItem('tasks', JSON.stringify(tasks));
    await initializeBoardCard();

}


/**
 * Hides the "No tasks" hint for a specific column when a task is added.
 * @param {string} id - The ID of the column in which the note is to be hidden.
 */

function hideNoTaskDiv(id) {
    if (id == 'toDo') {
        hideDivAndSetBorder1();
    } else if (id == 'in-progress') {
        hideDivAndSetBorder2();
    } else if (id == 'await-feedback') {
        hideDivAndSetBorder3();
    } else if (id == 'done') {
        hideDivAndSetBorder4();
    }
    if (backgroundToHide && boardSectionToSet) {
        document.getElementById(backgroundToHide).style.display = 'none';
        document.getElementById(boardSectionToSet).style.border = '2px dashed rgba(0,0,0,0.2)';
    } else { };
}

function hideDivAndSetBorder1() {
    backgroundToHide = 'board-card-background-1'
    boardSectionToSet = 'board-section-1'
}
function hideDivAndSetBorder2() {
    backgroundToHide = 'board-card-background-2'
    boardSectionToSet = 'board-section-2'
}
function hideDivAndSetBorder3() {
    backgroundToHide = 'board-card-background-3'
    boardSectionToSet = 'board-section-3'
}
function hideDivAndSetBorder4() {
    backgroundToHide = 'board-card-background-4'
    boardSectionToSet = 'board-section-4'
}





/**
 * Resets the "No tasks" hint for a specific column when the last task is removed from it.
 * @param {string} id - The ID of the column for which the note is to be reset.
 */
function resetNoTaskDiv(id) {
    isDraggingOver = true;
    if (id == 'toDo' && todos.length == 0) {
        resetDivAndHideBorder1();
    } else if (id == 'in-progress' && inProgress.length == 0) {
        resetDivAndHideBorder2()
    } else if (id == 'await-feedback' && awaitFeedback.length == 0) {
        resetDivAndHideBorder3()
    } else if (id == 'done' && done.length == 0) {
        resetDivAndHideBorder4()
    }
    if (backgroundToReset && boardSectionToHide) {
        addStyle(); // I added a delay to avoid overlap between the hideNoTaskDiv() and resetNoTaskDiv() functions;
    } else { }
}


function addStyle() {
    document.getElementById(backgroundToReset).style.display = 'flex';
    document.getElementById(boardSectionToHide).style.border = 'none'
}

function resetDivAndHideBorder1() {
    backgroundToReset = 'board-card-background-1';
    boardSectionToHide = 'board-section-1'
}

function resetDivAndHideBorder2() {
    backgroundToReset = 'board-card-background-2';
    boardSectionToHide = 'board-section-2'
}

function resetDivAndHideBorder3() {
    backgroundToReset = 'board-card-background-3';
    boardSectionToHide = 'board-section-3'
}

function resetDivAndHideBorder4() {
    backgroundToReset = 'board-card-background-4';
    boardSectionToHide = 'board-section-4'
}

document.addEventListener('dragend', () => {
    document.getElementById('board-section-1').style.border = 'none';
    document.getElementById('board-section-2').style.border = 'none';
    document.getElementById('board-section-3').style.border = 'none';
    document.getElementById('board-section-4').style.border = 'none';
});

function showPopUpMoveTaskMobile(id, event) {
    event.stopPropagation();
    currentDraggedElement = id;
    let mobileDialog = document.getElementById('dialog-container-card-to-move');
    mobileDialog.classList.remove('d-none');
    mobileDialog.innerHTML = /*html*/ `
       <div onclick="doNotClose(event)" id="popUp-choice" class="popUp-choice translatePopUpChoice">
        <span onclick="closePopUpMoveTaskMobile(event)" class="cross-icon-choice-container">
        <svg class="cross-icon-btn1" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.001 12.5001L17.244 17.7431M6.758 17.7431L12.001 12.5001L6.758 17.7431ZM17.244 7.25708L12 12.5001L17.244 7.25708ZM12 12.5001L6.758 7.25708L12 12.5001Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
           <h2 class="popUp-choice-title">Wohin möchten Sie dies Task verschieben?</h2>
          <p id="toDoM" class="choice" onclick="moveTo('toDo',event)">To Do</p>
          <p id="in-progressM" class="choice" onclick="moveTo('in-progress',event)">In Progress</p>
          <p id="await-feedbackM" class="choice" onclick="moveTo('await-feedback',event)">Await Feedback</p>
          <p id="doneM" class="choice" onclick="moveTo('done',event)">Done</p>
      </div>
    `
    setTimeout(() => {
        document.getElementById('popUp-choice').classList.remove('translatePopUpChoice');
    }, 100)
}

async function moveTo(state, event) {
    let stateForId = state + 'M'
    tasks[currentDraggedElement]['state'] = state;
    document.getElementById(stateForId).classList.add('blue-btn');
    document.getElementById(stateForId).style.color = '#fff';
    await setItem('tasks', JSON.stringify(tasks));
    await initializeBoardCard();
    closePopUpMoveTaskMobile(event);
}

function closePopUpMoveTaskMobile(event) {
    document.getElementById('popUp-choice').classList.add('translatePopUpChoice');
    setTimeout(() => {
        document.getElementById('dialog-container-card-to-move').classList.add('d-none');
    }, 200)
    event.stopPropagation();
}
