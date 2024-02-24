
async function init(){
    await includeHTML();
    timeDynamicWelcome();
    
    buttonFocus();
    setTimeout(() => {
        sortTasksByStateToDo();
        sortTasksByStateInProgress();
        numberOfAllTasks();
    }, 50);
    }

async function initRegister(){
    await loadUsers();
}

