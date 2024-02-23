
async function init(){
    await includeHTML();
    timeDynamicWelcome();
    numberOfAllTasks();
    buttonFocus();
    
    }

async function initRegister(){
    await loadUsers();
}

