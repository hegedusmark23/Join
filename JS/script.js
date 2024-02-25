
async function init(){
    await includeHTML();
    timeDynamicWelcome();buttonFocus();
    setTimeout(() => {
        sortTasksByStateToDo();
        sortTasksByStateInProgress();
        numberOfAllTasks();
        sortTasksByStateAwaitingFeedback();
        sortTasksByStateDone();
        sortTasksByPrioUrgent();
    }, 250);
    }

async function initRegister(){
    await loadUsers();
}

