
async function init(){
    await includeHTML();
    timeDynamicWelcome();
    
    buttonFocus();
    setTimeout(() => {
        sortTasksByStateToDo();
        sortTasksByStateInProgress();
        numberOfAllTasks();
        sortTasksByStateAwaitingFeedback();
        sortTasksByStateDone();
        sortTasksByPrioUrgent();
    }, 50);
    }

async function initRegister(){
    await loadUsers();
}

